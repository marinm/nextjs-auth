import { redirect } from "next/navigation";
import { sessionUser } from "@/auth/auth";

export default async function Page() {
    const user = await sessionUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div>
            <h1>Me: {user.username}</h1>
        </div>
    );
}
