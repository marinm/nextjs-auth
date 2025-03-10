import Form from "next/form";
import { sessionUser } from "@/auth/auth";
import { redirect } from "next/navigation";
import * as auth from "@/auth/auth";
import { cookies } from "next/headers";

function toString(value: null | FormDataEntryValue): null | string {
    return typeof value === "string" ? value : null;
}

async function onSubmit(formData: FormData) {
    "use server";

    const username = toString(formData.get("username"));
    const password = toString(formData.get("password"));

    if (username === null || password === null) {
        redirect("/login");
    }

    const session = await auth.login(username, password);

    if (session === null) {
        redirect("/login");
    }

    const cookieStore = await cookies();

    cookieStore.set({
        name: "session_id",
        value: session.id,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/me");
}

export default async function Page() {
    const user = await sessionUser();

    if (user !== null) {
        console.log(JSON.stringify(user));
        return "login: you are already logged in as " + user.username;
    }

    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center">
            <Form action={onSubmit} className="d-grid gap-3">
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
            </Form>
        </div>
    );
}
