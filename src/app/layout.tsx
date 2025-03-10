import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "Auth",
    description: "marinm/auth",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body data-bs-theme="dark">{children}</body>
        </html>
    );
}
