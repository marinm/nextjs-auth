"use server";

import * as auth from "@/auth/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

function toString(value: null | FormDataEntryValue): null | string {
    return typeof value === "string" ? value : null;
}

export async function login(formData: FormData) {
    "use server";

    const username = toString(formData.get("username"));
    const password = toString(formData.get("password"));

    if (username === null || password === null) {
        redirect("/login");
    }

    const session = await auth.login(username, password);

    if (session === null) {
        redirect("/login");
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
