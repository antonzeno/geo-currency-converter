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
                        <tr key={country.id}>
                            <td>{country.name.common}</td>
                            <td>{country.population}</td>
                            <td>{country.currencies[0].code}</td>
                            <td>{country.currencies[0].sek_rate}</td>
                            <td>
                                {!isNaN(country.currencies[0].sek_rate * parseInt(amount)) &&
                                    country.currencies[0].sek_rate * parseInt(amount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountriesTable;
