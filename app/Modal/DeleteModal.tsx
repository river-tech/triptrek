import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const DeleteModal = ({
    setShowDeleteModal,
    handleDeleteSelected,
    loading,
    title,
    description
}: {
    setShowDeleteModal: (show: boolean) => void
    handleDeleteSelected: () => void
    loading: boolean
    title: string
    description: string
}) => {

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={() => setShowDeleteModal(false)}
        aria-label="Đóng"
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
        </svg>
      </button>
      <div className="flex flex-col items-center text-center">
        <div className="bg-red-100 rounded-full p-3 mb-4">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#F87171" fillOpacity="0.2"/>
            <path d="M9 9l6 6M15 9l-6 6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
        <p className="mb-6 text-gray-600">{description}</p>
      </div>
      <div className="flex justify-end gap-3">
        <button
          className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-medium transition"
          onClick={() => setShowDeleteModal(false)}
        >
          Hủy
        </button>
        {loading ? (
          <button className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold shadow transition">
            <FontAwesomeIcon icon={faSpinner} spin />
          </button>
        ) : (
          <button className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold shadow transition" onClick={handleDeleteSelected}>
            Xoá
          </button>
        )}
        
      </div>
    </div>
  </div>
  )
}

export default DeleteModal