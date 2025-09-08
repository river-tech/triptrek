"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function ExpandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchDestination, setSearchDestination] = useState("");

  type destinationType = {
    id: number;
    name: string;
    img: string;
  };

  const destinationlist: destinationType[] = [
    { id: 1, name: "Hà Nội", img: "/mountain.jpg" },
    { id: 2, name: "Hồ Chí Minh", img: "/mountain.jpg" },
    { id: 3, name: "Đà Lạt", img: "/mountain.jpg" },
    { id: 4, name: "Hạ Long", img: "/mountain.jpg" },
    { id: 5, name: "Huế", img: "/mountain.jpg" },
    { id: 6, name: "Phú Quốc", img: "/mountain.jpg" },
    { id: 7, name: "Sa Pa", img: "/mountain.jpg" },
  ];

  const router = useRouter();

  // Filter danh sách theo search
  const filteredDestinations = destinationlist.filter((destination) =>
    destination.name.toLowerCase().includes(searchDestination.toLowerCase())
  );

  const dropList = () => {
    if (searchDestination === "") return null;

    return (
      <div className="absolute top-18 left-0 w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 animate-slideDown z-50">
        {filteredDestinations.length > 0 ? (
          <div className="max-h-60 overflow-y-auto custom-scroll">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => router.push(`/destination/${destination.id}`)}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-sky-50 transition"
              >
                <img
                  src={destination.img}
                  alt={destination.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="text-gray-700 font-medium">
                  {destination.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-gray-500 text-center">Không tìm thấy kết quả</div>
        )}

        {/* Custom scrollbar style */}
        <style jsx global>{`
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background-color: #38bdf8;
            border-radius: 9999px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.25s ease-in-out;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      className={`flex relative items-center bg-white rounded-full shadow-lg transition-all duration-500 overflow-visible ${
        isOpen ? "px-4 py-2 w-[500px]" : "w-12 h-12 justify-center"
      }`}
    >
      {/* Icon khi đóng */}
      {!isOpen && (
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-sky-500 mx-auto"
        />
      )}

      {/* Khi mở */}
      {isOpen && (
        <>
          <span className="font-semibold text-gray-700 whitespace-nowrap mr-3">
            Nơi đến?
          </span>

          <div className="w-px h-6 bg-gray-300 mr-3"></div>

          <input
            type="text"
            placeholder="Tìm nơi bạn muốn trải nghiệm..."
            className="flex-1 border-none focus:outline-none text-gray-600 bg-transparent"
            autoFocus
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
            
          />

          <button className="p-2 bg-sky-500 hover:bg-sky-600 rounded-full text-white ml-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          {dropList()}
        </>
      )}
    </div>
  );
}