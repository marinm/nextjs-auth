import Database from "better-sqlite3";

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
