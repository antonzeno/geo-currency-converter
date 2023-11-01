import React from "react";

import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

const App = () => {
    return (
        <div className="app-wrapper">
            <NavigationBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </div>
    );
};

export default App;
