import Database from "better-sqlite3";

export function run(
    statement: string,
    params: unknown = []
): Database.RunResult {
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");

    const prepared = db.prepare(statement);
    const result = prepared.run(params);

    db.close();

    return result;
}

export function get<T>(statement: string, params: unknown = []): undefined | T {
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");

    const prepared = db.prepare(statement);
    const result = prepared.get(params) as T;

    db.close();

    return result;
}

export function all<T>(statement: string, params: unknown = []): T[] {
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");

    const prepared = db.prepare(statement);
    const result = prepared.all(params) as T[];

    db.close();

    return result;
}

export function tables(): unknown[] {
    return all("SELECT name FROM sqlite_master");
}

export function tableInfo(table: string): unknown[] {
    return all(`PRAGMA table_info(${table})`);
}

export function drop(table: string): void {
    run(`DROP TABLE IF EXISTS ${table}`);
}
