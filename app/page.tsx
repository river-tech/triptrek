
'use client'
import LandScape from "./common/LandScape";
import About from "./common/About";
import Food from "./common/Food";
import Travel from "./common/Travel";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useData from "@/hooks/useData";

export default function Home() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { getAllDestinations } = useData();
 
  useEffect(() => {
    console.log(API_URL);
    // Không cho quay lui: luôn đẩy về trang chủ nếu user cố quay lại
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, "", window.location.href);
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  return (
    <>
      <LandScape />
      <About />
      <Travel />
      <Food />
    </>
  );
}
