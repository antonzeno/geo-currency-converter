import { User } from "@prisma/client";
import prisma from "../prisma/client.prisma";

export const getUserByEmail = async (email: string): Promise<User> => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};
