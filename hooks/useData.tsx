import { useToast } from "@/app/Toast/ToastContext";
import { IFamousDestination } from "@/model/destination";
import useAuth from "./useAuth";
import { ITourDetail } from "@/model/tour";

export default function useData() {
    const { showError, showSuccess } = useToast();
    const { getToken } = useAuth();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const getPopularDestinations = async (): Promise<IFamousDestination[] | undefined> => {
        try {
            const response = await fetch(`${apiUrl}/destination/popular`);
            const data: IFamousDestination[] = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    const getPopularTours = async () => {
        const response = await fetch(`${apiUrl}/tours/popular`);
        const data = await response.json();
        return data;
    }

    

    const getTourById = async (id: string): Promise<ITourDetail | null> => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/tours/${id}`,{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                },
            });
            if(response.ok){
                const data = await response.json();
            console.log("data", data);
            return data;
            }
            else{
                return null;
            }
            
        } catch (error) {
            // showError("Lấy thông tin tour thất bại, vui lòng thử lại !");
            return null;
        }
    }
    
    const searchTour = async ({destination, price}:{destination:string, price:string}) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/tours/search-tour?destination=${destination}&price=${price}`);
            const data = await response.json();
            return data;
        } catch (error) {
            showError("Tìm kiếm thất bại, vui lòng thử lại!");
            return null;
        }
    }

    const getAllDestinations = async () => {
        const allDes = localStorage.getItem("allDestinations");
        if(allDes){
            return JSON.parse(allDes);
        }
        try {
            const response = await fetch(`${apiUrl}/destination/all`,
                {
                    method: "GET",
                }
            );
            if(response.ok){
                const data = await response.json();
                localStorage.setItem("allDestinations", JSON.stringify(data));
                return data;
            }
            else{
                return null;
            }
        } catch (error) {
            showError("Lấy danh sách điểm đến thất bại, vui lòng thử lại!");
            console.log(error);
            return null;
        }
    }

    const getDestinationById = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/destination/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            showError("Lấy thông tin điểm đến thất bại, vui lòng thử lại!");
            console.log(error);
            return null;
        }
    }

    return {
        getPopularDestinations,
        searchTour,
        getPopularTours,
        getTourById,
        getAllDestinations,
        getDestinationById,
    };
}