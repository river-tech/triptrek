'use client'

import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLock, faShieldAlt, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useProfile from '@/hooks/useProfile'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

const NewPassword = ({email}:{email:string}) => {
  // OTP state
  const [values, setValues] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const [submitting, setSubmitting] = useState(false)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const { requestOTP, resetPassword } = useProfile();
  // Password state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)

  // OTP countdown
  React.useEffect(() => {
    if (seconds > 0) {
      const id = setInterval(() => setSeconds((s) => s - 1), 1000)
      return () => clearInterval(id)
    }
  }, [seconds])

  React.useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const code = React.useMemo(() => values.join(''), [values])
  const isOTPComplete = code.length === OTP_LENGTH && values.every((v) => v !== '')

  const handleChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...values]
    next[index] = val
    setValues(next)
    if (val && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus()
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0)
      inputsRef.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1)
      inputsRef.current[index + 1]?.focus()
  }

  const resend = async() => {
    setValues(Array(OTP_LENGTH).fill(''))
    setLoadingResend(true)
   await requestOTP({email})
    setLoadingResend(false)
    setSeconds(RESEND_SECONDS)
    inputsRef.current[0]?.focus()
  }

  // Password strength


  const valid =
    isOTPComplete &&
   
    confirmPassword === newPassword

  const router = useRouter()
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(email, code, newPassword, confirmPassword)
    if (!valid) return
    setSubmitting(true)
    // // Mock API verify OTP + set password
    const res = await resetPassword({email : email, otp: code, newPassword: newPassword})
    setSubmitting(false)
    if(res){
      router.push('/authen/signIn')
    }
    else{
      return 
    }
  }

  return (
    <div className="h-max-screen flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 mb-3">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Xác thực OTP & Đặt lại mật khẩu</h1>
          <p className="text-gray-600 mt-1">
            Vui lòng nhập mã OTP và mật khẩu mới để hoàn tất.
          </p>
        </div>
        <form
          onSubmit={submit}
          className="bg-white rounded-2xl text-black shadow-sm border border-gray-100 p-6 space-y-5"
        >
          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã OTP</label>
            <div className="flex justify-between gap-2 sm:gap-3 mb-2">
              {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    if (el) inputsRef.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={values[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-black text-2xl font-semibold rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Mã gồm 6 chữ số</span>
              {seconds > 0 ? (
                <span>Gửi lại sau {seconds}s</span>
              ) : (
               <>
               {loadingResend ? (
                <FontAwesomeIcon icon={faSpinner} />
               ) : (
                <button
                  type="button"
                  onClick={resend}
                  className="text-sky-600 hover:text-sky-700"
                  disabled={loadingResend}
                >
                  Gửi lại mã
                </button>
               )}</>
              )}
            </div>
            
          </div>
          {/* Mật khẩu mới */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                placeholder="Ít nhất 8 ký tự"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Hiện/ẩn mật khẩu mới"
              >
                <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} />
              </button>
            </div>
            
          </div>
          {/* Xác nhận mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                placeholder="Nhập lại mật khẩu mới"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Hiện/ẩn xác nhận mật khẩu"
              >
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
              </button>
            </div>
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-sm text-red-600 mt-1">Mật khẩu xác nhận không khớp</p>
            )}
          </div>
         
          <button
            type="submit"
            disabled={!valid || submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
              !valid || submitting ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
            }`}
          >
            {submitting ? (<>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            </>): 'Xác nhận'}
          </button>
          <div className="text-center">
            <Link href="/authen/signIn" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600 mt-2">
              <FontAwesomeIcon icon={faArrowLeft} />
              Quay lại đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPassword
