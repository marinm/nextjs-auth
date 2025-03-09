import type { Metadata } from "next";
import UserProvider from "@/app/user-provider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "Auth",
    description: "marinm/auth",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
