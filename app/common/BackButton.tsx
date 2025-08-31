import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter();
  return (
    <button onClick={() =>  router.back()} className='fixed cursor-pointer z-10 hover:bg-white/80 backdrop-blur-sm rounded-full p-2 hover:text-sky-500 flex px-2 bg-sky-500 text-white transition-all duration-300 items-center gap-2 top-10 left-10'>
    <FontAwesomeIcon icon={faArrowLeft} className='w-6 h-6' />
   
  </button>
  )
}

export default BackButton