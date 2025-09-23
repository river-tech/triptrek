import { useToast } from "@/app/Toast/ToastContext";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { ITourDetailEdit } from "@/model/tour";
import { IMyBookings, ISellerOrders } from "@/model/booking";
import { EBookingStatus } from "@/app/enum/BookingStatus";

export default function useProfile() {
    const { getToken } = useAuth();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { showError, showSuccess } = useToast();
    const router = useRouter();
    const getProfile = async () => {
        try {
            const response = await fetch(`${apiUrl}/user/profile`,{
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            showError("Lỗi kết nối server");
            console.log(error);
        }
    }
    const updateProfile = async ({avatar, phone, username}:{avatar:string, phone:string, username:string}) => {
        console.log(JSON.stringify({avatar, phone, username}));
      try {
        const response = await fetch(`${apiUrl}/user/profile-update`,{
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({avatar, phone, username})
        });
        const res = await response.json();
        if(response.ok){
          showSuccess(res?.message);
        }
        else{
          showError(res?.message);
          return null;
        }
        return res;
      } catch (error) {
        showError("Lỗi kết nối server");
        console.log(error);
        return null;
      }
    }


    const changePassword = async ({oldPassword, newPassword}:{oldPassword:string, newPassword:string}) => {
        console.log(JSON.stringify({oldPassword, newPassword}));
      try {
        const response = await fetch(`${apiUrl}/auth/change-password`,{
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({oldPassword, newPassword})
        });

        const res = await response.json();
        console.log("res", res);

        if(response.ok){
          showSuccess(res?.message);
          router.push("/");    
        } else {
          showError(res?.message);
          return null;
        }
        return res;
      } catch (error) {
        showError("Lỗi kết nối server");
        console.log(error);
        return null;
      }
    }

    const requestOTP = async ({email}:{email:string}) => {
      try {
        const response = await fetch(`${apiUrl}/auth/forgot-password`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email})
          });
          const res = await response.json();
          if(response.ok){
            showSuccess("Yêu cầu OTP thành công");
          } else {
            showError(res?.message);
            return null;
          }
          return res;
      } catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    const resetPassword = async ({email, otp, newPassword}:{email:string, otp:string, newPassword:string}) => {
      try {
        const response = await fetch(`${apiUrl}/auth/reset-password`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, otp, newPassword})
        });
        const res = await response.json();
        if(response.ok){
          showSuccess(res?.message);
        } else {
          showError(res?.message);
          return null;
        }
        return res;
      }
      catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    const getMyTourCreated = async () => {
      try {
        const response = await fetch(`${apiUrl}/tours/my-tours`,{
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    const deleteMyTourCreated = async ({id}:{id:string}) => {
      try {
        const response = await fetch(`${apiUrl}/tours/${id}`,{
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        const data = await response.json();
        if(response.ok){
          showSuccess(data?.message);
        } else {
          showError(data?.message);
          return null;
        }
        return data;
      } catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }


    const editMyTourCreated = async ({id, data}:{id:string, data:ITourDetailEdit}) => {
      try {
        const response = await fetch(`${apiUrl}/tours/${id}`,{
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

       
        const res = await response.json();
        console.log(`res`, res)
        if(response.ok){
          showSuccess("cập nhật tour thành công");
          router.push("/dashboard/tourSelling");
        } else {
          showError("cập nhật tour thất bại");
          return null;
        }
        return res;
      } catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }
    
    const getTourCreateDetail = async ({id}:{id:string}) : Promise<ITourDetailEdit | null> => {
      try {
        const response = await fetch(`${apiUrl}/tours/see/${id}`,{
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        const res = await response.json();
        if(response.ok){
          return res;
        } else {
          showError(res?.message);
          return null;
        }
      } catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    const getMyBookings = async () : Promise<IMyBookings[] | null> => {
      try {
        const response = await fetch(`${apiUrl}/bookings/my-bookings`,{
          headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json()
        console.log(data)
        if(response.ok){
          return data;
        } else {
          showError(data?.message);
          return null;
        }
      } catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    const changeBookingStatus = async ({id, status}:{id:string, status:EBookingStatus}) => {
      try {
        const response = await fetch(`${apiUrl}/bookings/${id}/status`,{
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({status})
        });
        const data = await response.json();
        if(response.ok){
          showSuccess("Cập nhật trạng thái thành công");
        } else {
          showError("Cập nhật trạng thái thất bại");
          return null;
        }
        return data;
      }
      catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    const showSellerOrders = async () : Promise<ISellerOrders[] | null> => {
      try {
        const response = await fetch(`${apiUrl}/bookings/seller/all`,{
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          }
        });
        const data = await response.json();
        if(response.ok){
          console.log("data", data);
          return data;
        } else {
          showError(data?.message);
          return null;
        }
      } catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    const deleteSellerOrder = async ({bookingIds}:{bookingIds:string[]}) => {
      try {
        const response = await fetch(`${apiUrl}/bookings/seller`,{
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({bookingIds})
        });
        const data = await response.json();
        if(response.ok){
          showSuccess(data?.message);
        } else {
          showError(data?.message);
          return null;
        }
        return data;
      }
      catch (error) {
        console.log(error);
        showError("Lỗi kết nối server");
        return null;
      }
    }

    return { showSellerOrders,getProfile,changeBookingStatus, deleteSellerOrder, updateProfile,getMyBookings,  changePassword, requestOTP, resetPassword, getMyTourCreated, deleteMyTourCreated, editMyTourCreated, getTourCreateDetail };
}