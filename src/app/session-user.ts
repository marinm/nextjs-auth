"use server";

import { headers } from "next/headers";
import * as sessions from "@/data/sessions";
import { User } from "@/data/users";

export async function sessionUser(): Promise<null | User> {
    const sessionId = (await headers()).get("session_id");

    return sessionId === null ? null : sessions.sessionUser(sessionId) ?? null;
}
