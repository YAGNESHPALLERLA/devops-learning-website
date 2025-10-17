'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, loading, updateProfile, signOut } = useAuth()
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in')
    }
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name)
    }
  }, [user, loading, router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)

    const { error } = await updateProfile({
      full_name: fullName,
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    }
    setUpdating(false)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500 mb-4">
            My Profile
          </h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-800 p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-rose-500 to-red-600 rounded-full text-white text-3xl font-bold mb-4">
                  {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {user.user_metadata?.full_name || 'User'}
                </h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>

              {/* Account Info */}
              <div className="space-y-4 mb-6">
                <div className="bg-[#0f0f0f] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Account Status</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1"></span>
                      Active
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="flex justify-between py-1">
                      <span>Email Verified:</span>
                      <span className="text-white">
                        {user.email_confirmed_at ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Member Since:</span>
                      <span className="text-white">
                        {new Date(user.created_at || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full bg-red-500/10 text-red-400 border border-red-500/50 font-semibold py-3 px-4 rounded-lg hover:bg-red-500/20 transition-all"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Sign Out
                </span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

              {message && (
                <div className={`mb-6 ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border-red-500/50 text-red-400'} border px-4 py-3 rounded-lg flex items-start`}>
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {message.type === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    )}
                  </svg>
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back to Home
                  </Link>
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold py-3 px-8 rounded-lg hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-all shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>

              {/* Additional Sections */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/tutorials"
                    className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-4 hover:border-rose-500/50 transition-all group"
                  >
                    <svg className="w-6 h-6 text-rose-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <h4 className="font-semibold text-white group-hover:text-rose-400 transition-colors">My Courses</h4>
                    <p className="text-sm text-gray-400 mt-1">Continue learning</p>
                  </Link>

                  <Link
                    href="/jobs"
                    className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-4 hover:border-rose-500/50 transition-all group"
                  >
                    <svg className="w-6 h-6 text-rose-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <h4 className="font-semibold text-white group-hover:text-rose-400 transition-colors">Job Opportunities</h4>
                    <p className="text-sm text-gray-400 mt-1">Find your dream job</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

