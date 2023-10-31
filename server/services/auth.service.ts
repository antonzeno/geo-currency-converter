import prisma from "../prisma/client.prisma";
import * as bcrypt from "bcrypt";

const comparePasswords = async (password: string, storedHash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, storedHash, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const genHashedPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

export const handleUserRegister = async (data: { email: string; password: string }) => {
    const hashedPassword = await genHashedPassword(data.password);

    return prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            password: false,
        },
    });
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const verified = await comparePasswords(password, hashedPassword);
    return verified;
};
