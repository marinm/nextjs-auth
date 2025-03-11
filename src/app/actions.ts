"use server";

import * as auth from "@/auth/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

function toString(value: null | FormDataEntryValue): null | string {
    return typeof value === "string" ? value : null;
}

export async function register(formData: FormData) {
    console.log("register");
    const session = await auth.userSession();

    if (session !== null) {
        console.log("session exists");
        redirect("/");
    }

    const username = toString(formData.get("username"));
    const password = toString(formData.get("password"));

    if (username === null || password === null) {
        redirect("/register");
    }

    console.log("registering...");
    const user = auth.register(username, password);

    if (user === null) {
        console.log("no user created");
        redirect("/register");
    }

    login(formData);
}

export async function login(formData: FormData) {
    const username = toString(formData.get("username"));
    const password = toString(formData.get("password"));

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
