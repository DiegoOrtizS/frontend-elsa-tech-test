"use server";
import { cookies } from "next/headers";

interface CookieOptions {
    name: string;
    value: string;
}

export const validateJWT = async (token: string): Promise<boolean> => {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return false;
        const payload = JSON.parse(atob(parts[1]));
        if (!payload.exp) return false;
        const expiration = new Date(payload.exp * 1000);
        if (expiration < new Date()) return false;
        return true;
    } catch (error) {
        return false;
    }
};

export const setCookie = async ({
    name,
    value,
}: CookieOptions): Promise<void> => {
    await cookies().set(name, value);
};

export const getCookie = async (name: string): Promise<string | undefined> => {
    const cookie = await cookies().get(name);
    if (!cookie) return undefined;
    const validated = await validateJWT(cookie.value);
    if (validated) return cookie.value;
    removeCookie(name);
    return undefined;
};

export const removeCookie = async (name: string): Promise<void> => {
    await cookies().set(name, "");
};
