import dotenv from "dotenv";
import * as commands from "./commands";

dotenv.config();

function main(): void {
    const [, , command, ...args] = process.argv;

    switch (command) {
        case "tables":
            commands.tables();
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
        default:
            console.error("Command does not exist");
    }
}

main();
