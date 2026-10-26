'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      router.push('/admin')
    }
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })

      const data = await response.json()

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('adminToken', data.token)

        // Save email if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }

        router.push('/admin')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex w-full font-sans bg-gray-50">
      {/* Left Side - Premium Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-green-900">
        {/* Deep, rich animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-[#0A2F1D]"></div>
        
        {/* Subtle geometric overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        {/* Abstract Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 flex flex-col justify-between h-full p-16 w-full">
          <div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/20 shadow-2xl">
              <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Campaign<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-200">
                Command Center
              </span>
            </h1>
            <p className="text-lg text-green-100/80 leading-relaxed max-w-md font-light">
              Secure access to manage the Hon. Dr. Ghali Panda 2027 campaign initiatives, media, and community outreach.
            </p>
          </div>

          {/* Premium stats/features glassmorphism card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50"></div>
             <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                   <span className="material-symbols-outlined text-[#FFD700] text-sm">security</span>
                 </div>
                 <div>
                   <h3 className="text-white font-semibold text-sm">Enterprise Security</h3>
                   <p className="text-white/50 text-xs mt-0.5">End-to-end encrypted sessions</p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                   <span className="material-symbols-outlined text-[#FFD700] text-sm">speed</span>
                 </div>
                 <div>
                   <h3 className="text-white font-semibold text-sm">Real-time Management</h3>
                   <p className="text-white/50 text-xs mt-0.5">Instant updates to live portal</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative">
        <div className="w-full max-w-[420px] space-y-8">
          
          {/* Mobile Branding */}
          <div className="lg:hidden flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
               <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Login</h2>
            <p className="text-gray-500 mt-2">Sign in to your dashboard</p>
          </div>

          <div className="hidden lg:block">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Sign In</h2>
            <p className="text-gray-500 mt-2 text-sm">Enter your credentials to access the portal</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start animate-fade-in">
                <span className="material-symbols-outlined text-red-500 mr-3 text-xl shrink-0">error</span>
                <p className="text-red-700 text-sm font-medium pt-0.5">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 group-focus-within:text-green-600 transition-colors">mail</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all hover:border-gray-300 shadow-sm"
                  placeholder="Administrator Email"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 group-focus-within:text-green-600 transition-colors">lock</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all hover:border-gray-300 shadow-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-green-600 peer-checked:border-green-600 transition-all"></div>
                  <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>

              <a href="#" className="text-sm font-semibold text-green-700 hover:text-green-800 transition-colors">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-white font-bold bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-[0.98] overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Return to Website
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
