import dotenv from "dotenv";
import Database from "better-sqlite3";

dotenv.config();

function main(): void {
    console.time("db:connect");
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");
    console.timeEnd("db:connect");

    const [, , statement] = process.argv;

    console.time("db:run");
    const prepared = db.prepare(statement);
    const result = prepared.reader ? prepared.all() : prepared.run();
    console.timeEnd("db:run");

    console.log(result);

    db.close();
}

main();
