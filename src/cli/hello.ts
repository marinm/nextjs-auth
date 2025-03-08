import dotenv from "dotenv";
import * as commands from "./commands";
import * as database from "@/database/database";
import * as users from "@/database/users";

dotenv.config();

function main(): void {
    const [, , command, ...args] = process.argv;

    switch (command) {
        case "run":
            database.run(args[0]);
            break;
        case "all":
            database.all(args[0]);
            break;
        case "tables":
            database.tables();
            break;
        case "tableInfo":
            database.tableInfo(args[0]);
            break;
        case "drop":
            database.drop(args[0]);
            break;
        case "createUsersTable":
            users.createTable();
            break;
        case "createUser":
            users.create(args[0], args[1]);
            break;
        case "users":
            users.all();
            break;
        case "usernameExists":
            users.usernameExists(args[0]);
            break;
        case "getUserById":
            users.byId(args[0]);
            break;
        case "getUserByUsername":
            users.byUsername(args[0]);
            break;
        case "signIn":
            commands.signIn(args[0], args[1]);
            break;
        case "createSessionsTable":
            commands.createSessionsTable();
            break;
        case "createSession":
            commands.createSession(args[0]);
            break;
        case "sessions":
            commands.sessions();
            break;
        case "authenticateSession":
            commands.authenticateSession(args[0]);
            break;
        case "refreshSession":
            commands.refreshSession(args[0]);
            break;
        case "deleteSession":
            commands.deleteSession(args[0]);
            break;
        case "signOut":
            commands.signOut(args[0]);
            break;
        default:
            console.error("Command does not exist");
    }
}

main();
