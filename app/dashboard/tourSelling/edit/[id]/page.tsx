'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faMapMarkerAlt, faUser, faCalendar, faTag, faFileText, faUpload, faSave, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import BackButton from '@/app/common/BackButton'
import { useRouter, useParams } from 'next/navigation'
import useData from '@/hooks/useData'
import { ITourDetail } from '@/model/tour'

const mockDestinations = [
  { id: 1, name: 'Đà Nẵng, Việt Nam' },
  { id: 2, name: 'Hội An, Quảng Nam' },
  { id: 3, name: 'Đà Lạt, Lâm Đồng' },
  { id: 4, name: 'Phú Quốc, Kiên Giang' },
  { id: 5, name: 'Hạ Long, Quảng Ninh' },
  { id: 6, name: 'Huế, Thừa Thiên Huế' },
]

const EditTour = () => {
  const router = useRouter()
  const params = useParams()
  const tourId = params.id
  const { getTourById } = useData()
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tourData, setTourData] = useState<ITourDetail | null>(null)

  useEffect(() => {
    const fetchTourData = async () => {
      setLoading(true)
      const tourData = await getTourById(tourId as string)
      setTourData(tourData as ITourDetail)
      setImagePreview(tourData?.images || [])
      setLoading(false)
    }
    fetchTourData()
  }, [])

  // Hàm cập nhật giá trị cho các trường của ITourDetail
  const handleInputChange = (field: keyof ITourDetail, value: any) => {
    setTourData(prev => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
    if (errors) setErrors('')
  }

  // Xử lý upload ảnh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        const newImagePreview = [...imagePreview]
        newImagePreview[idx] = result
        setImagePreview(newImagePreview)
        setTourData(prev => {
          if (!prev) return prev
          return { ...prev, images: newImagePreview }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = (idx: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-index', idx.toString())
      fileInputRef.current.click()
    }
  }

  const removeImage = (idx: number) => {
    const newImagePreview = imagePreview.filter((_, index) => index !== idx)
    setImagePreview(newImagePreview)
    setTourData(prev => {
      if (!prev) return prev
      return { ...prev, image: newImagePreview }
    })
  }

  // Validate theo ITourDetail
  const validateForm = (): boolean => {
    if (!tourData || !tourData.name?.trim()) {
      setErrors('Tên tour là bắt buộc')
      return false
    }
    if (!tourData.destination) {
      setErrors('Vui lòng chọn điểm đến')
      return false
    }
    if (typeof tourData.price !== 'number' || tourData.price <= 0) {
      setErrors('Giá tour phải lớn hơn 0')
      return false
    }
    if (!tourData.startDate?.trim()) {
      setErrors('Ngày bắt đầu là bắt buộc')
      return false
    }
    if (!tourData.endDate?.trim()) {
      setErrors('Ngày kết thúc là bắt buộc')
      return false
    }
    if (!tourData.images || !tourData.images.length) {
      setErrors('Vui lòng tải lên ít nhất 1 ảnh tour')
      return false
    }
    if (!tourData.description?.trim()) {
      setErrors('Mô tả tour là bắt buộc')
      return false
    }
    if (!tourData.guideName?.trim()) {
      setErrors('Tên hướng dẫn viên là bắt buộc')
      return false
    }
    setErrors('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)
    try {
      // Mock API call - replace with actual update API
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Cập nhật tour thành công!')
      router.push('/dashboard/tourSelling')
    } catch (error) {
      setErrors('Có lỗi xảy ra khi cập nhật tour')
    } finally {
      setSubmitting(false)
    }
  }

  const currency = (n: number) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin tour...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <BackButton />
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faEdit} className="text-sky-600 text-xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Chỉnh sửa tour</h1>
          </div>
          <p className="text-gray-600">Cập nhật thông tin tour của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6 text-black">
              {/* Tour Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faTag} className="mr-2 text-sky-500" />
                  Tên tour *
                </label>
                <input
                  type="text"
                  value={tourData?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ví dụ: Khám phá Đà Nẵng 5N4Đ"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-sky-500" />
                  Điểm đến *
                </label>
                <select
                  value={tourData?.destination || ''}
                  onChange={(e) => handleInputChange('destination', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Chọn điểm đến</option>
                  {mockDestinations.map(dest => (
                    <option key={dest.id} value={dest.id}>{dest.name}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faTag} className="mr-2 text-sky-500" />
                  Giá tour (VNĐ) *
                </label>
                <input
                  type="number"
                  value={tourData?.price ?? ''}
                  onChange={(e) => handleInputChange('price', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ví dụ: 5000000"
                  min="0"
                />
                {tourData?.price && (
                  <p className="text-sm text-gray-600 mt-1">Hiển thị: {currency(tourData.price)}</p>
                )}
              </div>

              {/* Guide Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-sky-500" />
                  Tên hướng dẫn viên *
                </label>
                <input
                  type="text"
                  value={tourData?.guideName || ''}
                  onChange={(e) => handleInputChange('guideName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Tên hướng dẫn viên"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 text-black">
              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2 text-sky-500" />
                  Lịch trình *
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Ngày bắt đầu</label>
                    <input
                      type="date"
                      value={tourData?.startDate || ''}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Ngày kết thúc</label>
                    <input
                      type="date"
                      value={tourData?.endDate || ''}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faFileText} className="mr-2 text-sky-500" />
                  Mô tả tour *
                </label>
                <textarea
                  value={tourData?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  placeholder="Mô tả chi tiết về tour, điểm nổi bật..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faUpload} className="mr-2 text-sky-500" />
                  Ảnh tour * (Tối thiểu 1 ảnh)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="relative w-full h-40">
                      {imagePreview[idx] ? (
                        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-300">
                          <Image
                            src={imagePreview[idx]}
                            alt={`Tour preview ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                          >
                            <FontAwesomeIcon size="xs" icon={faTimes} />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => triggerFileInput(idx)}
                          className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors"
                        >
                          <FontAwesomeIcon icon={faCamera} className="text-2xl text-gray-400 mb-2" />
                          <p className="text-xs text-gray-600 text-center">Thêm ảnh</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const idx = parseInt(e.currentTarget.getAttribute('data-index') || '0')
                    handleImageUpload(e, idx)
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Error Display */}
          {errors && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-3 rounded-lg text-white font-medium transition-colors ${
                  submitting ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
                }`}
              >
                {submitting ? (
                  <>
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Cập nhật tour
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTour