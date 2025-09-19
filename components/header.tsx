"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/10 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#49BBBD]" />
            </div>
            <span className="text-2xl font-bold text-white">GEORGE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-8 xl:space-x-12">
              <Link href="/" className="text-white hover:text-orange-400 transition-colors text-lg font-medium">
                Home
              </Link>
              <Link href="#" className="text-white hover:text-orange-400 transition-colors text-lg font-medium">
                English Courses
              </Link>
              <Link href="/free-lessons" className="text-white hover:text-orange-400 transition-colors text-lg font-medium">
                Free Lessons
              </Link>
              <Link href="#" className="text-white hover:text-orange-400 transition-colors text-lg font-medium">
                About Us
              </Link>
              <Link href="#" className="text-white hover:text-orange-400 transition-colors text-lg font-medium">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-6 py-2.5 rounded-full text-white border-2 border-white/30 hover:border-white hover:bg-white hover:text-[#49BBBD] font-semibold transition-all duration-300" onClick={() => router.push('/auth')}>
              Login
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white text-[#49BBBD] hover:bg-orange-400 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" onClick={() => router.push('/auth')}>
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative w-10 h-10 text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute inset-0 flex items-center justify-center">
              {isMenuOpen ? (
                <X className="w-6 h-6 animate-spin-once" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-[280px] bg-gradient-to-br from-[#49BBBD] to-[#3FA9AB] shadow-2xl transform transition-transform duration-300 ease-in-out">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#49BBBD]" />
                </div>
                <span className="text-xl font-bold text-white">GEORGE</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col p-4">
              <nav className="space-y-2">
                <Link href="/" className="block px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors text-lg font-medium">
                  Home
                </Link>
                <Link href="#" className="block px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors text-lg font-medium">
                  English Courses
                </Link>
                <Link href="/free-lessons" className="block px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors text-lg font-medium">
                  Free Lessons
                </Link>
                <Link href="#" className="block px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors text-lg font-medium">
                  About Us
                </Link>
                <Link href="#" className="block px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors text-lg font-medium">
                  Contact Us
                </Link>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full px-6 py-3 rounded-full text-white border-2 border-white/30 hover:border-white hover:bg-white hover:text-[#49BBBD] font-semibold transition-all duration-300" onClick={() => router.push('/auth')}>
                  Login
                </button>
                <button className="w-full px-6 py-3 rounded-full bg-white text-[#49BBBD] hover:bg-orange-400 hover:text-white font-semibold transition-all duration-300 shadow-lg" onClick={() => router.push('/auth')}>
                  Sign Up
                </button>
              </div>

              {/* Mobile Menu Footer */}
              <div className="mt-auto pt-8 text-center">
                <p className="text-white/70 text-sm">
                  © 2024 GEORGE. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
