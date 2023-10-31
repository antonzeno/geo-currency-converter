import express from "express";
import { getUserByEmail } from "../services/user.service";
import { registerUser } from "../services/auth.service";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(403).json("Email already in use.");
        }

        const user = await registerUser(req.body);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    console.log("login");
};
