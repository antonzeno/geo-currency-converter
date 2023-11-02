import express from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../services/user.service";
import { handleUserRegister, verifyPassword } from "../services/auth.service";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(403).json("Email already in use.");
        }

        const user = await handleUserRegister(req.body);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json("An unexpected error occurred. Please try again later.");
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(403).json("User doesn't exist.");
        }

        const match = await verifyPassword(password, user.password);

        if (!match) {
            return res.status(403).json("Invalid credentials. Please check your email or password.");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });

        res.cookie("_auth", JSON.stringify({ userId: user.id }), {
            secure: true,
            maxAge: 3600000,
        });

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json("An unexpected error occurred. Please try again later.");
    }
};

export const logout = (req: express.Request, res: express.Response) => {
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    res.clearCookie("_auth", { secure: false });

    return res.sendStatus(200);
};
