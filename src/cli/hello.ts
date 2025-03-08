import dotenv from "dotenv";
import * as commands from "./commands";

dotenv.config();

function main(): void {
    const [, , command, ...args] = process.argv;

    switch (command) {
        case "run":
            commands.run(args[0]);
            break;
        case "all":
            commands.all(args[0]);
            break;
        case "tables":
            commands.tables();
            break;
        case "tableInfo":
            commands.tableInfo(args[0]);
            break;
        case "drop":
            commands.drop(args[0]);
            break;
        case "randomHex":
            commands.randomHex(parseInt(args[0]));
            break;
        case "hashedPassword":
            commands.hashedPassword(args[0]);
            break;
        case "uuid:v4":
            commands.uuidv4();
            break;
        case "now":
            commands.now();
            break;
        case "createUsersTable":
            commands.createUsersTable();
            break;
        case "createUser":
            commands.createUser(args[0], args[1]);
            break;
        case "users":
            commands.users();
            break;
        case "usernameExists":
            commands.usernameExists(args[0]);
            break;
        case "getUserById":
            commands.getUserById(args[0]);
            break;
        case "getUserByUsername":
            commands.getUserByUsername(args[0]);
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
