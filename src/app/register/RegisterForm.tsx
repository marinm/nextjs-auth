"use client";

import { FormState, register } from "@/app/actions";
import Link from "next/link";
import { useActionState } from "react";

const initialFormState = "Welcome, traveler...";

export function RegisterForm() {
    const [formState, formAction] = useActionState<FormState>(
        register,
        initialFormState
    );

    return (
        <>
            <p className="mb-3">{formState}</p>
            <form
                action={formAction}
                className="d-grid gap-3 w-100 mb-5"
                style={{ maxWidth: "30em" }}
            >
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
                        autoComplete="new-password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                    />
                    <label>Password</label>
                </div>

                <button type="submit" className="btn btn-primary mt-4">
                    Register
                </button>
            </form>

            <Link href="/">Log in</Link>
        </>
    );
}
