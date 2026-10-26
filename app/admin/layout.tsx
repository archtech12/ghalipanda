'use client'

import {useState, useEffect} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is authenticated (except on login page)
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  // Don't show sidebar and header on login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  const NavLink = ({href, icon, label, special = false}: {href: string, icon: string, label: string, special?: boolean}) => {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`) && href !== '/admin'
    const isExactDashboard = pathname === '/admin' && href === '/admin'

    const activeState = (isActive || isExactDashboard)

    return (
      <Link
        href={href}
        className={`flex items-center px-4 py-3.5 mb-1 rounded-xl transition-all duration-200 group relative overflow-hidden ${
          activeState 
            ? 'bg-white/10 text-white shadow-sm' 
            : 'text-green-100/70 hover:bg-white/5 hover:text-white'
        } ${special ? 'bg-gradient-to-r from-yellow-500/20 to-transparent border-l-4 border-yellow-400 text-white' : 'border-l-4 border-transparent'}`}
      >
        {activeState && !special && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-r-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
        )}
        <span className={`material-symbols-outlined mr-3 transition-transform duration-200 ${activeState ? 'scale-110 text-yellow-400' : 'group-hover:scale-110 group-hover:text-yellow-200'}`}>
          {icon}
        </span>
        <span className={`font-medium ${activeState ? 'font-semibold' : ''}`}>{label}</span>
      </Link>
    )
  }

  // Get current page title for breadcrumb
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard Overview'
    const parts = pathname?.split('/') || []
    const lastPart = parts[parts.length - 1]
    return lastPart ? lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace('-', ' ') : 'Dashboard'
  }

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-[#0A2F1D] text-white transition-all duration-300 ease-in-out transform shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg border border-white/20">
              <span className="material-symbols-outlined text-white text-xl">admin_panel_settings</span>
            </div>
            <div>
              <div className="text-lg font-black tracking-tight leading-tight">Command Center</div>
              <div className="text-[10px] text-yellow-400 font-bold tracking-widest uppercase">Hon. Dr. Ghali Panda 2027</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="overflow-y-auto h-[calc(100vh-88px)] p-4 custom-scrollbar">
          <div className="space-y-1 mb-8">
            <div className="px-4 text-xs font-bold text-green-100/40 uppercase tracking-widest mb-3 mt-2">Main Menu</div>
            <NavLink href="/admin" icon="dashboard" label="Dashboard" />
            <NavLink href="/admin/news" icon="article" label="News & Updates" />
            <NavLink href="/admin/projects" icon="work" label="Projects" />
            <NavLink href="/admin/media" icon="image" label="Media Gallery" />
          </div>

          <div className="space-y-1 mb-8">
            <div className="px-4 text-xs font-bold text-green-100/40 uppercase tracking-widest mb-3">Community</div>
            <NavLink href="/admin/constituency" icon="location_on" label="Constituency" />
            <NavLink href="/admin/legislative" icon="gavel" label="Legislative" />
            <NavLink href="/admin/about" icon="info" label="About Profile" />
            <NavLink href="/admin/contact" icon="contact_mail" label="Messages" />
          </div>

          <div className="space-y-1 mb-8">
            <div className="px-4 text-xs font-bold text-green-100/40 uppercase tracking-widest mb-3">Campaign</div>
            <NavLink href="/admin/post-creator" icon="post_add" label="Social Post Creator" special />
            <NavLink href="/admin/volunteers" icon="volunteer_activism" label="Volunteers" special />
          </div>

          <div className="space-y-1 mb-8">
            <div className="px-4 text-xs font-bold text-green-100/40 uppercase tracking-widest mb-3">System</div>
            <NavLink href="/admin/users" icon="group" label="Admin Users" />
            <NavLink href="/admin/change-password" icon="lock" label="Security" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              
              <div className="hidden sm:block">
                <nav className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="material-symbols-outlined text-lg">home</span>
                  <span className="text-gray-300">/</span>
                  <span className="font-semibold text-gray-900">{getPageTitle()}</span>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-green-700 transition-colors rounded-full hover:bg-green-50">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 bg-white border border-gray-200 rounded-full hover:border-green-300 hover:shadow-sm transition-all focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-600 to-green-800 flex items-center justify-center text-white font-bold shadow-inner">
                    A
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-semibold text-gray-700 leading-none">Admin User</div>
                    <div className="text-xs text-gray-500 mt-1">Superadmin</div>
                  </div>
                  <span className={`material-symbols-outlined text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in origin-top-right">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2 md:hidden">
                      <div className="text-sm font-bold text-gray-900">Admin User</div>
                      <div className="text-xs text-gray-500">Superadmin</div>
                    </div>
                    <Link href="/admin/change-password" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      Change Password
                    </Link>
                    <Link href="/" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">public</span>
                      View Live Site
                    </Link>
                    <div className="h-px bg-gray-100 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Secure Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
