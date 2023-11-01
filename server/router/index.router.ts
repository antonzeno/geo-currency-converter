import express from "express";
import auth from "./auth.router";
import countries from "./countries.router";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    countries(router);

    return router;
};
