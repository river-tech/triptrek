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