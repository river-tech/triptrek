'use client'
import TravelSearching from '@/app/common/TravelSearching'
import HeroSection from '@/app/common/HeroSection'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import FamouTour from '@/app/common/FamousTour';
import FamousDestination from '@/app/common/FamousDestination';
import { CardItem } from '@/app/common/FamousTour';
import BackButton from '@/app/common/BackButton';
import useData from '@/hooks/useData';
import { ITourPopular } from '@/model/tour';
import { IFamousDestination } from '@/model/destination';




const page = () => {
  
  const [result, setResult] = useState<ITourPopular[]>([]);
  const [popularTours, setPopularTours] = useState<ITourPopular[]>([]);
  const [popularDestinations, setPopularDestinations] = useState<IFamousDestination[]>([]);
  const { getPopularTours, getPopularDestinations } = useData();

  

  useEffect(() => {
    const fetchData = async () => {
     const tours = await getPopularTours();
     console.log(tours)
     const destinations = await getPopularDestinations();
     setPopularDestinations(destinations || []);
     setPopularTours(tours || []);
    }
    fetchData();
  }, [])

  
  const handleRenderResult = (tours: ITourPopular[]) => {
    setResult(tours || []);
  }
  

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }


  return (
    <div className='bg-white'>
      <BackButton />
    <HeroSection backgroundUrl='/mountain.jpg' heightClass='h-[700px]'>
      <div className="text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tìm chuyến đi của bạn</h1>
        <p className="text-white mb-6">Chọn điểm đến, thời gian và mức giá phù hợp</p>
        <TravelSearching handleResult={handleRenderResult} />
      </div>
    </HeroSection>
      {
        result.length > 0 && (
          <section className="mx-auto px-6 py-12">
      
      <div className="relative ">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{ prevEl: '.fam-prev', nextEl: '.fam-next' }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {chunkArray(result, 4).map((page, pageIndex) => (
            <SwiperSlide key={pageIndex}>
              <div className="grid grid-cols-4 gap-6">
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
    <FamousDestination items={popularDestinations} />
    <FamouTour items={popularTours} />
    </div>
  )
}

export default page