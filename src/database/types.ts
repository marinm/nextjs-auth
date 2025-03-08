export type User = {
    id: string;
    username: string;
    password: string;
    created_at: string;
    updated_at: string;
};

export type Session = {
    id: string;
    session_key: string;
    user_id: string;
    created_at: string;
    updated_at: string;
};
