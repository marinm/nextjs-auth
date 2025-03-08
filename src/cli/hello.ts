import dotenv from "dotenv";
import * as commands from "./commands";

dotenv.config();

function main(): void {
    const [, , command] = process.argv;

    switch (command) {
        case "tables":
            commands.tables();
            break;
        default:
            console.log("Command does not exist");
    }
}

main();
