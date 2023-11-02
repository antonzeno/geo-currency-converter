import { Route, Routes } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

const App = () => {
    return (
        <div className="app-wrapper">
            <NavigationBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    );
};

export default App;
