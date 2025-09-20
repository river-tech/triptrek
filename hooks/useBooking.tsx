import { useToast } from "@/app/Toast/ToastContext";
import useAuth from "./useAuth";
import { ITourFormData } from "@/model/tour";

export default function useBooking() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { showError, showSuccess } = useToast();
  const { getToken } = useAuth();
  const bookingTour = async ({
    tourId,
    startDate,
    endDate,
  }: {
    tourId: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      const response = await fetch(`${apiUrl}/bookings/${tourId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });
      const data = await response.json();
      if (response.ok) {
        showSuccess("Đặt tour thành công");
      }
      return data;
    } catch (error) {
      showError("Đặt tour thất bại, vui lòng thử lại !");
      console.log(error);
    }
  };
  const postReviewTour = async ({
    tourId,
    comment,
    rating,
  }: {
    tourId: string;
    comment: string;
    rating: number;
  }) => {
    try {
      const response = await fetch(`${apiUrl}/reviews/tours/${tourId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, rating }),
      });
      
      if (response.ok) {
        showSuccess("Đánh giá tour thành công");
      }
    } catch (error) {
      showError("Đánh giá tour thất bại, vui lòng thử lại !");
      console.log(error);
    }
  };

  const updateReview = async ({
    id,
    comment,
    rating,
  }: {
    id: string;
    comment: string;
    rating: number;
  }) => {
    try {
      const response = await fetch(`${apiUrl}/reviews/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, rating }),
      });
      if (response.ok) {
        showSuccess("Cập nhật đánh giá thành công");
      }
    } catch (error) {
      showError("Cập nhật đánh giá tour thất bại, vui lòng thử lại !");
      console.log(error);
    }
  };

  const deleteReview = async ({ id }: { id: string }) => {
    try {
      const response = await fetch(`${apiUrl}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
    
      if (response.ok) {
        showSuccess("Xóa đánh giá thành công");
      }
     
    } catch (error) {
      showError("Xóa đánh giá thất bại, vui lòng thử lại !");
      console.log(error);
    }
  };

  const createTour = async ({
   data 
  }: {
    data: ITourFormData
  }) => {
    try {
      const response = await fetch(`${apiUrl}/tours/create-tours`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          data
        ),
      });
      console.log(`response`, JSON.stringify({
       data
      }))
      const res = await response.json();
      if (response.ok) {
        showSuccess("Tạo tour thành công");
      }
      else{
        return null;
      }
      return res;
    } catch (error) {
      showError("Tạo tour thất bại, vui lòng thử lại !");
      console.log(error);
    }
  };
  
  const cancelBooking = async ({ id }: { id: string }) => {
    try {
      const response = await fetch(`${apiUrl}/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.ok) {
        showSuccess(res?.message);
      }
      else {
        showError(res?.message);
        return null;
      }
    } catch (error) {
      showError("Hủy đặt tour thất bại, vui lòng thử lại !");
      console.log(error);
    }
  };

  
 
  return {createTour, bookingTour, postReviewTour, updateReview, deleteReview, cancelBooking};
}
