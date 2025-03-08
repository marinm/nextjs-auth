import * as db from "@/data/database";
import * as users from "@/data/users";
import { newSessionKey, now, uuidv4 } from "@/utils";

export type Session = {
    id: string;
    session_key: string;
    user_id: string;
    created_at: string;
    updated_at: string;
};

export function createTable(): void {
    db.run(
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

export function get(sessionId: string): undefined | Session {
    return db.get("SELECT * FROM sessions WHERE id = ?;", [sessionId]);
}

export function create(userId: string): undefined | Session {
    const sessionKey = newSessionKey();
    const timestamp = now();
    const id = uuidv4();
    db.run(
        "INSERT INTO sessions (id, session_key, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
        [id, sessionKey, userId, timestamp, timestamp]
    );
    return get(id);
}

export function all(): Session[] {
    return db.all<Session>(`SELECT * FROM sessions`);
}

export function refresh(sessionId: string): void {
    db.run(`UPDATE sessions SET session_key = ?, updated_at = ? WHERE id = ?`, [
        newSessionKey(),
        now(),
        sessionId,
    ]);
}

export function authenticate(sessionKey: string): undefined | users.User {
    const session: Session | undefined = db.get<Session>(
        "SELECT * FROM sessions WHERE session_key = ?",
        [sessionKey]
    );

    if (session !== undefined) {
        refresh(session.id);
    }

    return session?.user_id ? users.byId(session.user_id) : undefined;
}

export function del(id: string): void {
    db.run("DELETE FROM sessions WHERE id = ?;", [id]);
}
