"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as auth from "@/auth/auth";
import * as sessions from "@/data/sessions";
import { NextResponse } from "next/server";

function toString(value: null | FormDataEntryValue): null | string {
    return typeof value === "string" ? value : null;
}

export async function POST(request: Request) {
    const formData = await request.formData();

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

    return NextResponse.json(sessions.sessionUser(session.id));
}
