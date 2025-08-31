'use client'

import React, { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLock, faShieldAlt, faCircleCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const passwordStrength = useMemo(() => {
    let score = 0
    if (newPassword.length >= 8) score += 1
    if (/[A-Z]/.test(newPassword)) score += 1
    if (/[a-z]/.test(newPassword)) score += 1
    if (/[0-9]/.test(newPassword)) score += 1
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1
    const level = score <= 2 ? 'Yếu' : score === 3 ? 'Khá' : 'Mạnh'
    const color = score <= 2 ? 'bg-red-500' : score === 3 ? 'bg-yellow-500' : 'bg-green-500'
    const width = `${(score / 5) * 100}%`
    return { score, level, color, width }
  }, [newPassword])

  const valid = newPassword.length >= 8 && confirmPassword === newPassword
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setDone(true)
    router.back();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 mb-3">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Tạo mật khẩu mới</h1>
          <p className="text-gray-600 mt-1">Hãy đặt mật khẩu mạnh để bảo vệ tài khoản của bạn</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl text-black shadow-sm border border-gray-100 p-6 space-y-5">
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
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${passwordStrength.color}`} style={{ width: passwordStrength.width }} />
              </div>
              <div className="mt-1 text-sm text-gray-600">Độ mạnh: {passwordStrength.level}</div>
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

          {done ? (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>Đặt lại mật khẩu thành công! Bạn có thể đăng nhập lại.</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!valid || submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
              !valid || submitting ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
            }`}
          >
            {submitting ? 'Đang lưu...' : 'Lưu mật khẩu mới'}
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
