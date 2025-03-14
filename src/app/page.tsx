import Form from "next/form";
import { sessionUser } from "@/auth/auth";
import { login } from "@/app/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
    const user = await sessionUser();

    if (user !== null) {
        redirect("/me");
    }

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <Form
                action={login}
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
                        autoComplete="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                    />
                    <label>Password</label>
                </div>

                <button type="submit" className="btn btn-primary mt-4">
                    Log in
                </button>
            </Form>
            <Link href="/register">Register</Link>
        </div>
    );
}
