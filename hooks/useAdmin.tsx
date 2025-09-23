import { useToast } from "@/app/Toast/ToastContext";
import { IUserAdmin } from "@/model/user";
import useAuth from "./useAuth";
export default function useAdmin() {
    const { getToken } = useAuth();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { showError, showSuccess } = useToast();

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

    const getallUsers = async () : Promise<IUserAdmin[] | null> => {
        try {
            const response = await fetch(`${apiUrl}/auth/all-users`,
                {
                    headers: {
                        "Authorization": `Bearer ${getToken()}`
                    }
                }
            );
            const data = await response.json();
            if(response.ok){
                console.log("data", data);
                return data;
            }
            else{
                showError(data?.message);
                return null;
            }
            return data;
        }
        catch (error) {
            console.log(error);
            showError("Kết nối tới server thất bại");
            return null;
        }
    }
   
   
    return {getAllTourBookingsToday, showError, showSuccess, getallUsers};
}