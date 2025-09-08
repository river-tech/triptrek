export interface IReview {
    id : number;
    user_id: number;
    food_id: number;
    tour_id: number;
    comment: string;
    rating: number;
    image: string;
    created_at: string;
}

export interface IShowReview {
    id: number;
    user_id: number;
    user_name: string;
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