"use server";

import * as auth from "@/auth/auth";

export async function login(formData: FormData) {
    const username: string = formData.get("username")?.toString() ?? "";
    const password: string = formData.get("password")?.toString() ?? "";

    auth.login(username, password);
}
