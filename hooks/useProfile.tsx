import { useToast } from "@/app/Toast/ToastContext";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { ITourFormData } from "@/model/tour";
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
        const response = await fetch(`${apiUrl}/tours/my-tours/${id}`,{
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


    const editMyTourCreated = async ({id, data}:{id:string, data:ITourFormData}) => {
      try {
        const response = await fetch(`${apiUrl}/tours/my-tours/${id}`,{
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${getToken()}`,
          },
          body: JSON.stringify(data)
        });
        const res = await response.json();
        if(response.ok){
          showSuccess(res?.message);
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

    return { getProfile, updateProfile,  changePassword, requestOTP, resetPassword, getMyTourCreated, deleteMyTourCreated, editMyTourCreated };
}