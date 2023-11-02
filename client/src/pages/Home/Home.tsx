import { useContext, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

type Country = {
    id: number;
    name: {
        common: string;
        official: string;
    };
    population: number;
    currencies: {
        code: string;
        name: string;
        symbol: string;
        sek_rate: number | null;
    }[];
};

const Home = () => {
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const handleOnSearch = async (string) => {
        setQuery(string);
        if (string !== "") {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/countries/${encodeURIComponent(string)}`,
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    setCountries(response.data);
                }
            } catch (error) {
                setCountries([]);
            }
        }
    };

    const handleOnSelect = async (item) => {
        setQuery("");
    };

    const formatResult = (item) => {
        return (
            <div className="text-muted">
                <span style={{ display: "block", textAlign: "left" }}>{item.name.common}</span>
            </div>
        );
    };

    return (
        <div className="d-flex justify-content-center flex-column align-items-center w-100">
            <div className="h6 my-3">Search by country name:</div>
            <ReactSearchAutocomplete<Country>
                items={countries}
                inputDebounce={500}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
                inputSearchString={query}
                showNoResultsText={
                    isAuthenticated ? `No results found for ${query}` : "You must log in in order to perform search."
                }
                className="w-50 mb-5"
                fuseOptions={{ keys: ["name.common", "name.official"] }}
            />
        </div>
    );
};

export default Home;
