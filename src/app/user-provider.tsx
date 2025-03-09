"use client";

import { useState, createContext, useContext } from "react";
import { User } from "@/data/users";

export type UserContextType = {
    user: null | User;
    setUser: (user: null | User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<null | User>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
