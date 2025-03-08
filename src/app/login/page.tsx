import { login } from "@/app/actions";

export default function Page() {
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center">
            <form action={login} className="d-grid gap-3">
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
