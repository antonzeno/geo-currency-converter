import express from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json("Unauthorized. Token is missing.");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json("Unauthorized. Invalid token.");
        }
        next();
    });
};
