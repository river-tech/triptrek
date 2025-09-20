"use client"

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faUtensils, faStar, faMap, faChevronDown, faImage, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import RatingForm from "@/app/common/RatingForm"
import BackButton from "@/app/common/BackButton"
import { useEffect, useState } from "react"
import { IDestination } from "@/model/destination"
import DeleteModal from "@/app/Modal/DeleteModal"

export default function DestinationDetail() {

  const destination = {
    id: 1,
    name: "Sapa",
    image: ["/mountain.jpg", "/mountain.jpg", "/mountain.jpg", "/mountain.jpg"],
  }
  const tours = [
    { id: 1, name: "Tour Hạ Long 3N2Đ", price: 2500000, image: "/mountain.jpg" },
    { id: 2, name: "Khám phá Vịnh Lan Hạ", price: 1800000, image: "/mountain.jpg" },
    { id: 3, name: "Khám phá Vịnh Lan Hạ", price: 1800000, image: "/mountain.jpg" },
    { id: 4, name: "Khám phá Vịnh Lan Hạ", price: 1800000, image: "/mountain.jpg" },
  ]

  const foods = [
    { id: 1, name: "Bún chả Hạ Long", image: "/food1.jpg" },
    { id: 2, name: "Chả mực giã tay", image: "/food2.jpg" },
    { id: 3, name: "Chả mực giã tay", image: "/food2.jpg" },
    { id: 4, name: "Chả mực giã tay", image: "/food2.jpg" },
  ]

  

  const [isShowCommentList, setIsShowCommentList] = useState(false)
  const [editId, setEditId] = useState(0)
  const [editComment, setEditComment] = useState("")
  const [editRating, setEditRating] = useState(0)
  const [editHover, setEditHover] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  const handleSubmit = (rating: number, comment: string) => {
    console.log(rating, comment)
  }
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      {/* Cover */}
      <div className="relative w-full h-[450px]">
        <Image src="/halong.jpg" alt="Hạ Long" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Vịnh Hạ Long</h1>
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
            Vịnh Hạ Long là một trong 7 kỳ quan thiên nhiên thế giới, nổi tiếng với hàng nghìn hòn đảo đá vôi tuyệt đẹp
            cùng hệ sinh thái đa dạng. Đây là điểm đến lý tưởng cho những ai yêu thích biển cả và khám phá.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <FontAwesomeIcon icon={faImage} className="text-sky-600" />
            Bộ sưu tập hình ảnh
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {destination.image.map((image, index) => (
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
          <div className="grid md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <Image src={tour.image} alt={tour.name} width={600} height={300} className="w-full h-52 object-cover" />
                <div className="p-6 flex flex-col justify-between h-40">
                  <h3 className="text-xl font-bold text-gray-900">{tour.name}</h3>
                  <p className="text-sky-600 text-lg font-semibold">
                    {tour.price.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>
            ))}
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
            {foods.map((food) => (
              <div
                key={food.id}
                className="flex items-center gap-5 bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <Image src={food.image} alt={food.name} width={140} height={100} className="rounded-lg object-cover" />
                <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
              </div>
            ))}
          </div>
        </div> 
      </div>
    </div>
  )
}