"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function ExpandSearch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      className={`flex items-center bg-white rounded-full shadow-lg transition-all duration-500 overflow-hidden ${
        isOpen ? "px-4 py-2 w-[500px]" : "w-12 h-12 justify-center"
      }`}
    >
      {/* Icon ở giữa khi đóng */}
      {!isOpen && (
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-sky-500 mx-auto"
        />
      )}

      {/* Khi mở thì hiện label + input + button */}
      {isOpen && (
        <>
          <span className="font-semibold text-gray-700 whitespace-nowrap mr-3">
            Nơi đến?
          </span>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mr-3"></div>

          <input
            type="text"
            placeholder="Tìm nơi bạn muốn trải nghiệm..."
            className="flex-1 border-none focus:outline-none text-gray-600 bg-transparent"
            autoFocus
          />
          <button className="p-2 bg-sky-500 hover:bg-sky-600 rounded-full text-white ml-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          
        </>
      )}
    </div>
  );
}