"use client";
import { useState, useEffect } from "react";
import BackButton from "@/app/common/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRightPassword, setIsRightPassword] = useState(false);
  const [isRightConfirmPassword, setIsRightConfirmPassword] = useState(false);
  const oldpass = "123456";

  // Rule kiểm tra password
  const rules = {
    minLength: newPassword.length >= 12,
    upperCase: /[A-Z]/.test(newPassword),
    lowerCase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  useEffect(() => {
    if (oldPassword === oldpass) {
      setIsRightPassword(true);
    } else {
      setIsRightPassword(false);
    }
    if (newPassword === confirmPassword) {
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
          Change Password
        </h2>
        <form className="space-y-4">
          {/* Old password */}
          <div>
            <label className="block text-sm mb-1 text-gray-800">
              Old Password
            </label>
            <div className="flex items-center gap-2 relative">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`w-full px-4 py-2 border text-black rounded-lg  ${
                  oldPassword ? "border-green-500" : "border-gray-300"
                } `}
                placeholder="Enter old password"
              />
              {
                isRightPassword && (
                 <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 absolute right-2 top-1/2 -translate-y-1/2" />
                )
              }
            </div>
          </div>
          {/* New password */}
          <div>
            {isRightPassword && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm mb-1 text-gray-800">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full px-4 py-2 border text-black rounded-lg `}
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-black text-sm mb-1">
                    Confirm New Password
                  </label>
                  <div className="flex items-center gap-2 relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-2 border text-black rounded-lg relative ${
                      isRightConfirmPassword ? "border-green-500" : "border-gray-300"
                    }`}
                    placeholder="Confirm new password"
                  />
                  {
                    isRightConfirmPassword && (
                      <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 absolute right-2 top-1/2 -translate-y-1/2" />
                    )
                  }
                  </div>
                 
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sky-500 mt-5 hover:bg-sky-600 text-white py-2 rounded-lg font-medium transition"
          >
            Change Password
          </button>
          <Link href="/profile/otpCheck" className="text-sm text-sky-500 hover:underline text-center mt-3 cursor-pointer">
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
}
