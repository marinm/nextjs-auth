"use client";

import { useUser } from "../UserContext";

export default function Page() {
    const { user, setUser } = useUser();

    if (user !== null) {
        console.log(JSON.stringify(user));
        return "login: you are already logged in as " + user.username;
    }

    async function onSubmit(formData: FormData) {
        const result = await fetch("/api/login", {
            method: "POST",
            body: formData,
        }).then((response) => response.json());
        setUser(result);
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
