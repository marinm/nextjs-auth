import dotenv from "dotenv";
import Database from "better-sqlite3";

dotenv.config();

const db = new Database(process.env.DATABASE_URL);
db.pragma("journal_mode = WAL");

console.log(db);

db.close();
