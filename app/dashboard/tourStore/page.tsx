'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faClock, faLocationDot, faTicket, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { EBookingStatus } from '@/app/enum/BookingStatus'
import BackButton from '@/app/common/BackButton'
import { useSearchParams } from 'next/navigation'
import {  faCheck } from '@fortawesome/free-solid-svg-icons'
import DeleteModal from '@/app/Modal/DeleteModal'

// Types matching your schema


export type Tour = {
  id: number
  name: string
  location: string
  thumbnail: string
}

export type Booking = {
  id: number
  user_id: number
  tour_id: number
  status: EBookingStatus
  start_date: string // ISO
  end_date: string   // ISO
  price: number
  tour: Tour
}

const currency = (n: number) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('vi-VN')

const mockBookings: Booking[] = [
  {
    id: 101,
    user_id: 1,
    tour_id: 1,
    status: EBookingStatus.PENDING,
    start_date: '2025-09-01',
    end_date: '2025-09-05',
    price: 5990000,
    tour: { id: 1, name: 'Khám phá Đà Nẵng 5N4Đ', location: 'Đà Nẵng, Việt Nam', thumbnail: '/About1.jpg' }
  },
  {
    id: 102,
    user_id: 1,
    tour_id: 2,
    status: EBookingStatus.SUCCESS,
    start_date: '2025-10-10',
    end_date: '2025-10-13',
    price: 4590000,
    tour: { id: 2, name: 'Hội An cổ kính 4N3Đ', location: 'Hội An, Quảng Nam', thumbnail: '/About2.jpg' }
  },
  {
    id: 103,
    user_id: 1,
    tour_id: 3,
    status: EBookingStatus.DENY,
    start_date: '2025-08-20',
    end_date: '2025-08-22',
    price: 2990000,
    tour: { id: 3, name: 'Đà Lạt mộng mơ 3N2Đ', location: 'Đà Lạt, Lâm Đồng', thumbnail: '/About3.jpg' }
  }
]

const statusColor: Record<EBookingStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  SUCCESS: 'bg-green-100 text-green-700',
  DENY: 'bg-red-100 text-red-700'
}

const statusLabel: Record<EBookingStatus, string> = {
  PENDING: 'Đang chờ',
  SUCCESS: 'Thành công',
  DENY: 'Từ chối'
}

const Page = () => {
  const [tab, setTab] = useState<EBookingStatus | 'all'>('all')
  const searchParams = useSearchParams()
  const [itemSelected, setItemSelected] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const reset = searchParams.get('reset')
  useEffect(() => {
    if (reset) {
      setTab('all')
    }
    console.log(reset)
  }, [reset])
  const bookings = useMemo(() => {
    if (tab === 'all') return mockBookings
    return mockBookings.filter(b => b.status === tab)
  }, [tab])

  useEffect(() => {
    if (isAllSelected) {
      setItemSelected(bookings.map((b) => b.id.toString()))
    } else {
      setItemSelected([])
    }
  }, [isAllSelected]) 
  
  const handleDeleteSelected = () => {
    setShowDeleteModal(false)
    setItemSelected([])
    setIsAllSelected(false)
  }
  

  return (
    <div className="min-h-screen bg-gray-50 py-10">
        <BackButton />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Vé đã đặt</h1>
          <p className="text-gray-600 mt-1">Xem trạng thái và chi tiết các vé đang đặt của bạn</p>
        </div>

        {/* Tabs */}
        <div className='flex justify-between items-start gap-4'>
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['all',EBookingStatus.PENDING,EBookingStatus.SUCCESS,EBookingStatus.DENY] as const).map(k => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                tab === k ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {k === 'all' ? 'Tất cả' : statusLabel[k]}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
        {
            itemSelected.length > 0 && ( <button className='flex items-center gap-2 text-sky-500 px-4 py-2 rounded-lg' onClick={()=>setShowDeleteModal(true)}>
            <FontAwesomeIcon icon={faTrash} />
            <span className='text-gray-700'>Xóa</span>
           </button>)
           }
           <button className='flex items-center gap-2 text-sky-500 px-4 py-2 rounded-full' onClick={()=>setIsAllSelected(!isAllSelected)}>{
            isAllSelected ? <FontAwesomeIcon className='text-white rounded-full bg-sky-500' icon={faCircleCheck} /> : <FontAwesomeIcon className='text-white rounded-full bg-sky-500' icon={faCircle} />
           }
           <span className='text-gray-700'>Chọn tất cả</span>
           
           </button>
          
          
          </div>
        </div>
       

        {/* List */}
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((b) => {
            const isSelected = itemSelected.includes(b.id.toString());
            return (
              <div
                key={b.id}
                className={`relative group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-200 shadow-sky-500/20 scale-[1.025]'
                    : 'hover:border-sky-400 hover:shadow-md'
                }`}
                onClick={() =>
                  setItemSelected(
                    isSelected
                      ? itemSelected.filter((id) => id !== b.id.toString())
                      : [...itemSelected, b.id.toString()]
                  )
                }
              >
                {/* Custom Checkbox */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500'
                        : 'border-gray-300 bg-white group-hover:border-sky-400'
                    }`}
                  >
                    {isSelected ? (
                      <FontAwesomeIcon icon={faCircleCheck} className="text-white text-lg" />
                    ) : (
                      <span className="block w-3 h-3 rounded-full bg-white"></span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-56 h-40 md:h-auto flex-shrink-0">
                    <Image src={b.tour.thumbnail} alt={b.tour.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-5 pl-16 md:pl-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-gray-800">{b.tour.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${statusColor[b.status]}`}>{statusLabel[b.status]}</span>
                    </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faLocationDot} className="text-sky-500" />
                      <span>{b.tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="text-sky-500" />
                      <span>{formatDate(b.start_date)} → {formatDate(b.end_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faTicket} className="text-sky-500" />
                      <span>Giá: <strong className="text-gray-900">{currency(b.price)}</strong></span>
                    </div>
                  </div>

                    <div className="mt-4 flex items-center gap-3">
                      {b.status === EBookingStatus.PENDING ? (
                        <span className='inline-flex items-center gap-2 text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg'>
                            <FontAwesomeIcon icon={faClock} /> Đang chờ xác nhận
                        </span>
                      ) : b.status === EBookingStatus.SUCCESS ? (
                        <span className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                          <FontAwesomeIcon icon={faCircleCheck} /> Đã xác nhận
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                          <FontAwesomeIcon icon={faXmark} /> Vé đã bị từ chối
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showDeleteModal && 
        <DeleteModal setShowDeleteModal={setShowDeleteModal} handleDeleteSelected={handleDeleteSelected} title="Xác nhận xoá vé" description="Bạn có chắc chắn muốn xoá vé đã chọn? Hành động này không thể hoàn tác." />   
      }
    </div>
  )
}

export default Page
