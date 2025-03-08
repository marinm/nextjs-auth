import * as db from "@/data/database";
import { uuidv4, now, hashedPassword } from "@/utils";

export type User = {
    id: string;
    username: string;
    password: string;
    created_at: string;
    updated_at: string;
};

export function createTable(): void {
    db.run(
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
        db.get(`SELECT 1 FROM users WHERE username = ?`, username) !== undefined
    );
}

export function all(): User[] {
    return db.all<User>(`SELECT id,username,created_at,updated_at FROM users`);
}

export function create(username: string, password: string): void {
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
    db.run(`INSERT INTO users VALUES (?, ?, ?, ?, ?);`, [
        uuidv4(),
        username,
        hashedPassword(password),
        timestamp,
        timestamp,
    ]);
}

export function byUsername(username: string): undefined | User {
    return db.get<User>(`SELECT * FROM users WHERE username = ?;`, username);
}

export function byId(id: string): undefined | User {
    return db.get<User>(`SELECT * FROM users WHERE id = ?;`, id);
}
