"use client";

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./user-provider";

export default function Page() {
    const user = useContext(UserContext);

    const loginButton = <Link href="/login">Login</Link>;

    return (
        <div>
            <h1>Home</h1>
            <Link href="/me" className="btn btn-primary">
                Me
            </Link>
            {user ? "already logged in" : loginButton}
        </div>
    );
}
