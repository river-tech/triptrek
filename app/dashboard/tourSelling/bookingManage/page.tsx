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
import { EBookingStatus } from "@/app/enum/BookingStatus";
import DeleteModal from "@/app/Modal/DeleteModal";
import useProfile from "@/hooks/useProfile";
import { ISellerOrders } from "@/model/booking";



const currency = (n: number) =>
  n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
const formatDate = (iso: string) => new Date(iso).toLocaleDateString("vi-VN");

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState<ISellerOrders[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | EBookingStatus.PENDING | EBookingStatus.SUCCESS | EBookingStatus.DENY
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<
    "single" | "multiple" | null
  >(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {changeBookingStatus, showSellerOrders, deleteSellerOrder} = useProfile();
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesSearch = booking.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const fetchBookings = async () => {
    const res = await showSellerOrders()
    setBookings(res as unknown as ISellerOrders[])
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const getStatusColor = (status: EBookingStatus) => {
    switch (status) {
      case EBookingStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case EBookingStatus.SUCCESS:
        return "bg-green-100 text-green-800";
      case EBookingStatus.DENY:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: EBookingStatus) => {
    switch (status) {
      case EBookingStatus.PENDING:
        return "Chờ duyệt";
      case EBookingStatus.SUCCESS:
        return "Đã duyệt";
      case EBookingStatus.DENY:
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const handleApprove = async (id: string) => {
    const res = await changeBookingStatus({id, status: EBookingStatus.SUCCESS});
    if(res){
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === Number(id) ? { ...booking, status: EBookingStatus.SUCCESS } : booking
        )
      );
    }
    
  };

  const handleDeny = async (id: string) => {
  const res = await changeBookingStatus({id, status: EBookingStatus.DENY});
    if(res){
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === Number(id) ? { ...booking, status: EBookingStatus.DENY } : booking
        )
      );
    }
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
      setSelectedBookings(filteredBookings.map((booking) => booking.id.toString()));
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

  const confirmDelete =async() => {
    if (deleteTarget === "single" && deleteId) {
      await deleteSellerOrder({bookingIds: [deleteId]});
      setBookings((prev) => prev.filter((booking) => booking.id !== Number(deleteId)));
    } else if (deleteTarget === "multiple") {
      await deleteSellerOrder({bookingIds: selectedBookings});
      setBookings((prev) =>
        prev.filter((booking) => !selectedBookings.includes(booking.id.toString()))
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
      key: EBookingStatus.PENDING,
      label: "Chờ duyệt",
      count: bookings.filter((b) => b.status === EBookingStatus.PENDING).length,
    },
    {
      key: EBookingStatus.SUCCESS,
      label: "Đã duyệt",
      count: bookings.filter((b) => b.status === EBookingStatus.SUCCESS).length,
    },
    {
      key: EBookingStatus.DENY,
      label: "Từ chối",
      count: bookings.filter((b) => b.status === EBookingStatus.DENY).length,
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
                    checked={selectedBookings.includes(booking.id.toString())}
                    onChange={() => handleSelectBooking(booking.id.toString())}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 mt-1"
                  />

                  {/* Tour Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={booking.images}
                      alt={booking.name}
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
                          {booking.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {booking.destination}
                          </span>
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCalendar} />
                            {formatDate(booking.startDate)} -{" "}
                            {formatDate(booking.endDate)}
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
                          {booking.userName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-sky-500"
                        />
                        <span className="text-gray-700">
                          {booking.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-sky-500"
                        />
                        <span className="text-gray-700">
                          {booking.email}
                        </span>
                      </div>
                    </div>

                    {/* Booking Date */}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {booking.status === EBookingStatus.PENDING && (
                        <>
                          <button
                            onClick={() => handleApprove(booking.id.toString())}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            <FontAwesomeIcon icon={faCheck} />
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleDeny(booking.id.toString())}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                            Từ chối
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(booking.id.toString())}
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
        <DeleteModal loading={loading} setShowDeleteModal={setShowDeleteModal} handleDeleteSelected={confirmDelete} title="Xác nhận xoá booking" description={deleteTarget === "single" ? "Bạn có chắc chắn muốn xóa booking này không?" : `Bạn có chắc chắn muốn xóa ${selectedBookings.length} booking đã chọn không?`} />
      )}
    </div>
  );
}
