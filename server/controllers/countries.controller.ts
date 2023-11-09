import express from "express";
import axios from "axios";
import { getClient } from "../redis/client.redis";

export const getCountriesByName = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params;
        const client = await getClient();
        const cachedCountries = await client.get(name);

        if (cachedCountries) {
            return res.status(200).json(JSON.parse(cachedCountries));
        }

        const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`, {
            timeout: 5000,
        });

        if (response.status === 200) {
            const currencies = getCurrenciesFromCountries(response.data);
            const currencyRates = await getCurrencyExchangeRates(currencies);
            const eurToSek = currencyRates["SEK"] || null;

            const countriesData = response.data.map(({ name, population, currencies: countryCurrencies }, idx) => {
                const { common, official } = name;

                const currencyData =
                    countryCurrencies &&
                    Object.entries(countryCurrencies).map(
                        ([code, currency]: [string, { name: string; symbol: string }]) => {
                            const { name, symbol } = currency;
                            const eurToLocal = currencyRates[code] || null;
                            const sek_rate = eurToLocal !== null ? eurToLocal / eurToSek : null;
                            return { code, name, symbol, sek_rate };
                        }
                    );

                return {
                    id: idx,
                    name: {
                        common,
                        official,
                    },
                    population,
                    currencies: currencyData,
                };
            });

            await client.set(name, JSON.stringify(countriesData));

            return res.status(200).json(countriesData);
        } else {
            return res.status(500).json("Could not retrieve country information. Please try again later.");
        }
    } catch (error) {
        return res.status(500).json("An unexpected error occurred. Please try again later.");
    }
};

const getCurrencyExchangeRates = async (currencies) => {
    try {
        const currencyCodes = currencies.concat("SEK").join(",");
        const response = await axios.get(
            `http://data.fixer.io/api/latest?base=EUR&access_key=${process.env.FIXER_API_KEY}&symbols=${currencyCodes}`
        );

        if (response.status === 200) {
            return response.data.rates;
        } else {
            return [];
        }
    } catch (error) {
        return {};
    }
};

const getCurrenciesFromCountries = (countries: any[]) => {
    const currencies = countries.reduce((acc, country) => {
        const countryCurrencies = country.currencies && Object.keys(country.currencies).map((code) => code);
        return acc.concat(countryCurrencies);
    }, []);

    return Array.from(new Set(currencies));
};
