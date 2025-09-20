"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendar,
  faUser,
  faStar,
  faPhone,
  faEnvelope,
  faSpinner,
  faChevronDown,
  faTrash,
  faEdit,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";   
import BackButton from "@/app/common/BackButton";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/common/Loading";
import RatingForm from "@/app/common/RatingForm";
import DeleteModal from "@/app/Modal/DeleteModal";
import { ITourDetail } from "@/model/tour";
import useData from "@/hooks/useData";
import useBooking from "@/hooks/useBooking";
import useProfile from "@/hooks/useProfile";

const currency = (n: number) =>
  n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
const formatDate = (iso: string) => new Date(iso).toLocaleDateString("vi-VN");

const TourDetailPage = ({
  params
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = use(params);
  const { getTourById } = useData();
  const { getProfile } = useProfile();
  const { deleteReview, updateReview, bookingTour } = useBooking(); 
  const [tour, setTour] = useState<ITourDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isShowCommentList, setIsShowCommentList] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [editHover, setEditHover] = useState(0);
  const router = useRouter();

  // State for booking form
  const [mockBookingData, setMockBookingData] = useState({
    name: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@gmail.com",
    startDate: "2025-09-01",
    endDate: "2025-09-01",
  });

  // State for booking form's start and end date (for controlled input)
  const [bookingStartDate, setBookingStartDate] = useState("");
  const [bookingEndDate, setBookingEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      const tour = await getTourById(id);
      setTour(tour );
      setLoading(false);
      const user = await getProfile();
      // Default start/end date: today
      const today = new Date();
      const isoToday = today.toISOString().slice(0, 10);
      setMockBookingData({
        name: user?.username,
        phone: user?.phone,
        email: user?.email,
        startDate: isoToday,
        endDate: isoToday,
      });
      setBookingStartDate(isoToday);
      setBookingEndDate(isoToday);
    };
    fetchTour();
  }, [id]);

  // Validate dates whenever they change
  useEffect(() => {
    if (bookingStartDate && bookingEndDate) {
      if (bookingStartDate > bookingEndDate) {
        setDateError("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      } else {
        setDateError("");
      }
    }
  }, [bookingStartDate, bookingEndDate]);

  const handleBooking = async () => {
    // Validate before booking
    if (bookingStartDate > bookingEndDate) {
      setDateError("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }
    setBookingLoading(true);
    await bookingTour({tourId: id, startDate: bookingStartDate, endDate: bookingEndDate});
    setBookingLoading(false);
    // Mock booking submission
    setShowBookingForm(false);
    router.push(`/dashboard/tourStore/?reset=true`);
  };

  if (loading) {
    return <Loading text="Đang tải thông tin tour..." />;
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-2">
          <p className="text-gray-600">Không tìm thấy thông tin tour</p>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sky-500 hover:text-sky-600 transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faArrowLeft} />
          Quay lại
        </button>
        </div>
      
      </div>
    );
  }

  const renderStar = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
    ));
  };

  const handleDeleteReview = async(id: number) => {
    await deleteReview({id: id.toString()})
  };

  const handleUpdateReview = async(id: number) => {
  await updateReview({id: id.toString(), comment: editComment, rating: editRating})
    setEditComment("");
    setEditRating(0);
    setEditId(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-gray-900">
        {/* Overlay with tour info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {tour.destination}
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendar} />
                {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUser} />
                {tour.guideName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center gap-4 flex-wrap py-8 ">
        {tour.images && tour.images.length > 0 ? (
          tour.images.map((image, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow border border-gray-100 bg-gray-50"
            >
              <Image
                src={image}
                alt={`${tour.name} - Hình ảnh ${index + 1}`}
                width={400}
                height={300}
                className="object-cover w-[200px] h-[200px]"
                priority={index === 0}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">
            Không có hình ảnh cho tour này
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}

          <div className="lg:col-span-2 space-y-6">
            {/* Tour Description */}
            {/* Tour Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination & Dates */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-sky-600 text-xl"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Điểm đến & Thời gian
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-sky-500"
                    />
                    <span>{tour.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="text-sky-500"
                    />
                    <span>
                      {formatDate(tour.startDate)} -{" "}
                      {formatDate(tour.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guide Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-green-600 text-xl"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Hướng dẫn viên
                  </h3>
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">{tour.guideName}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Mô tả tour
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {tour.description}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 ">Đánh giá</h2>
                <button
                  onClick={() => setIsShowCommentList(!isShowCommentList)}
                  className={`bg-sky-500 transition-transform rounded-full duration-300 ${
                    !isShowCommentList ? "rotate-180" : " rotate-0"
                  } hover:scale-105 text-white py-2 px-2 font-semibold hover:bg-sky-600 transition-colors text-sm`}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>

              <div className="flex flex-col gap-4 w-full">
                {isShowCommentList &&
                  tour.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                          {review.user.name}
                      </h3>
                      {editId === review.id ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            rows={3}
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700">Đánh giá:</span>
                            <div className="flex gap-2 mb-4">
                              {Array.from({ length: 5 }).map((_, index) => {
                                const value = index + 1;
                                return (
                                  <FontAwesomeIcon
                                    key={index}
                                    icon={faStar}
                                    onClick={() => setEditRating(value)}
                                    onMouseEnter={() => setEditHover(value)}
                                    onMouseLeave={() => setEditHover(0)}
                                    className={`cursor-pointer text-2xl transition ${
                                      value <= (editHover || editRating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleUpdateReview(review.id)}
                              className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium border border-green-200"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => setEditId(0)}
                              className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-200"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-yellow-500"
                            />
                            {renderStar(review.rating)}
                          </div>
                          <span className="text-gray-500 text-sm">
                            {review.createdAt}
                          </span>
                          {review.isMyReview && (
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => {
                                  setEditId(review.id);
                                  setEditComment(review.comment);
                                  setEditRating(review.rating);
                                }}
                                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium border border-blue-200"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="text-blue-500"
                                />
                                Sửa
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteId(review.id);
                                  setShowDeleteModal(true);
                                }}
                                className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium border border-red-200"
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="text-red-500"
                                />
                                Xóa
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div>{<RatingForm id={id} />}</div>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="space-y-6 ">
            {/* Price & Booking Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100  top-6">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-sky-600 mb-2">
                 {tour.price ? currency(tour.price) : "Liên hệ sau"}
                </div>
              </div>

              <div className="space-y-4 mb-6 text-black">
                <div className="flex items-center justify-between text-sm text-black">
                  <span className="text-gray-600 ">Thời gian:</span>
                  <span className="font-medium">
                    {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 ">Điểm đến:</span>
                  <span className="font-medium">{tour.destination}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 ">Hướng dẫn viên:</span>
                  <span className="font-medium">{tour.guideName}</span>
                </div>
              </div>

              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-sky-500 text-white py-4 rounded-xl font-semibold hover:bg-sky-600 transition-colors text-lg"
              >
                Đặt tour ngay
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Liên hệ đặt tour
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FontAwesomeIcon icon={faPhone} className="text-sky-500" />
                  <span className="text-gray-700 font-medium">
                    0123 456 789
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sky-500" />
                  <span className="text-gray-700 font-medium">
                    booking@triptrek.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Bạn sẽ đặt tour với thông tin cá nhân{" "}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FontAwesomeIcon icon={faUser} className="text-sky-500" />
                <span className="text-gray-700 font-medium">
                  {mockBookingData.name}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FontAwesomeIcon icon={faPhone} className="text-sky-500" />
                <span className="text-gray-700 font-medium">
                  {mockBookingData.phone}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FontAwesomeIcon icon={faEnvelope} className="text-sky-500" />
                <span className="text-gray-700 font-medium">
                  {mockBookingData.email}
                </span>
              </div>
              {/* Thêm ngày bắt đầu và ngày kết thúc */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium" htmlFor="bookingStartDate">
                  Ngày bắt đầu
                </label>
                <input
                  id="bookingStartDate"
                  type="date"
                  className="border border-gray-300 rounded-lg p-2 text-gray-700"
                  value={bookingStartDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={e => {
                    setBookingStartDate(e.target.value);
                    setMockBookingData(prev => ({
                      ...prev,
                      startDate: e.target.value
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium" htmlFor="bookingEndDate">
                  Ngày kết thúc
                </label>
                <input
                  id="bookingEndDate"
                  type="date"
                  className="border border-gray-300 rounded-lg p-2 text-gray-700"
                  value={bookingEndDate}
                  min={bookingStartDate || new Date().toISOString().slice(0, 10)}
                  onChange={e => {
                    setBookingEndDate(e.target.value);
                    setMockBookingData(prev => ({
                      ...prev,
                      endDate: e.target.value
                    }));
                  }}
                />
              </div>
              {dateError && (
                <div className="text-red-500 text-sm">{dateError}</div>
              )}
              <button
                onClick={() => handleBooking()}
                className={`w-full ${
                  bookingLoading || !!dateError ? "opacity-50 cursor-not-allowed" : ""
                } cursor-pointer flex items-center justify-center gap-2 bg-sky-500 text-white py-4 rounded-xl font-semibold hover:bg-sky-600 transition-colors text-lg `}
                disabled={!!dateError || bookingLoading}
              >
                {bookingLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : (
                  "Đặt ngay"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          handleDeleteSelected={() => {
            handleDeleteReview(deleteId);
            setShowDeleteModal(false);
          }}
          title="Xóa đánh giá"
          description="Bạn có chắc chắn muốn xóa đánh giá này không?"
        />
      )}
    </div>
   
  );
};

export default TourDetailPage;
