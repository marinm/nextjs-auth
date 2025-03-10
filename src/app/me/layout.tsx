"use server";

import UserContext from "@/app/UserContext";
import { sessionUser } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await sessionUser();

    if (!user) {
        redirect("/login");
    }

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
