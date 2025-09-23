'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faMagnifyingGlass, faMapMarkerAlt, faPlus, faTag } from '@fortawesome/free-solid-svg-icons'
import BackButton from '@/app/common/BackButton'
import { useRouter } from 'next/navigation'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import useProfile from '@/hooks/useProfile'
import { ITourPopular } from '@/model/tour'

 
const currency = (n: number) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })



const Page = () => {

  const [query, setQuery] = useState('')
  const [tours, setTours] = useState<ITourPopular[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idDeleteTour, setIdDeleteTour] = useState(0)
  const router = useRouter()
  const {getMyTourCreated, deleteMyTourCreated} = useProfile()
const fetchCreatedTours = async () => {
  const res = await getMyTourCreated()
  console.log(`res`, res)
  setTours(res)
}
useEffect(() => {
  fetchCreatedTours()
},[])


 

  const handleDeleteTour = async (id: number) => {
    setShowDeleteModal(true)
    setIdDeleteTour(id)
    
  }
  const confirmDeleteTour = async () => {
    const res = await deleteMyTourCreated({id: idDeleteTour.toString()})
    if(res){
      setTours(tours.filter(t => t.id !== idDeleteTour))
      setIdDeleteTour(0)
      setShowDeleteModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
        <BackButton />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tour đang bán</h1>
            <p className="text-gray-600">Quản lý các tour bạn đang chào bán, chỉnh sửa và theo dõi hiệu suất</p>
          </div>
          <button onClick={() => router.push('/dashboard/tourSelling/createNewTour')} className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors">
            <FontAwesomeIcon icon={faPlus} /> Tạo tour mới
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
         

          <div className="relative w-full md:w-80">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tour theo tên hoặc địa điểm..."
              className="w-full bg-white pl-10 text-black px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button onClick={() => router.push('/dashboard/tourSelling/bookingManage')} className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors">Quản lí đặt tour</button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
          {tours?.length > 0 ? (
           
            tours?.map(t => (
              <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-44">
                  {/* Sử dụng các trường đúng với interface SellingTour */}
                  <Image src={t.images[0]} alt={t.name} fill className="object-cover" />
                  
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{t.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-700">
                    <span className="inline-flex items-center gap-2"><FontAwesomeIcon className="text-sky-500" icon={faMapMarkerAlt} /> {t.destination}</span>
                    
                  </div>
  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sky-600 font-semibold">
                        <FontAwesomeIcon icon={faTag} /> {currency(t.price)}
                    </div>
                  
                  </div>
  
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button onClick={()=>handleDeleteTour(t.id)} className="px-3  hover:text-red-600 cursor-pointer py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700">
                      <FontAwesomeIcon icon={faTrash} /> Xoá
                    </button>
                    <button onClick={()=>router.push(`/dashboard/tourSelling/edit/${t.id}`)} className="px-3  hover:text-sky-600 cursor-pointer py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 text-gray-700">
                      <FontAwesomeIcon icon={faEdit} /> Sửa
                    </button>
                    
                  </div>
                </div>
              </div>
            ))
          ):(
            <div className="col-span-full text-center text-gray-600 bg-white rounded-xl border border-dashed border-gray-300 py-16">
            Chưa có tour nào phù hợp. Hãy điều chỉnh bộ lọc hoặc tạo tour mới.
          </div>
          )}
        </div>

        {/* Footer note */}
        
      </div>
    {/* Modal xác nhận xoá */}
    {showDeleteModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-80">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Xác nhận xoá tour</h2>
          <p className="mb-6 text-gray-600">Bạn có chắc chắn muốn xoá tour này không? Hành động này không thể hoàn tác.</p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              onClick={() => setShowDeleteModal(false)}
            >
              Huỷ
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              onClick={confirmDeleteTour}
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default Page
