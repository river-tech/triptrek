"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import NewPassword from "./NewPasword";
import BackButton from "@/app/common/BackButton";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const OtpCheckPage = () => {
  const [values, setValues] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [email, setEmail] = useState("");
  const [emailOTP, setEmailOTP] = useState("");
  const [error, setError] = useState("");
 
  useEffect(() => {
    inputsRef.current[0]?.focus();
    setEmailOTP(localStorage.getItem("email") || "");
  }, []);

  // bộ đếm ngược thời gian
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const code = useMemo(() => values.join(""), [values]);
  const isComplete =
    code.length === OTP_LENGTH && values.every((v) => v !== "");

  const handleChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...values];
    next[index] = val;
    setValues(next);
    if (val && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
      inputsRef.current[index + 1]?.focus();
  };

  const resend = () => {
    setValues(Array(OTP_LENGTH).fill(""));
    setSeconds(RESEND_SECONDS);
    inputsRef.current[0]?.focus();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    setSubmitting(true);
    setSuccess(null);
    console.log(code);
    // Mock API verify
    await new Promise((r) => setTimeout(r, 900));
    // For demo, treat any 6-digit as success
    setSuccess(true);
    setSubmitting(false);
  };
  const handleEmail = () => {
    setError("");
    if(!email) return;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Email không hợp lệ");
        return;
    }
    setEmailOTP(email);

    // TODO: call api to verify email
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <BackButton />
        {
            !emailOTP && (
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
                        className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg"
                    >
                        Xác thực OTP
                    </button>
                </div>
            )
        }
      {!success && emailOTP && (
        <div className="max-w-md mx-auto px-6 w-full flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 mb-3">
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Xác thực OTP</h1>
            <p className="text-gray-600 mt-1">
              Vui lòng nhập mã gồm 6 chữ số đã gửi đến điện thoại/email của bạn.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="bg-white w-fit rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex justify-between gap-2 sm:gap-3 mb-6">
              {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    if (el) inputsRef.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={values[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-black text-2xl font-semibold rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Mã gồm 6 chữ số</span>
              {seconds > 0 ? (
                <span>Gửi lại sau {seconds}s</span>
              ) : (
                <button
                  type="button"
                  onClick={resend}
                  className="text-sky-600 hover:text-sky-700"
                >
                  Gửi lại mã
                </button>
              )}
            </div>

            {success && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg mb-4">
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Xác thực thành công!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!isComplete || submitting}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
                !isComplete || submitting
                  ? "bg-sky-300 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-600"
              }`}
            >
              {submitting ? "Đang xác thực..." : "Xác nhận"}
            </button>
          </form>
        </div>
      )}
      {success && emailOTP && <NewPassword />}
    </div>
  );
};

export default OtpCheckPage;
