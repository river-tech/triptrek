'use client'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import useBooking from '@/hooks/useBooking'
import Loading from './Loading'

const RatingForm = ({
  id
}: {
  id: string
}) => {
  const { postReviewTour } = useBooking()
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  
  
  
  const handleSubmitRating = async() => {
    setLoading(true)
    await postReviewTour({tourId: id, rating, comment})
    setLoading(false)
  }

  return (
    <div className="bg-white shadow-md w-full rounded-2xl p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Viết đánh giá của bạn</h3>

      {/* Stars */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1
          return (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer text-2xl transition ${
                value <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          )
        })}
      </div>

      {/* Textarea */}
      <textarea
        placeholder="Viết đánh giá của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none text-gray-900 mb-4"
        rows={4}
      />

      {/* Submit button */}
      {
        loading ? <Loading text="Đang gửi đánh giá..." /> : <button onClick={handleSubmitRating} className="px-6 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition" disabled={loading}>Gửi đánh giá</button>
      }
    </div>
  )
}

export default RatingForm