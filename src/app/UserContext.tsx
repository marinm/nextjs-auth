"use client";

import { createContext, useContext } from "react";
import { User } from "@/data/users";

const UserContext = createContext<null | User>(null);

export function useUser(): User {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export default UserContext;
