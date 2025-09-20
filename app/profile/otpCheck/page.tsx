"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import NewPassword from "./NewPasword";
import BackButton from "@/app/common/BackButton";
import useProfile from "@/hooks/useProfile";


const RESEND_SECONDS = 60;

const OtpCheckPage = () => {
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { requestOTP } = useProfile();
  const [sendSuccess, setSendSuccess] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
 

  // bộ đếm ngược thời gian
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const handleEmail = async() => {
    setError("");
    if(!email) return;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Email không hợp lệ");
        return;
    }
    setLoadingEmail(true);
    const res = await requestOTP({email});
    setLoadingEmail(false);
    if(res){
      setSendSuccess(true);
      return
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <BackButton />
        {
            !sendSuccess ? (
                <div className="max-w-md mx-auto px-6 w-full flex flex-col items-center justify-center gap-4">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Vui lòng nhập email để xác thực OTP</h1>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border text-black rounded-lg"
                        placeholder="Nhập email"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="button"
                        onClick={() => handleEmail()}
                        className={`w-full px-4 py-2 ${email && "cursor-pointer"} bg-sky-500 text-white rounded-lg ${loadingEmail ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={loadingEmail}
                    >
                       {
                        loadingEmail ? (
                          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        ) : (
                          "Xác thực OTP"
                        ) 
                       }
                    </button>
                </div>
            ):(
             <NewPassword email={email} />
            )
        }
     
   
    </div>
  );
};

export default OtpCheckPage;
