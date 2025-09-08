"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChevronDown, faMagnifyingGlass, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

export type PriceOption = "any" | "<1m" | "1-3m" | ">3m";

export default function TravelSearching({}) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState<PriceOption>("any");

  const priceLabelMap: Record<PriceOption, string> = {
    any: "Giá",
    "<1m": "Dưới 1 triệu",
    "1-3m": "1 - 3 triệu",
    ">3m": "Trên 3 triệu",
  };
  const filterPriceList = () => {
    return (
      <div className="absolute top-18 left-0 w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 animate-slideDown z-50">
        {Object.keys(priceLabelMap).map((key) => (
          <div key={key}>{priceLabelMap[key as PriceOption]}</div>
        ))}
      </div>
    )
  }

  const handleSearch = () => {
    // Tạm thời chỉ log ra. Có thể nâng cấp để chuyển trang / gọi API.
    // eslint-disable-next-line no-console
    console.log({ destination, startDate, endDate, price });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-md rounded-[36px] shadow-xl border border-white/30 px-6 sm:px-8 py-6 sm:py-8">
        <div className="flex flex-col gap-4">
          {/* Hàng trên: ô nhập điểm đến + nút tìm */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-12 sm:h-14 bg-white rounded-full shadow-md px-5 flex items-center gap-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
              <input
                type="text"
                placeholder="Nhập điểm đến"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="whitespace-nowrap h-12 sm:h-14 px-8 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold shadow-md transition-colors"
            >
              Tìm
            </button>
          </div>

          {/* Hàng dưới: ngày đi - ngày về - giá */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Ngày đi + Ngày về */}
            <div className="col-span-1 sm:col-span-2 bg-white rounded-2xl shadow-md px-5 py-4 flex items-center gap-6">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-sky-500" />
                </div>
                  {/* <label className="block text-xs text-gray-500 mb-1">Ngày đi</label> */}
                <div className="flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700"
                  />
                </div>
              </div>

              <div className="h-10 w-px bg-gray-200 hidden sm:block" />

              <div className="flex items-center gap-3 flex-1">
                <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-sky-500" />
                </div>
                <div className="flex-1">
                  {/* <label className="block text-xs text-gray-500 mb-1">Ngày về</label> */}
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Giá */}
            <div className="bg-white rounded-2xl shadow-md px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-sky-500" />
                </div>
                <div className="min-w-0">
                  <div className="relative">
                    <select
                      aria-label="Chọn mức giá"
                      value={price}
                      onChange={(e) => setPrice(e.target.value as PriceOption)}
                      className="appearance-none pr-9 pl-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-gray-700 transition-colors"
                    >
                      {Object.keys(priceLabelMap).map((key) => (
                        <option key={key} value={key}>
                          {priceLabelMap[key as PriceOption]}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
