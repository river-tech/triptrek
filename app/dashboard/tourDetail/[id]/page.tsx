'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendar, faUser, faTag, faStar, faHeart, faShare, faPhone, faEnvelope, faClock, faUsers, faCheckCircle, faTimes, faArrowRight, faSpinner, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BackButton from '@/app/common/BackButton'
import { useRouter } from 'next/navigation'
import { IShowReview } from '@/model/review'
import Loading from '@/app/common/Loading'
import RatingForm from '@/app/common/RatingForm'


export type TourDetail = {
  id: number
  name: string
  description: string
  price: number
  start_date: string
  end_date: string
  destination_id: number
  destination_name: string
  guide_name: string
  image: string[]
}

const mockTourDetail: TourDetail = {
  id: 1,
  name: 'Khám phá Đà Nẵng 5N4Đ – Biển & Ẩm thực',
  description: 'Tour khám phá Đà Nẵng với những điểm đến nổi tiếng như Bãi biển Mỹ Khê, Bán đảo Sơn Trà, và ẩm thực đặc sắc của miền Trung. Trải nghiệm văn hóa, lịch sử và thiên nhiên tuyệt đẹp của thành phố đáng sống nhất Việt Nam.',
  price: 3590000,
  start_date: '2025-09-01',
  end_date: '2025-09-05',
  destination_id: 1,
  destination_name: 'Đà Nẵng, Việt Nam',
  guide_name: 'Nguyễn Văn Hướng',
  image: ['/About1.jpg', '/About2.jpg', '/About3.jpg', '/image1.png']
}

const mockBookingData = {
  name: 'Nguyễn Văn A',
  phone: '0123456789',
  email: 'nguyenvana@gmail.com',
  date: '2025-09-01',
  time: '10:00',
}
const currency = (n: number) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('vi-VN')

const mockReviews: IShowReview[] = [
  {
    id: 1,
    user_id: 101,
    user_name: "Nguyễn Văn A",
    is_my_review: false,
    comment: "Tour Hạ Long tuyệt vời, cảnh đẹp và đồ ăn ngon. Hướng dẫn viên thân thiện.",
    rating: 5,
    image: "/reviews/review1.jpg",
    created_at: "2025-08-31",
    
  },
  {
    id: 2,
    user_id: 102,
    user_name: "Trần Thị B",
    is_my_review: true,
    comment: "Dịch vụ khá tốt, nhưng khách sạn chưa xứng tầm 4 sao.",
    rating: 4,
    image: "/reviews/review2.jpg",
    created_at: "2025-08-30",
  },
  {
    id: 3,
    user_id: 103,
    user_name: "Lê Văn C",
    is_my_review: false,
    comment: "Sapa mùa lúa chín đẹp mê hồn. Rất đáng trải nghiệm!",
    rating: 5,
    image: "/reviews/review3.jpg",
    created_at: "2025-08-29",
  },
  {
    id: 4,
    user_id: 104,
    user_name: "Phạm Thị D",
    is_my_review: false,
    comment: "Tour Phú Quốc vui nhưng hơi đông khách, di chuyển hơi bất tiện.",
    rating: 3,
    image: "/reviews/review4.jpg",
    created_at: "2025-08-28",
  },
  {
    id: 5,
    user_id: 105,
    user_name: "Nguyễn Văn E",
    is_my_review: true,
    comment: "Huế mộng mơ, dịch vụ ok, đồ ăn ngon. Sẽ quay lại lần nữa!",
    rating: 4,
    image: "/reviews/review5.jpg",
    created_at: "2025-08-27",
  },
]

const TourDetailPage = () => {
  const [tour, setTour] = useState<TourDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [isShowCommentList, setIsShowCommentList] = useState(false)
  const [bookingData, setBookingData] = useState({
    startDate: '',
    guests: 1,
    specialRequests: ''
  })
  const router = useRouter()

  useEffect(() => {
    const loadTourData = async () => {
      setLoading(true)
      try {
        // Mock API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 800))
        setTour(mockTourDetail)
      } catch (error) {
        console.error('Failed to load tour:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTourData()
  }, [])

  const handleBooking = async() => {
    setBookingLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setBookingLoading(false)
    // Mock booking submission
    alert('Đặt tour thành công! Chúng tôi sẽ liên hệ sớm nhất.')
    setShowBookingForm(false)
    router.push(`/dashboard/tourStore/?reset=true`)
  }

  if (loading) {
    return (
      <Loading text="Đang tải thông tin tour..." />
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin tour</p>
        </div>
      </div>
    )
  }

  const renderStar = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
    ))
  }
  const handleSubmit = (rating: number, comment: string) => {
    console.log(rating, comment)
  }

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
                {tour.destination_name}
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendar} />
                {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUser} />
                {tour.guide_name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center gap-4 flex-wrap py-8 ">
        {tour.image && tour.image.length > 0 ? (
          tour.image.map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow border border-gray-100 bg-gray-50">
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
          <div className="text-gray-400 italic">Không có hình ảnh cho tour này</div>
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
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sky-600 text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Điểm đến & Thời gian</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sky-500" />
                    <span>{tour.destination_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FontAwesomeIcon icon={faCalendar} className="text-sky-500" />
                    <span>{formatDate(tour.start_date)} - {formatDate(tour.end_date)}</span>
                  </div>
                </div>
              </div>

              {/* Guide Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Hướng dẫn viên</h3>
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">{tour.guide_name}</span>
                  
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Mô tả tour</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{tour.description}</p>
            </div>
            <div>
              <div className='flex items-center justify-between mb-6'>
              <h2 className="text-2xl font-bold text-gray-800 ">Đánh giá</h2>
              <button onClick={()=>setIsShowCommentList(!isShowCommentList)} className={`bg-sky-500 transition-transform rounded-full duration-300 ${!isShowCommentList ? "rotate-180" : " rotate-0"} hover:scale-105 text-white py-2 px-2 font-semibold hover:bg-sky-600 transition-colors text-sm`}>
               <FontAwesomeIcon icon={faChevronDown} />
              </button>
              </div>
              
              <div className="flex flex-col gap-4 w-full">
                {isShowCommentList && mockReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">{review.user_name}</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{review.comment}</p>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                      {renderStar(review.rating)}
                    </div>
                  
                     
                      <span className="text-gray-500 text-sm">{review.created_at}</span>
                    
                  </div>
                ))}
              </div>
            </div>
            <div>
              {
                <RatingForm handleSubmit={handleSubmit} />
              }
            </div>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="space-y-6 ">
            {/* Price & Booking Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100  top-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-sky-600 mb-2">
                  {currency(tour.price)}
                </div>
                
              </div>

              <div className="space-y-4 mb-6 text-black">
                <div className="flex items-center justify-between text-sm text-black">
                  <span className="text-gray-600 ">Thời gian:</span>
                  <span className="font-medium">{formatDate(tour.start_date)} - {formatDate(tour.end_date)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 ">Điểm đến:</span>
                  <span className="font-medium">{tour.destination_name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 ">Hướng dẫn viên:</span>
                  <span className="font-medium">{tour.guide_name}</span>
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
              <h3 className="text-lg font-bold text-gray-800 mb-4">Liên hệ đặt tour</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FontAwesomeIcon icon={faPhone} className="text-sky-500" />
                  <span className="text-gray-700 font-medium">0123 456 789</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sky-500" />
                  <span className="text-gray-700 font-medium">booking@triptrek.com</span>
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">Bạn sẽ đặt tour với thông tin cá nhân  </h3>
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faUser} className="text-sky-500" />
                    <span className="text-gray-700 font-medium">{mockBookingData.name}</span>
                    </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faPhone} className="text-sky-500" />
                    <span className="text-gray-700 font-medium">{mockBookingData.phone}</span>
                    </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faEnvelope} className="text-sky-500" />
                    <span className="text-gray-700 font-medium">{mockBookingData.email}</span>
                    </div>
                <button onClick={()=>handleBooking()} className={`w-full ${bookingLoading ? 'opacity-50 cursor-not-allowed' : ''} cursor-pointer flex items-center justify-center gap-2 bg-sky-500 text-white py-4 rounded-xl font-semibold hover:bg-sky-600 transition-colors text-lg `}>
                   {bookingLoading ? (<>
                    <FontAwesomeIcon icon={faSpinner} spin />
                   
                   </>) : 'Đặt ngay'}
                </button>
                </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default TourDetailPage
