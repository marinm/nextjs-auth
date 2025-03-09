"use client";

import { useContext } from "react";
import { UserContext } from "../user-provider";

async function onSubmit(formData: FormData) {
    return fetch("/api/login", {
        method: "POST",
        body: formData,
    }).then((response) => response.json());
}

export default function Page() {
    const user = useContext(UserContext);

    if (user !== null) {
        console.log(user);
        return "you are already logged in";
    }

    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center">
            <form action={onSubmit} className="d-grid gap-3">
                <div className="form-floating">
                    <input
                        type="text"
                        autoComplete="username"
                        name="username"
                        placeholder="Username"
                        className="form-control"
                    />
                    <label>Username</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        autoComplete="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                    />
                    <label>Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg mt-4">
                    Log in
                </button>
            </form>
        </div>
    );
}
