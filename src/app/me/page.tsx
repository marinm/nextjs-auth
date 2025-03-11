import { redirect } from "next/navigation";
import * as auth from "@/auth/auth";

export default async function Page() {
    const user = await auth.sessionUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div>
            <h1>Me: {user.username}</h1>
            <button onClick={auth.logout} className="btn btn-outline-primary">
                Logout
            </button>
        </div>
    );
}
