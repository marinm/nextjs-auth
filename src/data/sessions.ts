import * as db from "@/data/database";
import * as users from "@/data/users";
import { randomHex, now } from "@/utils";

export type Session = {
    id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
};

export function newSessionId(): string {
    return randomHex(128);
}

export function createTable(): void {
    db.run(
        `CREATE TABLE IF NOT EXISTS sessions (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`,
        []
    );
}

export function find(id: string): undefined | Session {
    return db.get("SELECT * FROM sessions WHERE id = ?;", [id]);
}

export function create(userId: string): undefined | Session {
    const id = newSessionId();
    const timestamp = now();
    db.run(
        "INSERT INTO sessions (id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?);",
        [id, userId, timestamp, timestamp]
    );
    return find(id);
}

export function all(): Session[] {
    return db.all<Session>(`SELECT * FROM sessions`);
}

export function refresh(sessionId: string): void {
    db.run(`UPDATE sessions SET id = ?, updated_at = ? WHERE id = ?`, [
        newSessionId(),
        now(),
        sessionId,
    ]);
}

export function sessionUser(sessionId: string): null | users.User {
    const session = find(sessionId);

    if (session === undefined) {
        return null;
    }

    const user = users.find(session.user_id);

    // refresh(session.id);

    return user ?? null;
}

export function del(id: string): void {
    db.run("DELETE FROM sessions WHERE id = ?;", [id]);
}
