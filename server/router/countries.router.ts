import express from "express";
import { getCountriesByName } from "../controllers/countries.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
    router.get("/countries/:name", verifyToken, getCountriesByName);
};
