import type { Metadata } from "next";
import UserContext from "@/app/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { sessionUser } from "./session-user";

export const metadata: Metadata = {
    title: "Auth",
    description: "marinm/auth",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await sessionUser();
    console.log(user);

    return (
        <html lang="en">
            <body data-bs-theme="dark">
                <UserContext.Provider value={user}>
                    {children}
                </UserContext.Provider>
            </body>
        </html>
    );
}
