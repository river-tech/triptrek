import { IReview } from "./review";
export interface ITour {
    id: number;
    name: string;
    description: string;
    image: string[];
    destination_id: number;
    guide_name: string;
    price: number;
    start_date: string;
    end_date: string;
    create_by_user_id: number;
}

export interface ITourFormData {
    name: string
    description: string
    price: number
    startDate: string
    endDate: string
    destinationId: number 
    guideName: string
    images: string[];
  }
  
export interface ITourDetail {
    id: number;
    name: string;
    description: string;
    price: number;
    startDate: string;   // ISO date string
    endDate: string;     // ISO date string
    destination: string;
    images: string[];
    reviews: IReview[];
    guideName: string;
}



