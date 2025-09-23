'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faClock, faLocationDot, faTicket, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { EBookingStatus } from '@/app/enum/BookingStatus'
import BackButton from '@/app/common/BackButton'
import { useSearchParams } from 'next/navigation'
import DeleteModal from '@/app/Modal/DeleteModal'
import useBooking from '@/hooks/useBooking'
import useProfile from '@/hooks/useProfile'
import { IMyBookings } from '@/model/booking'


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
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const reset = searchParams.get('reset')
  const {cancelBooking} = useBooking()
  const {getMyBookings} = useProfile()
  const [myBookings, setMyBookings] = useState<IMyBookings[]>([])
  useEffect(() => {
    if (reset) {
      setTab('all')
    }
  
  }, [reset])

  const bookings = useMemo(() => {
    if (tab === 'all') return myBookings
    return myBookings.filter(b => b.status === tab)
  }, [tab, myBookings])

  const fetchBookings = async () => {
    const res = await getMyBookings()
    console.log("res", res)  
    setMyBookings(res as unknown as IMyBookings[])
  }
  useEffect(() => {
    fetchBookings()
    console.log("myBookings", myBookings)
  }, [])
  
  const handleDeleteSelected = async () => {
    setLoading(true)
    await cancelBooking({id: deleteId.toString()})
    setDeleteId(0)
    setLoading(false)
    setShowDeleteModal(false)
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

      
        </div>
       

        {/* List */}
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((b) => {
            
            return (
              <div
                key={b.id}
                className={`relative group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 cursor-pointer`}
                // onClick={() =>
                  
                // }
              >
                {/* Custom Checkbox */}
                
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-56 h-40 md:h-auto flex-shrink-0">
                    <Image src={b?.images[0] || ''} alt={b?.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-5 pl-16 md:pl-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-gray-800">{b?.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${statusColor[b.status]}`}>{statusLabel[b.status]}</span>
                      
                    </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faLocationDot} className="text-sky-500" />
                      <span>{b?.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="text-sky-500" />
                      <span>{formatDate(b?.startDate)} → {formatDate(b?.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faTicket} className="text-sky-500" />
                      <span>Giá: <strong className="text-gray-900">{currency(b?.price)}</strong></span>
                    </div>
                  </div>

                    <div className="mt-4 flex justify-between items-center gap-3 ">
                      {b?.status === EBookingStatus.PENDING ? (
                        <span className='inline-flex items-center gap-2 text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg'>
                            <FontAwesomeIcon icon={faClock} /> Đang chờ xác nhận
                        </span>
                      ) : b?.status === EBookingStatus.SUCCESS ? (
                        <span className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                          <FontAwesomeIcon icon={faCircleCheck} /> Đã xác nhận
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                          <FontAwesomeIcon icon={faXmark} /> Vé đã bị từ chối
                        </span>
                      )}
                      <button className='flex items-center gap-2 cursor-pointer text-sky-500 px-4 py-2 rounded-lg' onClick={()=>{setShowDeleteModal(true); setDeleteId(b?.id)}}>
                        <FontAwesomeIcon className='text-red-500 hover:text-red-600' icon={faTrash} />
                        <span className='text-gray-700 hover:text-red-600'>Xóa</span>
                      </button>
                    </div>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showDeleteModal && 
        <DeleteModal setShowDeleteModal={setShowDeleteModal} handleDeleteSelected={handleDeleteSelected} loading={loading} title="Xác nhận xoá vé" description="Bạn có chắc chắn muốn xoá vé đã chọn? Hành động này không thể hoàn tác." />   
      }
    </div>
  )
}

export default Page
