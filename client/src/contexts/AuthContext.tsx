import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface AuthContextProps {
    children: React.ReactNode;
}

interface AuthContextValue {
    isAuthenticated: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    logout: () => {},
});

export function AuthProvider({ children }: AuthContextProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [cookies] = useCookies(["_auth"]);

    useEffect(() => {
        const authStatus = cookies["_auth"] !== undefined;
        setIsAuthenticated(authStatus);
    }, [cookies]);

    const logout = async () => {
        axios.interceptors.request.use(
            (config) => {
                config.withCredentials = true;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`);
    };

    return <AuthContext.Provider value={{ isAuthenticated, logout }}>{children}</AuthContext.Provider>;
}
