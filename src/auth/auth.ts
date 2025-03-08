"use server";

import * as users from "@/data/users";
import * as sessions from "@/data/sessions";
import { passwordsMatch } from "@/utils";

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
