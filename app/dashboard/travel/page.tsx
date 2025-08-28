'use client'
import TravelSearching from '@/app/common/TravelSearching'
import HeroSection from '@/app/common/HeroSection'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import FamouTour from '@/app/common/FamousTour';
import FamousDestination from '@/app/common/FamousDestination';
import { CardItem } from '@/app/common/FamousTour';


const page = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any[]>([]);

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }
  

  return (
    <div className='bg-white'>
    <HeroSection backgroundUrl='/mountain.jpg' heightClass='h-[700px]'>
      <div className="text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tìm chuyến đi của bạn</h1>
        <p className="text-white/90 mb-6">Chọn điểm đến, thời gian và mức giá phù hợp</p>
        <TravelSearching />
      </div>
    </HeroSection>
      {
        isSearching && (
          <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-[36px] sm:text-[42px] font-extrabold text-sky-500 mb-8">
        Tour du lịch của bạn
      </h2>

      <div className="relative">
      

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{ prevEl: '.fam-prev', nextEl: '.fam-next' }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {chunkArray(result, 3).map((page, pageIndex) => (
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
    <FamousDestination />
    <FamouTour />
    </div>
  )
}

export default page