import { useToast } from "@/app/Toast/ToastContext";
import useAuth from "./useAuth";
export default function useAdmin() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { showError, showSuccess } = useToast();
    const { getToken } = useAuth();

    const getAllTourBookingsToday = async () => {
        try {
            const response = await fetch(`${apiUrl}/tours/bookings/today`);
            const data = await response.json();
            if(response.ok){
                return data;
            }
            else{
                showError(data?.message);
                return null;
            }
        } catch (error) {
            console.log(error);
            showError("Kết nối tới server thất bại");
            return null;
        }
    }
   
   
    return {getAllTourBookingsToday};
}