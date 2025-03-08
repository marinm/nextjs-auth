import Database from "better-sqlite3";
import crypto from "node:crypto";

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

export function randomHex(n: number): void {
    console.time("randomHex");
    const result = crypto.randomBytes(n).toString("hex");
    console.timeEnd("randomHex");
    console.log(result);
}
