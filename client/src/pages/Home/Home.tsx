import { useContext, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import CountriesTable from "../../components/CountriesTable/CountriesTable";

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
    const [formState, setFormState] = useState({
        query: "",
        countries: [],
        selected: [],
    });
    const { isAuthenticated } = useContext(AuthContext);

    const handleOnSearch = async (string) => {
        setFormState((prevState) => ({
            ...prevState,
            query: string,
        }));
        if (string !== "") {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/countries/${encodeURIComponent(string)}`,
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    setFormState((prevState) => ({
                        ...prevState,
                        countries: response.data,
                    }));
                }
            } catch (error) {
                setFormState((prevState) => ({
                    ...prevState,
                    countries: [],
                }));
            }
        }
    };

    const handleOnSelect = async (item) => {
        setFormState((prevState) => ({
            ...prevState,
            query: "",
            selected: [...prevState.selected, item],
        }));
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
                items={formState.countries}
                inputDebounce={500}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
                inputSearchString={formState.query}
                showNoResultsText={
                    isAuthenticated
                        ? `No results found for ${formState.query}`
                        : "You must log in in order to perform search."
                }
                className="w-50 mb-5"
                fuseOptions={{ keys: ["name.common", "name.official"] }}
            />
            {formState.selected.length > 0 && <CountriesTable selected={formState.selected} />}
        </div>
    );
};

export default Home;
