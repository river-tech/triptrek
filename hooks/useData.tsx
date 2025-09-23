import { useToast } from "@/app/Toast/ToastContext";
import { IDestinationDetail, IFamousDestination } from "@/model/destination";
import useAuth from "./useAuth";
import { ITourByDes, ITourDetail, ITourPopular } from "@/model/tour";
import { IFoodByDes } from "@/model/food";

export default function useData() {
    const { showError } = useToast();
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
    const getPopularTours = async () : Promise<ITourPopular[] | null> => {
      try {
        const response = await fetch(`${apiUrl}/tours/popular`);
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
        return null;
      }
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
            const response = await fetch(`${apiUrl}/tours/search-tour?destination=${destination}&price=${price}`);
            const data = await response.json();
            if(response.ok){
                return data;
            }
            else{
                showError(data?.message);
                return null;
            }
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

    const getDestinationById = async (id: string):Promise<IDestinationDetail | null> => {
        try {
            const response = await fetch(`${apiUrl}/destination/${id}`);
            const data = await response.json();
            if(response.ok){
                // console.log("data", data);
                return data;
            }
            else{
                showError(data?.message);
                return null;
            }
         
        } catch (error) {
            showError("Lấy thông tin điểm đến thất bại, vui lòng thử lại!");
            console.log(error);
            return null;
        }
    }

    const getTourByDestination = async (id: string):Promise<ITourByDes[] | null> => {
        try {
            const response = await fetch(`${apiUrl}/tours/destination/${id}`);
            const data = await response.json();
            if(response.ok){
                console.log("data", data);
                return data;
            }
            else{
                showError(data?.message);
                return null;
            }
        }
        catch (error) {
            showError("Lấy danh sách tour thất bại, vui lòng thử lại!");
            console.log(error);
            return null;
        }
    }

    const getFoodByDestination = async (id: string):Promise<IFoodByDes[] | null> => {
        try {
            const response = await fetch(`${apiUrl}/foods/destination/${id}`);
            const data = await response.json();
            if(response.ok){
                return data;
            }
            else{
                showError(data?.message);
                return null;
            }
        }
        catch (error) {
            showError("Lấy danh sách món ăn thất bại, vui lòng thử lại!");
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
        getTourByDestination,
        getFoodByDestination,
    };
}