export interface IUser {
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface IUserReview {
    id: number;
    name: string;
    avatar: string;
}

export interface IProfile {
    username: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface IResetPassword {
    email: string;
    otp: string;
    newPassword: string;
}

export interface IRequestOTP {
    email: string;
}

export interface IUserAdmin{
    id: number;
    username: string;
    email: string;
    avatar: string;
}