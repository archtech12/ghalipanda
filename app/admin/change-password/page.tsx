'use client'

import {useState} from 'react'

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    // Validate password length
    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password changed successfully!')
        setFormData({
          email: '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      } else {
        setError(data.error || 'Failed to change password')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors"
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Password Requirements:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Minimum 8 characters</li>
          <li>• Use a mix of letters, numbers, and symbols for better security</li>
          <li>• Avoid using common words or personal information</li>
        </ul>
      </div>
    </div>
  )
}
