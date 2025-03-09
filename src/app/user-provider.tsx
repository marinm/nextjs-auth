"use client";

import { createContext } from "react";

export const UserContext = createContext(null);

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
}
