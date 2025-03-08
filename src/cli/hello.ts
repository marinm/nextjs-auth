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
        default:
            console.error("Command does not exist");
    }
}

main();
