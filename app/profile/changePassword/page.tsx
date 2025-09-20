"use client";
import { useState, useEffect } from "react";
import BackButton from "@/app/common/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useToast } from "@/app/Toast/ToastContext";
import useProfile from "@/hooks/useProfile";
export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRightConfirmPassword, setIsRightConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showError, showSuccess } = useToast();
  const { changePassword } = useProfile();

  // Rule kiểm tra password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRightConfirmPassword) {
      showError("Mật khẩu mới và mật khẩu mới nhập lại không khớp");
      return;
    }
    setLoading(true);
    try {
      await changePassword({ oldPassword, newPassword });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newPassword === confirmPassword && newPassword.length !== 0) {
      setIsRightConfirmPassword(true);
    } else {
      setIsRightConfirmPassword(false);
    }
  }, [oldPassword, newPassword, confirmPassword]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <BackButton />
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Thay đổi mật khẩu
        </h2>
        <form className="space-y-4">
          {/* Old password */}
          <div>
            <label className="block text-sm mb-1 text-gray-800">
              Mật khẩu cũ
            </label>
            <div className="flex items-center gap-2 relative">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`w-full px-4 py-2 border text-black rounded-lg  ${
                  oldPassword ? "border-green-500" : "border-gray-300"
                } `}
                placeholder="Nhập mật khẩu cũ"
              />
            </div>
          </div>
          {/* New password */}
          <div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm mb-1 text-gray-800">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-4 py-2 border text-black rounded-lg `}
                  placeholder="Nhập mật khẩu mới"
                />
              </div>

              <div>
                <label className="block text-black text-sm mb-1">
                  Nhập lại mật khẩu mới
                </label>
                <div className="flex items-center gap-2 relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-2 border text-black rounded-lg relative ${
                      isRightConfirmPassword ? "border-green-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  {isRightConfirmPassword && (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className={`w-full bg-sky-500 mt-5 hover:bg-sky-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            type="submit"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            Thay đổi mật khẩu
          </button>
          <Link
            href="/profile/otpCheck"
            className="text-sm text-sky-500 hover:underline text-center mt-3 cursor-pointer"
          >
            Quên mật khẩu?
          </Link>
        </form>
      </div>
    </div>
  );
}
