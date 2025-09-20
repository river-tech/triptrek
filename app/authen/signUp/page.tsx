"use client";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/app/common/BackButton";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const res = await register(email,username, password);
    if(res){
      router.push("/authen/signIn");
    }
    else{
      setError("Đăng ký thất bại");
    }
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
            src="/image1.png" // ảnh trong /public
            alt="Traveler"
            className="w-64 mt-10"
            width={256}
            height={256}
            priority
          />
        </div>

        {/* Right side (Form) */}
        <div className="p-10 flex flex-col justify-center animate-fade-in"
          style={{
            animation: "fadeIn 0.8s ease"
          }}
        >
          <h2 className="text-2xl font-bold text-sky-500 mb-6">Đăng ký</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="mt-1 text-xs text-sky-500 hover:underline"
              >
                {isShowPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
            >
              Đăng ký
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/authen/signIn" className="text-sky-500 hover:underline">
              Đăng nhập
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