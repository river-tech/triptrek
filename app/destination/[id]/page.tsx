"use client"

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faUtensils, faMap, faImage } from "@fortawesome/free-solid-svg-icons"
import BackButton from "@/app/common/BackButton"
import {   useEffect, useState } from "react"
import useData from "@/hooks/useData"
import { useParams, useRouter } from "next/navigation"
import { IDestinationDetail } from "@/model/destination"
import { ITourByDes } from "@/model/tour"
import { IFoodByDes } from "@/model/food"
import Loading from "@/app/common/Loading"

export default function DestinationDetail({
  params  
}:{
  params: Promise<{
    id : string 
  }>
}) {

  const { id } = useParams(); 
  const router = useRouter();
  const {getDestinationById, getTourByDestination, getFoodByDestination} = useData();
  

  const [destination, setDestination] = useState<IDestinationDetail | null>(null);
  const [tours, setTours] = useState<ITourByDes[] | null>(null);
  const [foods, setFoods] = useState<IFoodByDes[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchDestination = async () => {
    setIsLoading(true);
    const destination = await getDestinationById(id as string);
    const tours = await getTourByDestination(id as string);
    const foods = await getFoodByDestination(id as string);
    setIsLoading(false);
    const newTours = tours?.slice(0, 4);
    const newFoods = foods?.slice(0, 4);
    setDestination(destination);
    setTours(newTours || null);
    setFoods(newFoods || null);
  }
  
  useEffect(() => {
    fetchDestination();
  }, [id]);

  if (isLoading) {
    return <Loading text="Đang tải thông tin..." />
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      <BackButton />
      {/* Cover */}
      <div className="relative w-full h-[450px]">
        <Image src={destination?.imageURL || "/mountain.jpg"} alt="Hạ Long" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">{destination?.name}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Description */}
        <div className="text-center">
          <h2 className="text-3xl font-bold flex text-black justify-center items-center gap-2 mb-6">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sky-600" />
            Giới thiệu
          </h2>
          <p className="text-lg text-gray-900 leading-relaxed max-w-3xl mx-auto">
            {destination?.description}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <FontAwesomeIcon icon={faImage} className="text-sky-600" />
            Bộ sưu tập hình ảnh
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {destination?.galleryURL.map((image, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={image}
                  alt={`${destination.name} - Hình ảnh ${index + 1}`}
                  width={400}
                  height={250}
                  className="w-full h-52 object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Popular Tours */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">

            <FontAwesomeIcon icon={faMap} size="lg" className="text-sky-600" />
            <h2 className="text-3xl font-bold text-gray-900">Tour nổi bật</h2>
            </div>
            
          </div>
          <div className="grid md:grid-cols-4 gap-8 w-full items-center justify-center">
           {tours && tours.length > 0 ? (
            <>
             {tours && tours.map((tour) => (
              <div
                key={tour.id}
                onClick={() => router.push(`/dashboard/tourDetail/${tour.id}`)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <Image src={tour?.images[0]} alt={tour.name} width={600} height={300} className="w-full h-52 object-cover" />
                <div className="p-6 flex flex-col justify-between h-40">
                  <h3 className="text-xl font-bold text-gray-900">{tour.name}</h3>
                  <p className="text-sky-600 text-lg font-semibold">
                    {tour.price.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>
            ))}</>
           ):(
            <div className="col-span-4 flex w-full items-center justify-center h-40">
              <p className="text-gray-500">Không có tour nổi bật</p>
            </div>
           )}
          </div>
        </div>

        {/* Popular Foods */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
              <FontAwesomeIcon icon={faUtensils} className="text-sky-600" />
              Món ăn đặc sản
            </h2>
           
          </div>
          <div className="grid md:grid-cols-2 gap-6">
           {
            foods && foods.length > 0 ? (
              <>
               {foods && foods.map((food) => (
              <div
                key={food.id}
                className="flex items-center gap-5 bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <Image src={food?.images[0] || "/mountain.jpg"} alt={food?.name} width={140} height={100} className="rounded-lg h-full object-cover" />
                <h3 className="text-lg font-semibold text-gray-900">{food?.name}</h3>
              </div>
            ))}
            </>
           ):(
            <div className="col-span-2 flex w-full items-center justify-center h-40">
              <p className="text-gray-500">Chưa cập nhật món ăn đặc sản</p>
            </div>
           )}
          
          </div>
        </div> 
      </div>
    </div>
  )
}