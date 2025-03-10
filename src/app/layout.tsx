import type { Metadata } from "next";
import UserProvider from "@/app/UserContext";

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
                <div className="container">
                    <UserProvider>{children}</UserProvider>
                </div>
            </body>
        </html>
    );
}
