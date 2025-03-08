import * as users from "@/data/users";
import * as sessions from "@/data/sessions";
import { passwordsMatch } from "@/utils";

export function signIn(username: string, password: string): boolean {
    const user = users.byUsername(username);

    if (!user) {
        throw new Error("That username does not exist");
    }

    const [salt, hash] = user.password.split("-");
    const authenticated = passwordsMatch(password, salt, hash);

    if (authenticated) {
        sessions.create(user.id);
    }

    console.log("authenticated: " + (authenticated ? "yes" : "no"));

    return authenticated;
}

export function signOut(sessionId: string): void {
    sessions.del(sessionId);
}
