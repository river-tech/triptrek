"use client";

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

type TourItem = {
  id: number
  name: string
  img: string
  price: number
  description: string;
  startDate: string;
  endDate: string;
  destination: string;
}

type FamouTourProps = {
  title?: string
  items?: TourItem[]
}

export const CardItem = ({ item, id }: { item: TourItem, id: number }) => {
  const router = useRouter();
  return (
    <div className="bg-white mb-10 rounded-2xl hover:scale-105 shadow-lg  hover:shadow-xl transition-all duration-200 mt-2 overflow-hidden max-w-[340px] mx-auto flex flex-col">
      <div className="relative w-full aspect-[1.4/1]">
        <Image
          src={item.img || '/About1.jpg'}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 340px"
        />
        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
          <div className="text-white text-lg font-light tracking-widest mb-1">{item.destination}</div>
          <div className="text-white text-3xl font-extrabold leading-tight text-center drop-shadow-lg">
            {item.name}
          </div>
        </div>
        {/* Border highlight */}
        <div className="absolute inset-0 rounded-2xl border-2 border-[#8B5CF6] pointer-events-none"></div>
      </div>
      <div className="flex-1 flex flex-col px-4 pt-3 pb-4">
        <div className="text-black text-base font-semibold mb-1 truncate">
          Điểm đến: <span className="font-bold">{item.destination}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-2 gap-2">
          <span className="flex items-center gap-1">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M7 2v2m4-2v2"/><path d="M3 8h12"/></svg>
            {item.startDate && item.endDate
              ? `${new Date(item.startDate).toLocaleDateString('vi-VN')} - ${new Date(item.endDate).toLocaleDateString('vi-VN')}`
              : 'Chưa xác định'}
          </span>
        </div>
        <div className="text-gray-700 text-xs py-2 mb-2">Giá 1 khách chỉ từ:</div>
        <div className="flex items-end justify-between mt-auto">
          <span className="text-sky-500 text-2xl font-extrabold">
            {item.price?.toLocaleString('vi-VN')}
          </span>
          <button onClick={()=>router.push(`/dashboard/tourDetail/${id}`)} className="ml-4 cursor-pointer px-4 py-1.5 bg-sky-400 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold shadow transition">Xem chi tiết</button>
        </div>
      </div>
   </div>
  );
}

const defaultItems: TourItem[] = [
  {
    id: 1,
    name: 'Đà Nẵng',
    img: '/About1.jpg',
    price: 4990000,
    description: 'Khám phá thành phố biển Đà Nẵng xinh đẹp với nhiều điểm tham quan nổi tiếng.',
    startDate: '2024-07-01',
    endDate: '2024-07-05',
    destination: 'Đà Nẵng'
  },
  {
    id: 2,
    name: 'Hội An',
    img: '/About2.jpg',
    price: 3990000,
    description: 'Trải nghiệm phố cổ Hội An lung linh sắc màu và ẩm thực đặc sắc.',
    startDate: '2024-07-10',
    endDate: '2024-07-14',
    destination: 'Hội An'
  },
  {
    id: 3,
    name: 'Huế',
    img: '/About3.jpg',
    price: 4590000,
    description: 'Tham quan cố đô Huế với nhiều di tích lịch sử và văn hóa đặc sắc.',
    startDate: '2024-07-15',
    endDate: '2024-07-19',
    destination: 'Huế'
  },
  {
    id: 4,
    name: 'Phú Quốc',
    img: '/image1.png',
    price: 5990000,
    description: 'Tận hưởng biển xanh cát trắng và các hoạt động giải trí tại đảo ngọc Phú Quốc.',
    startDate: '2024-07-20',
    endDate: '2024-07-25',
    destination: 'Phú Quốc'
  },
  {
    id: 5,
    name: 'Đà Lạt',
    img: '/mountain.jpg',
    price: 4290000,
    description: 'Khám phá thành phố ngàn hoa Đà Lạt với khí hậu mát mẻ quanh năm.',
    startDate: '2024-07-22',
    endDate: '2024-07-26',
    destination: 'Đà Lạt'
  }
]

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

const FamouTour = ({ title = 'Các địa điểm thu hút nhất Việt Nam', items = defaultItems }: FamouTourProps) => {
  const pages = chunkArray(items, 9)
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-[36px] sm:text-[42px] font-extrabold text-sky-500 mb-8">
        Tour du lịch nổi bật
      </h2>

      <div className="relative">
      <button aria-label="Trước" className="dest-prev absolute -left-20 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/5 flex items-center justify-center">
            <FontAwesomeIcon className='text-sky-500' icon={faChevronLeft} />
          </button>
          <button aria-label="Sau" className="dest-next absolute -right-20 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/5 flex items-center justify-center">
            <FontAwesomeIcon className='text-sky-500' icon={faChevronRight} />
          </button>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{ prevEl: '.fam-prev', nextEl: '.fam-next' }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {pages.map((page, pageIndex) => (
            <SwiperSlide key={pageIndex}>
              <div className="grid grid-cols-3 gap-6">
                {page.map((item) => (
                  <CardItem key={item.id} item={item} id={item.id} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default FamouTour