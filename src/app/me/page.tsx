import { useUser } from "../UserContext";

export default function Page() {
    const user = useUser();

    return (
        <div>
            <h1>Me: {user.username}</h1>
        </div>
    );
}
