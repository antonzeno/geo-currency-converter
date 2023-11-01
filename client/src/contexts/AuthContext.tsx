import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface AuthContextProps {
    children: React.ReactNode;
}

interface AuthContextValue {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: AuthContextProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(["_auth"]);

    useEffect(() => {
        const authStatus = cookies["_auth"] !== undefined;
        console.log(authStatus);
        setIsAuthenticated(authStatus);
    }, [cookies]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeCookie("_auth");
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}
