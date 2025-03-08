export default function Page() {
    return (
        <div>
            <form>
                <input
                    type="text"
                    autoComplete="username"
                    name="username"
                    placeholder="Username"
                />
                <input
                    type="password"
                    autoComplete="password"
                    name="password"
                    placeholder="Password"
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}
