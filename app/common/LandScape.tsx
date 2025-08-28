"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandSearch from "./SearchBar";
import { useEffect } from "react";


export default function LandScape() {

  return (
    <section
    id="home"
      className="relative h-[600px] flex items-center pt-10 justify-center text-white"
      style={{
        backgroundImage: "url('/mountain.jpg')", // ảnh trong /public
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay tối mờ */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Nội dung */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Khám Phá Thế Giới <br /> Cùng Chúng Tôi
        </h1>

        <div className="w-20 h-1 bg-white mx-auto mb-6"></div>

        <p className="text-lg md:text-xl font-medium mb-8">
          Nơi Giấc Mơ Du Lịch Bắt Đầu
        </p>

        {/* Search bar */}
        <ExpandSearch/>
      </div>
    </section>
  );
}