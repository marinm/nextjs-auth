"use client";

import Link from "next/link";
import { useUser } from "./UserContext";

export default function Page() {
    const { user } = useUser();

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
