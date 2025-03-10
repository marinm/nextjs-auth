"use server";

import { cookies } from "next/headers";
import * as sessions from "@/data/sessions";
import { User } from "@/data/users";

export async function sessionUser(): Promise<null | User> {
    const sessionId = (await cookies()).get("session_id")?.value ?? null;

    return sessionId === null ? null : sessions.sessionUser(sessionId) ?? null;
}
