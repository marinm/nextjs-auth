"use server";

import * as auth from "@/auth/auth";
import * as users from "@/data/users";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type FormState = string;

function toNullableString(value: null | FormDataEntryValue): null | string {
    return typeof value === "string" ? value : null;
}

export async function register(formData: FormData): Promise<FormState> {
    console.log(formData);
    return "response";
    const session = await auth.userSession();

    if (session !== null) {
        return "You are already signed in";
    }

    const username = toNullableString(formData.get("username"));
    const password = toNullableString(formData.get("password"));

    if (username === null || password === null) {
        return "Username and password is required";
    }

    if (users.usernameExists(username)) {
        return "Username already exists";
    }

    const user = await auth.register(username, password);

    if (user === null) {
        return "Registration failed";
    }

    login(formData);

    return "Registered!";
}

export async function login(formData: FormData) {
    const username = toNullableString(formData.get("username"));
    const password = toNullableString(formData.get("password"));

    if (username === null || password === null) {
        redirect("/");
    }

    const session = await auth.login(username, password);

    if (session === null) {
        redirect("/");
    }

    const cookieStore = await cookies();

    cookieStore.set({
        name: "session_id",
        value: session.id,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/me");
}

export async function logout(): Promise<boolean> {
    await auth.logout();
    redirect("/");
}
