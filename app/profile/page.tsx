"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEdit,
  faSave,
  faUser,
  faPhone,
  faEnvelope,
  faLock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import BackButton from "../common/BackButton";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { IProfile } from "@/model/user";
import useProfile from "@/hooks/useProfile";

const SettingsPage = () => {
  const [profile, setProfile] = useState<IProfile>({
    username: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { handleLogout } = useAuth();
  const { getProfile, updateProfile } = useProfile();

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = (field: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: editValue,
    }));
    setIsEditing(null);
    setEditValue("");
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    await updateProfile({
      avatar: avatar || profile.avatar,
      phone: profile.phone,
      username: profile.username,
    });
    setSubmitLoading(false);
  };

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demo_frame_print"); // đổi bằng preset của bạn

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setAvatar(data.url);
    setProfile((prev) => ({
      ...prev,
      avatar: data.url,
    }));
    setLoading(false);
  };

  // Sửa lại hàm renderEditableField để input có thể edit được
  const renderEditableField = (
    field: string,
    label: string,
    icon: any,
    type: string = "text"
  ) => {
    const isCurrentlyEditing = isEditing === field;
    const currentValue = profile?.[field as keyof typeof profile] || "";

    return (
      <div className="rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-sky-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        
        </div>

        {isCurrentlyEditing ? (
          <div className="flex items-center gap-3 z-10">
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 pl-2 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={() => handleSave(field)}
              className="text-xl text-sky-500 rounded-md p-0 bg-transparent hover:bg-transparent"
              style={{ background: "none" }}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" size="sm" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-gray-700">{currentValue}</p>
            <button
              onClick={() => handleEdit(field, currentValue)}
              className="px-3 py-1 text-sky-500 hover:text-sky-600 cursor-pointer transition-colors"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingPage(true);
      const profile = await getProfile();
      setProfile(profile);
      setAvatar(profile?.avatar);
      setLoadingPage(false);
    };
    fetchProfile();
  }, []);

  if (loadingPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BackButton />
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cài đặt tài khoản
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          {/* Left Column - Avatar & Basic Info */}
          <div className="lg:col-span-1">
            {/* Avatar Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sky-100">
                    {loading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                      </div>
                    ) : (
                      <Image
                        src={avatar || "/defaultAvatar.png"}
                        alt="Avatar"
                        fill
                        className="object-cover rounded-full"
                      />
                    )}
                  </div>
                  <button
                    onClick={() =>
                      document.getElementById("avatarInput")?.click()
                    }
                    className="absolute bottom-1 right-1 w-7 h-7 cursor-pointer bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shadow-lg"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadAvatar}
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {profile?.username }
                </h2>
              </div>
            </div>
          </div>

          {/* Right Column - Editable Fields */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderEditableField("username", "Họ và tên", faUser, "text")}
                  {renderEditableField(
                    "phone",
                    "Số điện thoại",
                    faPhone,
                    "tel"
                  )}
                </div>
                <div className="rounded-xl mt-5 p-6 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-sky-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      {profile?.email || "Không có email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-xl p-6 shadow-sm border flex items-center gap-2 text-sky-500 border-gray-100">
                <FontAwesomeIcon icon={faLock} />
                <button
                  onClick={() => router.push("/profile/changePassword")}
                  className="w-full text-left cursor-pointer px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">Đổi mật khẩu</span>
                </button>
              </div>

              {/* Save Button */}
              <div className="flex justify-between mt-10 gap-4">
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Đăng xuất
                </button>
                <button
                  onClick={() => handleSubmit()}
                  className="px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
                >
                  {submitLoading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
