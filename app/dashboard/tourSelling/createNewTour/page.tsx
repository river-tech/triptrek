"use client";

import React, { useState, useRef, useEffect  } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faMapMarkerAlt,
  faUser,
  faCalendar,
  faTag,
  faFileText,
  faUpload,
  faPlus,
  faTimes,
  faSpinner,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/app/common/BackButton";
import { useRouter } from "next/navigation";
import useBooking from "@/hooks/useBooking";
import { ITourFormData } from "@/model/tour";
import useData from "@/hooks/useData";



const CreateNewTour = () => {
  const [formData, setFormData] = useState<ITourFormData>({
    name: "",
    description: "",
    price: 0,
    startDate: "",
    endDate: "",
    destinationId: 0,
    guideName: "",
    images: [],
  });
  type destinationType = {
    id: number;
    name: string;
  };
  const [destinationList, setDestinationList] = useState<destinationType[]>([]);
  const { createTour } = useBooking();
  const { getAllDestinations } = useData();
  useEffect(() => {
    const fetchDestinations = async () => {
      const res: destinationType[] = await getAllDestinations();
      setDestinationList(res || []);
    }
    fetchDestinations();
  }, []);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState("");
  const [loadingImages, setLoadingImages] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Để biết đang upload cho index nào
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const handleInputChange = (
    field: keyof ITourFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || uploadingIdx === null) return;

    // Set loading for this index
    setLoadingImages((prev) => {
      const arr = [...prev];
      arr[uploadingIdx] = true;
      return arr;
    });

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "demo_frame_print"); // đổi bằng preset của bạn

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );
      const data = await res.json();
      // Cập nhật imagePreview và formData.image tại vị trí uploadingIdx
      setImagePreview((prev) => {
        const arr = [...prev];
        arr[uploadingIdx] = data.url;
        return arr;
      });
      setFormData((prev) => ({
        ...prev,
        images: (() => {
          const arr = [...prev.images];
          arr[uploadingIdx] = data.url;
          return arr;
        })(),
      }));
    } catch (err) {
      // Có thể show lỗi ở đây nếu muốn
    } finally {
      setLoadingImages((prev) => {
        const arr = [...prev];
        arr[uploadingIdx!] = false;
        return arr;
      });
      setUploadingIdx(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = (idx: number) => {
    setUploadingIdx(idx);
    fileInputRef.current?.click();
  };

  const removeImage = (idx: number) => {
    setImagePreview((prev) => {
      const arr = [...prev];
      arr[idx] = undefined as any;
      return arr;
    });
    setFormData((prev) => ({
      ...prev,
      image: (() => {
        const arr = [...prev.images];
        arr[idx] = undefined as any;
        return arr;
      })(),
    }));
    setLoadingImages((prev) => {
      const arr = [...prev];
      arr[idx] = false;
      return arr;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrors("Tên tour là bắt buộc");
      return false;
    }
    if (!formData.destinationId) {
      setErrors("Vui lòng chọn điểm đến");
      return false;
    }
    if (formData.price <= 0) {
      setErrors("Giá tour phải lớn hơn 0");
      return false;
    }
    if (!formData.startDate.trim()) {
      setErrors("Ngày bắt đầu là bắt buộc");
      return false;
    }
    if (!formData.endDate.trim()) {
      setErrors("Ngày kết thúc là bắt buộc");
      return false;
    }
    // Kiểm tra có ít nhất 1 ảnh
    if (!formData.images.filter(Boolean).length) {
      setErrors("Vui lòng tải lên ảnh tour");
      return false;
    }
    if (!formData.description.trim()) {
      setErrors("Mô tả tour là bắt buộc");
      return false;
    }
    if (!formData.guideName.trim()) {
      setErrors("Tên hướng dẫn viên là bắt buộc");
      return false;
    }
    setErrors("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(`formData`, formData);

    setSubmitting(true);
    const res = await createTour({
      data: formData,
    });
    if(res){
      router.push("/dashboard/tourSelling");
    }
    setSubmitting(false);
  };
  const router = useRouter();

  const currency = (n: number) =>
    n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <button onClick={() =>  router.push("/")} className='fixed cursor-pointer z-10 hover:bg-white/80 backdrop-blur-sm rounded-full p-2 hover:text-sky-500 flex px-2 bg-sky-500 text-white transition-all duration-300 items-center gap-2 top-10 left-10'>
    <FontAwesomeIcon icon={faArrowLeft} className='w-6 h-6' />
   
  </button> 
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tạo tour mới</h1>
          <p className="text-gray-600 mt-1">
            Điền thông tin chi tiết để tạo tour hấp dẫn
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6 text-black">
              {/* Tour Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faTag} className="mr-2 text-sky-500" />
                  Tên tour *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  placeholder="Ví dụ: Khám phá Đà Nẵng 5N4Đ"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-2 text-sky-500"
                  />
                  Điểm đến *
                </label>
                <select
                  value={formData.destinationId || ""}
                  onChange={(e) =>
                    handleInputChange("destinationId", Number(e.target.value))
                  }
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500`}
                >
                  <option value="">Chọn điểm đến</option>
                  {destinationList.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faTag} className="mr-2 text-sky-500" />
                  Giá tour (VNĐ) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", Number(e.target.value))
                  }
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 `}
                  placeholder="Ví dụ: 5000000"
                  min="0"
                />
                {formData.price > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Hiển thị: {currency(formData.price)}
                  </p>
                )}
              </div>

              {/* Guide Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-sky-500"
                  />
                  Tên hướng dẫn viên
                </label>
                <input
                  type="text"
                  value={formData.guideName}
                  onChange={(e) =>
                    handleInputChange("guideName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Tên hướng dẫn viên (không bắt buộc)"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-black">
              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="mr-2 text-sky-500"
                  />
                  Lịch trình *
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 `}
                  />
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 `}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon
                    icon={faFileText}
                    className="mr-2 text-sky-500"
                  />
                  Mô tả tour *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none `}
                  placeholder="Mô tả chi tiết về tour, điểm nổi bật..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="mr-2 text-sky-500"
                  />
                  Ảnh tour *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="relative w-full h-40">
                      {imagePreview[idx] ? (
                        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-300">
                          <Image
                            src={imagePreview[idx]}
                            alt={`Tour preview ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 cursor-pointer hover:bg-red-500 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                          >
                            <FontAwesomeIcon size="xs" icon={faTimes} />
                          </button>
                          {loadingImages[idx] && (
                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20">
                              <FontAwesomeIcon
                                icon={faSpinner}
                                spin
                                className="text-sky-500 text-2xl"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={() => triggerFileInput(idx)}
                          className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors relative"
                        >
                          {loadingImages[idx] ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                              <FontAwesomeIcon
                                icon={faSpinner}
                                spin
                                className="text-sky-500 text-2xl"
                              />
                            </div>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faCamera}
                                className="text-4xl text-gray-400 mb-2"
                              />
                              <p className="text-gray-600">
                                Nhấp để tải ảnh tour
                              </p>
                              <p className="text-sm text-gray-500">
                                JPG, PNG (tối đa 5MB)
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          {errors && <p className="text-red-600 text-sm mt-1">{errors}</p>}

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-3 rounded-lg text-white font-medium transition-colors ${
                  submitting
                    ? "bg-sky-300 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-600"
                }`}
              >
                {submitting ? (
                  <>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Tạo tour
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewTour;
