import React, { useState } from "react";

const CountriesTable = ({ selected }) => {
    const [amount, setAmount] = useState("");

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex">
                <span className="fw-bold me-2 text-muted">Enter amount in SEK to convert:</span>
                <input type="number" value={amount} onChange={handleAmountChange} />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">Population</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Exchange rate</th>
                        <th scope="col">Exchange amount</th>
                    </tr>
                </thead>
                <tbody>
                    {selected.map((country) => (
                        <tr key={country.name.common}>
                            <td>{country.name.common}</td>
                            <td>{country.population}</td>
                            <td>
                                {country.currencies.map((currency) => (
                                    <div key={`${country.id}-${currency.code}-${country.name.common}`}>
                                        {currency.code}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {country.currencies.map((currency) => (
                                    <div key={`${country.id}-${currency.code}-${country.name.common}`}>
                                        {currency.sek_rate}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {country.currencies.map((currency) => {
                                    const exchangeAmount = currency.sek_rate * parseInt(amount);
                                    return (
                                        <div key={`${country.id}-${currency.code}-${country.name.common}`}>
                                            {!isNaN(exchangeAmount) && exchangeAmount}
                                        </div>
                                    );
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountriesTable;
