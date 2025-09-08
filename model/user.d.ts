export interface IUser {
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface IProfile extends IUser {
    username: string;
    created_at: string;
    updated_at: string;
}