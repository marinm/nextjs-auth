import { sessionUser } from "@/auth/auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

export default async function Page() {
    const user = await sessionUser();

    if (user !== null) {
        redirect("/me");
    }

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <RegisterForm />
        </div>
    );
}
