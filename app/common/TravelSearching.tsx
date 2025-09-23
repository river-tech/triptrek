"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import useData from "@/hooks/useData";
import { IFamousDestination } from "@/model/destination";
import { ITourPopular } from "@/model/tour";


export type PriceOption = "any" | "UNDER_1M" | "FROM_1M_TO_3M" | "ABOVE_3M";

export default function TravelSearching({handleResult}: {handleResult: (tours: ITourPopular[]) => void}) {
  type destinationType = {
    id: number;
    name: string;
  };

  
  const [destinations, setDestinations] = useState("");
  const [destinationId, setDestinationId] = useState<number>(0);
  const [price, setPrice] = useState<PriceOption>("any");
  const { getAllDestinations, searchTour } = useData();
  const [destinationlist, setDestinationlist] = useState<destinationType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
 

  useEffect(() => {
    const fetchDestinations = async () => {
      const res: IFamousDestination[] = await getAllDestinations();
      setDestinationlist(res || []);
    };
    fetchDestinations();
  }, []);

  const priceLabelMap: Record<PriceOption, string> = {
    any: "Giá",
    "UNDER_1M": "Dưới 1 triệu",
    "FROM_1M_TO_3M": "1 - 3 triệu",
    "ABOVE_3M": "Trên 3 triệu",
  };

  const filteredDestinations = destinationlist.filter((destination) =>
    destination.name.toLowerCase().includes(destinations.toLowerCase())
  );

  // Dropdown chỉ hiện khi showDropdown=true và có text trong input
  const dropList = () => {
    if (!showDropdown || destinations === "") return null;
    if (filteredDestinations.length === 0)
      return (
        <div
          className="absolute left-0 w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 animate-slideDown z-50"
          style={{ top: "60px" }}
        >
          <div className="p-4 text-gray-500 text-center">Không tìm thấy kết quả</div>
        </div>
      );
    return (
      <div
        className="absolute left-0 w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 animate-slideDown z-50"
        style={{ top: "60px" }}
      >
        {filteredDestinations.map((destination: destinationType) => (
          <div
            key={destination.id}
            onClick={() => {
              setDestinations(destination.name);
              setDestinationId(destination.id);
              setShowDropdown(false);
            }}
            className="flex text-gray-700 font-medium items-center gap-3 p-3 cursor-pointer hover:bg-sky-50 transition"
          >
            {destination.name}
          </div>
        ))}
      </div>
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinations(e.target.value);
    setDestinationId(0);
    setShowDropdown(true);
  };

  const handleSearch = async() => {
    const res = await searchTour({destination: destinationId.toString(), price: price});
    console.log(res);
    handleResult(res || []);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-white/40 backdrop-blur-2xl rounded-[36px] shadow-2xl border border-white/40 px-4 sm:px-10 py-8 sm:py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Điểm đến */}
            <div className="flex-1 w-full">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 text-lg">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  value={destinations}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (destinations !== "") setShowDropdown(true);
                  }}
                  className="w-full h-14 pl-12 pr-4 rounded-full bg-white/90 shadow-lg border border-gray-200 focus:ring-2 focus:ring-sky-300 focus:border-sky-400 outline-none text-gray-800 placeholder:text-gray-400 text-base transition-all duration-200"
                />
                {dropList()}
                {/* Custom scrollbar and animation for dropdown */}
                <style jsx global>{`
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
            </div>
            {/* Giá */}
            <div className="w-full sm:w-56">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 text-lg">
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                </span>
                <select
                  aria-label="Chọn mức giá"
                  value={price}
                  onChange={(e) => setPrice(e.target.value as PriceOption)}
                  className="w-full h-14 pl-12 pr-10 rounded-full bg-white/90 shadow-lg border border-gray-200 focus:ring-2 focus:ring-sky-300 focus:border-sky-400 outline-none text-gray-800 text-base transition-all duration-200 appearance-none"
                >
                  {Object.keys(priceLabelMap).map((key) => (
                    <option key={key} value={key}>
                      {priceLabelMap[key as PriceOption]}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"
                />
              </div>
            </div>
            {/* Nút tìm kiếm */}
            <div className="w-full sm:w-auto flex justify-end">
              <button
                onClick={() => handleSearch()}
                className="h-14 px-10 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 active:from-sky-700 active:to-cyan-600 text-white font-bold shadow-lg text-lg flex items-center gap-2 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-lg" />
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
