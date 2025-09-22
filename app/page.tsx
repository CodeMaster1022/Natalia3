import { Header } from "@/components/header"
import { FloatingCards } from "@/components/floating-cards"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, ArrowRight, BookOpen, Users, Award, FileText, Calendar, UserCheck, Grid3X3, Square, Eye, CheckCircle, X, Send, Star, Download, Volume2, MessageCircle, CalendarDays, FastForward } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import studentImage from "@/public/image/student.png"
import bookImage from "@/public/image/book.png"
import authImage from "@/public/image/auth.png"
import registerImage from "@/public/image/register.png"
import teacherImage from "@/public/image/teacher.png"
import childImage from "@/public/image/child.png"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#49BBBD] to-[#3FA9AB] relative overflow-hidden">
      <Header />

      <main className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)]">
            {/* Left Content - Text Section */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  <span className="text-orange-400 inline-block animate-pulse">Studying</span>{" "}
                  <span className="inline-block">Online is</span>
                  <br />
                  <span className="inline-block">now much easier</span>
                </h1>
                
                <p className="text-md sm:text-lg lg:text-xl text-white/90 max-w-xl mx-auto lg:mx-0">
                  GEORGE is an interesting platform that will teach you in more an interactive way
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <Link href="/auth">
                  <button className="group bg-white text-[#49BBBD] rounded-full font-semibold hover:bg-orange-400 hover:text-white px-8 py-4 text-lg w-full sm:w-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span className="flex items-center justify-center gap-2">
                      Join for free
                    </span>
                  </button>
                </Link>

                <Link href="/dashboard">
                  <button className="group flex items-center justify-center gap-3 text-white hover:text-orange-400 transition-all duration-300 w-full sm:w-auto">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 text-[#49BBBD] ml-1" fill="currentColor" />
                    </div>
                    <span className="text-lg font-medium">Watch how it works</span>
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">80K+</div>
                  <div className="text-sm text-white/80">Students</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">150+</div>
                  <div className="text-sm text-white/80">Courses</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">9.5k</div>
                  <div className="text-sm text-white/80">Reviews</div>
                </div>
              </div>
            </div>

            {/* Right Content - Image Section */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                <Image
                  src={studentImage}
                  alt="Student studying online"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">250+ Courses</div>
                    <div className="text-sm text-gray-600">Available now</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#49BBBD] rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Expert Teachers</div>
                    <div className="text-sm text-gray-600">Learn from pros</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <FloatingCards />
      </main>
    </div>
  )
}
