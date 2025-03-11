"use server";

import * as users from "@/data/users";
import * as sessions from "@/data/sessions";
import { passwordsMatch } from "@/utils";
import { cookies } from "next/headers";

export async function userSession(): Promise<null | sessions.Session> {
    const sessionId = (await cookies()).get("session_id")?.value ?? null;
    return sessionId === null ? null : sessions.find(sessionId) ?? null;
}

export async function sessionUser(): Promise<null | users.User> {
    const sessionId = (await cookies()).get("session_id")?.value ?? null;
    return sessionId === null ? null : sessions.sessionUser(sessionId) ?? null;
}

export async function register(
    username: string,
    password: string
): Promise<null | users.User> {
    if (users.usernameExists(username)) {
        console.log("username exists");
        return null;
    }

    users.create(username, password);

    return users.byUsername(username) ?? null;
}

export async function login(
    username: string,
    password: string
): Promise<null | sessions.Session> {
    const user = users.byUsername(username);

    if (user === undefined) {
        return null;
    }

    const [salt, hash] = user.password.split("-");
    const authenticated = passwordsMatch(password, salt, hash);

    if (!authenticated) {
        return null;
    }

    return sessions.create(user.id) ?? null;
}

export async function logout(): Promise<boolean> {
    const session = await userSession();

    if (session === null) {
        return false;
    }

    sessions.del(session.id);
    (await cookies()).delete("session_id");

    return true;
}
