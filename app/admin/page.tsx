"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const text = "Welcome back, admin!"
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setMessage((prev) => prev + text[index]); // thêm ký tự kế tiếp
        setIndex(index + 1);
      }, 100); // tốc độ (ms)
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100">
      {/* Welcome Text */}
      <h1 className="inline-block text-4xl font-bold text-sky-600 mb-10">
        {message}
      
      </h1>
    </div>
  );
}