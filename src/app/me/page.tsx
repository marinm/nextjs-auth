import { redirect } from "next/navigation";
import * as auth from "@/auth/auth";

export default async function Page() {
    const user = await auth.sessionUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div className="d-flex flex-column align-items-stretch justify-content-stretch h-100 gap-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>@{user.username}</div>
                <button
                    onClick={auth.logout}
                    className="btn btn-outline-secondary"
                >
                    Logout
                </button>
            </div>
            <div className="card flex-grow-1">Tap to increment</div>
        </div>
    );
}
