import { run, get, all } from "@/database/database";
import { Session } from "@/database/types";
import * as users from "@/database/users";
import { passwordsMatch, now, uuidv4, newSessionKey } from "@/utils";

export function signIn(username: string, password: string): boolean {
    const user = users.byUsername(username);

    if (!user) {
        throw new Error("That username does not exist");
    }

    const [salt, hash] = user.password.split("-");
    const authenticated = passwordsMatch(password, salt, hash);

    if (authenticated) {
        createSession(user.id);
    }

    console.log("authenticated: " + (authenticated ? "yes" : "no"));

    return authenticated;
}

export function signOut(sessionId: string): void {
    deleteSession(sessionId);
}

export function createSessionsTable(): void {
    run(
        `CREATE TABLE IF NOT EXISTS sessions (
            id TEXT NOT NULL PRIMARY KEY,
            session_key TEXT NOT NULL,
            user_id TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`,
        []
    );
}

export function createSession(userId: string): void {
    const sessionKey = newSessionKey();
    const timestamp = now();
    run(
        "INSERT INTO sessions (id, session_key, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
        [uuidv4(), sessionKey, userId, timestamp, timestamp]
    );
    console.log(`new session user_id:${userId} session_key:${sessionKey}`);
}

export function sessions(): Session[] {
    return all<Session>(`SELECT * FROM sessions`);
}

export function refreshSession(sessionId: string): void {
    return run(
        `UPDATE sessions SET session_key = ?, updated_at = ? WHERE id = ?`,
        [newSessionKey(), now(), sessionId]
    );
}

export function authenticateSession(
    sessionKey: string
): undefined | users.User {
    const session: Session | undefined = get<Session>(
        "SELECT * FROM sessions WHERE session_key = ?",
        [sessionKey]
    );

    if (session !== undefined) {
        refreshSession(session.id);
    }

    return session?.user_id ? users.byId(session.user_id) : undefined;
}

export function deleteSession(id: string): void {
    run("DELETE FROM sessions WHERE id = ?;", [id]);
}
