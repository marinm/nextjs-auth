import dotenv from "dotenv";
import * as database from "@/data/database";
import * as users from "@/data/users";
import * as sessions from "@/data/sessions";
import * as auth from "@/auth/auth";

dotenv.config();

function main(): void {
    const [, , command, ...args] = process.argv;
    console.table(run(command, args));
}

function run(command: string, args: string[]) {
    const commandHandlers: Record<string, () => unknown> = {
        run: () => database.run(args[0]),
        all: () => database.all(args[0]),
        tables: () => database.tables(),
        tableInfo: () => database.tableInfo(args[0]),
        drop: () => database.drop(args[0]),
        createUsersTable: () => users.createTable(),
        createUser: () => users.create(args[0], args[1]),
        users: () => users.all(),
        usernameExists: () => users.usernameExists(args[0]),
        "users.find": () => users.find(args[0]),
        getUserByUsername: () => users.byUsername(args[0]),
        login: () => auth.login(args[0], args[1]),
        logout: () => auth.logout(args[0]),
        createSessionsTable: () => sessions.createTable(),
        createSession: () => sessions.create(args[0]),
        sessions: () => sessions.all(),
        "sessions.sessionUser": () => sessions.sessionUser(args[0]),
        refreshSession: () => sessions.refresh(args[0]),
        deleteSession: () => sessions.del(args[0]),
    };

    const handler = commandHandlers[command];

    return handler ? handler() : "Command does not exist";
}

main();
