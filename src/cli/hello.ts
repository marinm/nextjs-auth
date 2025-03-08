import dotenv from "dotenv";
import * as commands from "./commands";

dotenv.config();

function main(): void {
    const [, , command] = process.argv;

    switch (command) {
        case "tables":
            commands.tables();
            break;
        case "randomHex":
            commands.randomHex(16);
            break;
        default:
            console.log("Command does not exist");
    }
}

main();
