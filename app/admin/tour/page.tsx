"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSuitcaseRolling,
  faCalendarDay,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface Tour {
  id: number;
  name: string;
  price: number;
  destination: string;
  create_by: string;
  image: string;
  created_at: string;

}

export default function AdminTourPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const mockTours: Tour[] = [
    {
      id: 1,
      name: "Khám phá vịnh Hạ Long 3N2Đ",
      price: 2500000,
      destination: "Quảng Ninh, Việt Nam",
      create_by: "Nguyễn Văn A",
      image: "/images/halong.jpg",
      created_at: "2025-08-01",
    },
    {
      id: 2,
      name: "Trải nghiệm Đà Nẵng - Hội An",
      price: 3200000,
      destination: "Đà Nẵng & Quảng Nam",
      create_by: "Trần Thị B",
      image: "/images/danang-hoian.jpg",
      created_at: "2025-08-10",
    },
    {
      id: 3,
      name: "Sapa mùa lúa chín",
      price: 1800000,
      destination: "Lào Cai, Việt Nam",
      create_by: "Lê Văn C",
      image: "/images/sapa.jpg",
      created_at: "2025-08-15",
    },
    {
      id: 4,
      name: "Khám phá Phú Quốc 4N3Đ",
      price: 4500000,
      destination: "Kiên Giang, Việt Nam",
      create_by: "Phạm Thị D",
      image: "/images/phuquoc.jpg",
      created_at: "2025-08-20",
    },
    {
      id: 5,
      name: "Du lịch Huế - kinh thành cổ",
      price: 2100000,
      destination: "Thừa Thiên Huế, Việt Nam",
      create_by: "Nguyễn Văn E",
      image: "/images/hue.jpg",
      created_at: "2025-08-25",
    },
  ];
  // Mock data
  useEffect(() => {
    
    setTimeout(() => {
      setTours(mockTours);
      setLoading(false);
    }, 1000);
  }, []);

  // Stat Card
  const statCard = (
    title: string,
    value: string,
    icon: any,
    color: string
  ) => {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center gap-4 hover:shadow-lg transition">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}>
          <FontAwesomeIcon icon={icon} className="text-white text-xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Title */}
      <div className="mb-10 mt-20 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Quản lý Tour
        </h1>
        <div className="w-24 h-1 bg-sky-500 mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-200 mt-3">
          Quản lý và theo dõi các tour du lịch trong hệ thống
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCard("Tổng số tour", tours.length.toString(), faSuitcaseRolling, "bg-sky-500")}
        {statCard(
          "Tour đã tạo hôm nay",
          tours
            .filter(
              (tour) =>
                new Date(tour.created_at).toDateString() ===
                new Date().toDateString()
            )
            .length.toString(),
          faCalendarDay,
          "bg-green-500"
        )}
        {statCard(
          "Tour đã gỡ bỏ hôm nay",
          tours
          
            .length.toString(),
          faTrash,
          "bg-red-500"
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-lg w-fulls mx-auto mb-8">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <input
          type="text"
          placeholder="Tìm kiếm tour, địa điểm, hướng dẫn viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-bold text-white">Tour đã tạo ngày hôm nay</h2>
</div>

<div className="max-h-96 overflow-y-auto space-y-4 p-4 bg-white shadow-lg rounded-xl border border-gray-200">
  {tours.map((tour) => (
    <div
      key={tour.id}
      className="flex items-center gap-4 p-4 border-b last:border-none hover:bg-sky-50 transition rounded-lg"
    >
      {/* Thumbnail */}
      <img
        src={tour.image}
        alt={tour.name}
        className="w-20 h-16 rounded-lg object-cover shadow-sm border"
      />

      {/* Info */}
      <div className="flex-1">
        <h1 className="font-semibold text-gray-800 text-base">{tour.name}</h1>
        <p className="text-sm text-gray-500">{tour.destination}</p>
        <p className="text-sm text-gray-500">👤 {tour.create_by}</p>
      </div>

      {/* Date */}
      <div className="text-right">
        <p className="text-xs text-gray-400">{tour.created_at}</p>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}