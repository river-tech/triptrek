"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCalendar,
  faMapMarkerAlt,
  faCheck,
  faTimes,
  faTrash,
  faTrashAlt,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import BackButton from "@/app/common/BackButton";
import { BookingStatus } from "@/app/enum/BookingStatus";

export type Booking = {
  id: string;
  tourId: string;
  tourName: string;
  tourImage: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  tourStartDate: string;
  tourEndDate: string;
  destination: string;
  price: number;
  status: BookingStatus;
};

const mockBookings: Booking[] = [
  {
    id: "1",
    tourId: "1",
    tourName: "Khám phá Đà Lạt 3 ngày 2 đêm",
    tourImage: "/mountain.jpg",
    customerName: "Nguyễn Văn A",
    customerPhone: "0123456789",
    customerEmail: "nguyenvana@gmail.com",

    tourStartDate: "2024-02-01",
    tourEndDate: "2024-02-03",
    destination: "Đà Lạt",
    price: 2500000,
    status: BookingStatus.PENDING,
  },
  {
    id: "2",
    tourId: "2",
    tourName: "Du lịch Hạ Long 2 ngày 1 đêm",
    tourImage: "/mountain.jpg",
    customerName: "Trần Thị B",
    customerPhone: "0987654321",
    customerEmail: "tranthib@gmail.com",

    tourStartDate: "2024-02-05",
    tourEndDate: "2024-02-06",
    destination: "Hạ Long",
    price: 1800000,
    status: BookingStatus.SUCCESS,
  },
  {
    id: "3",
    tourId: "3",
    tourName: "Tham quan Hội An 1 ngày",
    tourImage: "/mountain.jpg",
    customerName: "Lê Văn C",
    customerPhone: "0369852147",
    customerEmail: "levanc@gmail.com",

    tourStartDate: "2024-02-10",
    tourEndDate: "2024-02-10",
    destination: "Hội An",
    price: 800000,
    status: BookingStatus.PENDING,
  },
  {
    id: "4",
    tourId: "4",
    tourName: "Nghỉ dưỡng Phú Quốc 4 ngày 3 đêm",
    tourImage: "/mountain.jpg",
    customerName: "Phạm Thị D",
    customerPhone: "0741258963",
    customerEmail: "phamthid@gmail.com",

    tourStartDate: "2024-02-15",
    tourEndDate: "2024-02-18",
    destination: "Phú Quốc",
    price: 4500000,
    status: BookingStatus.DENY,
  },
  {
    id: "5",
    tourId: "5",
    tourName: "Khám phá Sapa 3 ngày 2 đêm",
    tourImage: "/mountain.jpg",
    customerName: "Hoàng Văn E",
    customerPhone: "0852369741",
    customerEmail: "hoangvane@gmail.com",

    tourStartDate: "2024-02-20",
    tourEndDate: "2024-02-22",
    destination: "Sapa",
    price: 2200000,
    status: BookingStatus.SUCCESS,
  },
];

const currency = (n: number) =>
  n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
const formatDate = (iso: string) => new Date(iso).toLocaleDateString("vi-VN");

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState<
    "all" | BookingStatus.PENDING | BookingStatus.SUCCESS | BookingStatus.DENY
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<
    "single" | "multiple" | null
  >(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesSearch = booking.tourName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case BookingStatus.SUCCESS:
        return "bg-green-100 text-green-800";
      case BookingStatus.DENY:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return "Chờ duyệt";
      case BookingStatus.SUCCESS:
        return "Đã duyệt";
      case BookingStatus.DENY:
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const handleApprove = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, status: BookingStatus.SUCCESS }
          : booking
      )
    );
  };

  const handleDeny = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: BookingStatus.DENY } : booking
      )
    );
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteTarget("single");
    setShowDeleteModal(true);
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map((booking) => booking.id));
    }
  };

  const handleSelectBooking = (id: string) => {
    setSelectedBookings((prev) =>
      prev.includes(id)
        ? prev.filter((bookingId) => bookingId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setDeleteTarget("multiple");
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget === "single" && deleteId) {
      setBookings((prev) => prev.filter((booking) => booking.id !== deleteId));
    } else if (deleteTarget === "multiple") {
      setBookings((prev) =>
        prev.filter((booking) => !selectedBookings.includes(booking.id))
      );
      setSelectedBookings([]);
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
    setDeleteId(null);
  };

  const tabs = [
    { key: "all", label: "Tất cả", count: bookings.length },
    {
      key: BookingStatus.PENDING,
      label: "Chờ duyệt",
      count: bookings.filter((b) => b.status === BookingStatus.PENDING).length,
    },
    {
      key: BookingStatus.SUCCESS,
      label: "Đã duyệt",
      count: bookings.filter((b) => b.status === BookingStatus.SUCCESS).length,
    },
    {
      key: BookingStatus.DENY,
      label: "Từ chối",
      count: bookings.filter((b) => b.status === BookingStatus.DENY).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Quản lý đặt tour
          </h1>
          <p className="text-gray-600">
            Xem và quản lý các đặt tour của khách hàng
          </p>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div
              className="relative text-black flex-1 max-w-md"
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên khách, tour, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Bulk Actions */}
            {selectedBookings.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Đã chọn {selectedBookings.length} booking
                </span>
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Xóa đã chọn
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-sky-600 border-b-2 border-sky-600 bg-sky-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {/* Select All */}
          {filteredBookings.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    selectedBookings.length === filteredBookings.length &&
                    filteredBookings.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                />
                <span className="font-medium text-gray-700">
                  Chọn tất cả ({filteredBookings.length})
                </span>
              </label>
            </div>
          )}

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <FontAwesomeIcon
                icon={faFilter}
                className="text-4xl text-gray-400 mb-4"
              />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Không có booking nào
              </h3>
              <p className="text-gray-600">
                Không tìm thấy booking nào phù hợp với bộ lọc hiện tại
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.id)}
                    onChange={() => handleSelectBooking(booking.id)}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 mt-1"
                  />

                  {/* Tour Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={booking.tourImage}
                      alt={booking.tourName}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {booking.tourName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {booking.destination}
                          </span>
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCalendar} />
                            {formatDate(booking.tourStartDate)} -{" "}
                            {formatDate(booking.tourEndDate)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-sky-600 mb-1">
                          {currency(booking.price)}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-sky-500"
                        />
                        <span className="text-gray-700">
                          {booking.customerName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-sky-500"
                        />
                        <span className="text-gray-700">
                          {booking.customerPhone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-sky-500"
                        />
                        <span className="text-gray-700">
                          {booking.customerEmail}
                        </span>
                      </div>
                    </div>

                    {/* Booking Date */}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {booking.status === BookingStatus.PENDING && (
                        <>
                          <button
                            onClick={() => handleApprove(booking.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            <FontAwesomeIcon icon={faCheck} />
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleDeny(booking.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                            Từ chối
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Xác nhận xóa
            </h3>
            <p className="text-gray-600 mb-6">
              {deleteTarget === "single"
                ? "Bạn có chắc chắn muốn xóa booking này không?"
                : `Bạn có chắc chắn muốn xóa ${selectedBookings.length} booking đã chọn không?`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
