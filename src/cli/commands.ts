import Database from "better-sqlite3";
import crypto from "node:crypto";
import * as uuid from "uuid";

export function tables(): void {
    console.time("db:connect");
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");
    console.timeEnd("db:connect");

    console.time("db:run");
    const prepared = db.prepare("SELECT * FROM sqlite_master");
    const result = prepared.reader ? prepared.all() : prepared.run();
    console.timeEnd("db:run");

    console.log(result);

    db.close();
}

export function drop(table: string): void {
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");

    db.prepare(`DROP TABLE IF EXISTS ${table}`).run();

    db.close();
}

export function randomHex(n: number): string {
    console.time("randomHex");
    const result: string = crypto.randomBytes(n).toString("hex");
    console.timeEnd("randomHex");
    console.log(result);
    return result;
}

export function hashedPassword(password: string): string {
    const salt = randomHex(16);
    console.time("crypto.scryptSync");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    console.timeEnd("crypto.scryptSync");
    console.log(password, salt, hash);
    return hash;
}

export function uuidv4(): string {
    console.time("uuid:v4");
    const result = uuid.v4();
    console.timeEnd("uuid:v4");
    console.log("uuid:v4: " + result);
    return result;
}

export function now(): string {
    const datetime = new Date();

    const y = datetime.getUTCFullYear();
    const m = String(datetime.getUTCMonth()).padStart(2, "0");
    const d = String(datetime.getUTCDate()).padStart(2, "0");
    const h = String(datetime.getUTCHours()).padStart(2, "0");
    const i = String(datetime.getUTCMinutes()).padStart(2, "0");
    const s = String(datetime.getUTCSeconds()).padStart(2, "0");

    const result = `${y}-${m}-${d} ${h}:${i}:${s}`;

    console.log("now: " + result);
    return result;
}

export function createUsersTable(): void {
    console.time("db:connect");
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");
    console.timeEnd("db:connect");

    const statement = `
            CREATE TABLE IF NOT EXISTS users (
                id TEXT NOT NULL,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );
        `;

    console.time("db:prepare");
    const prepared = db.prepare(statement);
    console.timeEnd("db:prepare");

    console.time("db:run");
    prepared.run();
    console.timeEnd("db:run");

    db.close();
}

export function usernameExists(username: string): boolean {
    console.time("db:connect");
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");
    console.timeEnd("db:connect");

    const statement = `
            SELECT 1
            FROM users
            WHERE username = ?
        `;

    console.time("db:prepare");
    const prepared = db.prepare(statement);
    console.timeEnd("db:prepare");

    console.time("db:run");
    const exists = prepared.get(username) !== undefined;
    console.timeEnd("db:run");

    db.close();

    console.log("exists: " + (exists ? "yes" : "no"));
    return exists;
}
