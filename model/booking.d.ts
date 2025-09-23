import { EBookingStatus } from "@/app/enum/BookingStatus";
export interface IBooking {
    id: number;
    user_id: number;
    tour_id: number;
    status: EBookingStatus;
    start_date: string;
    end_date: string;
    price: number;
}

export interface IMyBookings {
    id: number;
   name: string;
    destination: string;
    startDate: string;
    endDate: string;
    price: number;
    images: string[];
    status: EBookingStatus;
}

export interface ISellerOrders {
    id: number;
    images: string;
    name: string;
    price: number;
    destination: string;
    startDate: string;
    endDate: string;
    userName: string;
    phone: string;
    email: string;
    status: EBookingStatus;
}