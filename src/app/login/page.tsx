import Form from "next/form";
import { sessionUser } from "@/auth/auth";
import { login } from "@/app/actions";

export default async function Page() {
    const user = await sessionUser();

    if (user !== null) {
        console.log(JSON.stringify(user));
        return "login: you are already logged in as " + user.username;
    }

    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center">
            <Form action={login} className="d-grid gap-3">
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
