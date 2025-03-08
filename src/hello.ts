import dotenv from "dotenv";
import Database from "better-sqlite3";

dotenv.config();

function main(): void {
    const db = new Database(process.env.DATABASE_URL);
    db.pragma("journal_mode = WAL");

    const [, , statement] = process.argv;

    const prepared = db.prepare(statement);

    const result = prepared.reader ? prepared.all() : prepared.run();

    console.log(result);

    db.close();
}

main();
