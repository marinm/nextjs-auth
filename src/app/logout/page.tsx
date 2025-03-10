"use server";

import * as auth from "@/auth/auth";

export default async function Page() {
    const loggedOut = await auth.logout();

    if (!loggedOut) {
        return <div className="container">You are already logged out</div>;
    }

    return <div className="container">Logged out</div>;
}
