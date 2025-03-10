"use server";

import Link from "next/link";
import { sessionUser } from "./session-user";

export default async function Page() {
    const user = await sessionUser();

    const loginButton = <Link href="/login">Login</Link>;

    return (
        <div className="container">
            <h1>Home</h1>
            <Link href="/me" className="btn btn-primary">
                Me
            </Link>
            {user ? `logged in as ${user.username}` : loginButton}
        </div>
    );
}
