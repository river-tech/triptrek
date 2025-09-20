"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/Toast/ToastContext";
import BackButton from "@/app/common/BackButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { showError } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
    await login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <BackButton/>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Left side */}
        <div className="flex flex-col items-center justify-center p-10 bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Khám phá thế giới với
          </h2>
          <h1 className="text-5xl font-extrabold text-sky-500">TripTrek</h1>
          <Image
            src="/image1.png" // file nằm trong /public
            alt="Traveler"
            className="w-64 mt-10"
            width={256}
            height={256}
            priority
          />
        </div>

        {/* Right side (Form) */}
        <div
          className="p-10 flex flex-col justify-center animate-fade-in"
          style={{
            animation: "fadeIn 0.8s ease"
          }}
        >
          <h2 className="text-2xl font-bold text-sky-500 mb-6">Đăng nhập</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Nhập email"
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Vui lòng nhập email hợp lệ"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Mật khẩu</label>
              <input
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="flex justify-between text-sm">
              <Link
                href="/profile/otpCheck"
                className="text-sky-500 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Chưa có tài khoản?{" "}
            <Link href="/authen/signUp" className="text-sky-500 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease;
        }
      `}</style>
    </div>
  );
}
