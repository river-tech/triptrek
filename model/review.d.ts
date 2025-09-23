import { IUserReview } from "./user";
export interface IReview {
    id: number;
    rating: string;
    comment: string;
    user : IUserReview;
    createdAt: string;
    isMyComment: boolean;
  }

export interface IShowReview {
    id: number;
    user_id: number;
    user_name: string;
    user_avatar: string;
    is_my_review: boolean;
    comment: string;
    rating: number;
    image: string;
    created_at: string;
}

export interface ImageReview{
    id: number;
    review_id: number;
    image: string;
}