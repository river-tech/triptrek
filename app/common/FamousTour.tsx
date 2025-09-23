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
import { ITourPopular } from '@/model/tour';

// CardItem với kích thước cố định và phù hợp
export const CardItem = ({ item, id }: { item: ITourPopular, id: number }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white mb-10 rounded-2xl hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-200 mt-2 overflow-hidden flex flex-col"
      style={{
        width: '320px',
        minWidth: '320px',
        maxWidth: '320px',
        height: '440px',
      }}
    >
      <div className="relative w-full" style={{ height: '280px' }}>
        <Image
          src={item.images[0] || '/About1.jpg'}
          alt={item.name}
          fill
          className="object-cover"
          sizes="320px"
          style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
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
      <div className="flex-1 flex justify-between flex-col px-4 pt-3 pb-4">
        <div className="text-black text-base font-semibold mb-1 truncate">
          Điểm đến: <span className="font-bold">{item.destination}</span>
        </div>
        <div>
        <div className="text-gray-700 text-xs py-2 mb-2">Giá 1 khách chỉ từ:</div>
        <div className="flex items-end justify-between mt-auto">
          <span className="text-sky-500 text-2xl font-extrabold">
            {item.price?.toLocaleString('vi-VN')}
          </span>
          <button
            onClick={() => router.push(`/dashboard/tourDetail/${id}`)}
            className="ml-4 cursor-pointer px-4 py-1.5 bg-sky-400 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold shadow transition"
          >
            Xem chi tiết
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

const FamouTour = ({ items }: { items: ITourPopular[] }) => {
  const pages = chunkArray(items || [], 9)
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
              <div className="grid grid-cols-3 gap-6 justify-center">
                {page.map((item) => (
                  <div key={item.id} className="flex justify-center">
                    <CardItem item={item} id={item.id} />
                  </div>
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