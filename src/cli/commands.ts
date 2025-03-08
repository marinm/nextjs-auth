import Database from "better-sqlite3";
import { User, Session } from "@/database/types";
import {
    hashedPassword,
    passwordsMatch,
    now,
    uuidv4,
    newSessionKey,
} from "@/utils";

export function run(statement: string, params: unknown = []): void {
    console.log("run:params", params);

    console.time("db:connect");
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");
    console.timeEnd("db:connect");

    console.time("db:run");
    const prepared = db.prepare(statement);
    const result = prepared.run(params);
    console.timeEnd("db:run");

    console.log(result);

    db.close();
}

export function get<T>(statement: string, params: unknown = []): undefined | T {
    console.time("db:connect");
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");
    console.timeEnd("db:connect");

    console.time("db:run");
    const prepared = db.prepare(statement);
    const result = prepared.get(params) as T;
    console.timeEnd("db:run");

    console.log(result);

    db.close();

    return result;
}

export function all<T>(statement: string, params: unknown = []): T[] {
    console.time("db:connect");
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");
    console.timeEnd("db:connect");

    console.time("db:run");
    const prepared = db.prepare(statement);
    const result = prepared.all(params) as T[];
    console.timeEnd("db:run");

    console.table(result);

    db.close();

    return result;
}

export function tables(): void {
    all("SELECT name FROM sqlite_master");
}

export function tableInfo(table: string): void {
    all(`PRAGMA table_info(${table})`);
}

export function drop(table: string): void {
    run(`DROP TABLE IF EXISTS ${table}`);
}

export function createUsersTable(): void {
    run(
        `CREATE TABLE IF NOT EXISTS users (
            id TEXT NOT NULL PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );`,
        []
    );
}

export function usernameExists(username: string): boolean {
    return (
        get(`SELECT 1 FROM users WHERE username = ?`, username) !== undefined
    );
}

export function users(): User[] {
    return all<User>(`SELECT id,username,created_at,updated_at FROM users`);
}

export function createUser(username: string, password: string): void {
    if (username.length < 2) {
        throw new Error("Username must be at least 2 characters long");
    }

    if (username.length > 32) {
        throw new Error("Username must be at most 32 characters long");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    if (password.length > 32) {
        throw new Error("Password must be at most 32 characters long");
    }

    if (usernameExists(username)) {
        throw new Error(`Username ${username} already exists`);
    }

    const timestamp = now();
    run(`INSERT INTO users VALUES (?, ?, ?, ?, ?);`, [
        uuidv4(),
        username,
        hashedPassword(password),
        timestamp,
        timestamp,
    ]);
}

export function getUserByUsername(username: string): undefined | User {
    return get<User>(`SELECT * FROM users WHERE username = ?;`, username);
}

export function getUserById(id: string): undefined | User {
    return get<User>(`SELECT * FROM users WHERE id = ?;`, id);
}

export function signIn(username: string, password: string): boolean {
    const user = getUserByUsername(username);

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

export function authenticateSession(sessionKey: string): undefined | User {
    const session: Session | undefined = get<Session>(
        "SELECT * FROM sessions WHERE session_key = ?",
        [sessionKey]
    );

    if (session !== undefined) {
        refreshSession(session.id);
    }

    return session?.user_id ? getUserById(session.user_id) : undefined;
}

export function deleteSession(id: string): void {
    run("DELETE FROM sessions WHERE id = ?;", [id]);
}
