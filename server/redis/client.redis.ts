import { createClient } from "redis";

let clientInstance;

export const getClient = async () => {
    if (!clientInstance) {
        clientInstance = await createClient()
            .on("error", (err) => console.log("Redis Client Error", err))
            .connect();
    }

    return clientInstance;
};
