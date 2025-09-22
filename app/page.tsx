import { Header } from "@/components/header"
import { FloatingCards } from "@/components/floating-cards"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, ArrowRight, BookOpen, Users, Award, FileText, Calendar, UserCheck, Grid3X3, Square, Eye, CheckCircle, X, Send, Star, Download, Volume2, MessageCircle, CalendarDays, FastForward } from "lucide-react"
import Image from "next/image"
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
                  <button className="group bg-white text-[#49BBBD] rounded-full font-semibold hover:bg-orange-400 hover:text-white px-8 py-4 text-lg w-full sm:w-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span className="flex items-center justify-center gap-2">
                      Join for free
                    </span>
                  </button>

                  <button className="group flex items-center justify-center gap-3 text-white hover:text-orange-400 transition-all duration-300 w-full sm:w-auto">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 text-[#49BBBD] ml-1" fill="currentColor" />
                    </div>
                    <span className="text-lg font-medium">Watch how it works</span>
                  </button>
              </div>

              {/* Stats Section - Mobile Friendly */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">250K+</div>
                  <div className="text-sm sm:text-base text-white/80">Students</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">15+</div>
                  <div className="text-sm sm:text-base text-white/80">Courses</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">89%</div>
                  <div className="text-sm sm:text-base text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Image Section */}
            <div className="relative order-1 lg:order-2 flex items-center justify-center">
              {/* Mobile-Optimized Image Container */}
              <div className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[750px] xl:max-w-[850px] 2xl:max-w-[950px] mx-auto">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl scale-110"></div>
                
                {/* Main Student Image with Better Mobile Scaling */}
                <div className="relative z-10">
                <Image
                  src={studentImage}
                    alt="Graduate student in cap and gown"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    width={600}
                    height={900}
                  priority
                    sizes="(max-width: 640px) 400px, (max-width: 768px) 500px, (max-width: 1024px) 650px, (max-width: 1280px) 750px, (max-width: 1536px) 850px, 950px"
                    style={{
                      maxHeight: '90vh',
                      objectFit: 'contain',
                      maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                    }}
                  />
                </div>

                {/* Decorative Elements - Hidden on Small Mobile */}
                <div className="hidden sm:block">
                  {/* Top Right Decoration */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-400/20 rounded-full blur-2xl animate-pulse"></div>
                  
                  {/* Bottom Left Decoration */}
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse delay-700"></div>
                  
                  {/* Small Dots */}
                  <div className="absolute top-10 right-10 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-20 left-10 w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
                </div>
              </div>

              {/* Floating UI Cards - Responsive Positioning */}
              <FloatingCards />
            </div>
          </div>
        </div>

        {/* Curved Wave Transition */}
        <div className="relative">
          <svg 
            viewBox="0 0 1440 120" 
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0 C480,80 960,80 1440,0 L1440,120 L0,120 Z" 
              fill="white"
            />
          </svg>
        </div>

        {/* Our Success Section */}
        <section className="bg-white py-16 sm:py-20 lg:py-24 -mt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Success
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec 
                nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-16 sm:mb-20">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#49BBBD] mb-2">
                  15K+
                </div>
                <div className="text-lg sm:text-xl text-gray-700 font-medium">
                  Students
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#49BBBD] mb-2">
                  75%
                </div>
                <div className="text-lg sm:text-xl text-gray-700 font-medium">
                  Total success
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#49BBBD] mb-2">
                  35
                </div>
                <div className="text-lg sm:text-xl text-gray-700 font-medium">
                  Main questions
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#49BBBD] mb-2">
                  26
                </div>
                <div className="text-lg sm:text-xl text-gray-700 font-medium">
                  Chief experts
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#49BBBD] mb-2">
                  16
                </div>
                <div className="text-lg sm:text-xl text-gray-700 font-medium">
                  Years of experience
                </div>
              </div>
            </div>

        {/* English Courses Section */}
        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                English Courses
              </h2>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* The Fearless Fluency Club */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Course Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={authImage}
                    alt="Woman at laptop learning English"
                    fill
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-100/80 to-yellow-100/80"></div> */}
                </div>
                
                {/* Course Content */}
                <div className="bg-yellow-400 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 underline">
                    The Fearless Fluency Club
                  </h3>
                  
                  <div className="space-y-3 text-gray-800">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-gray-700" />
                      <span>Speak confidently</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-gray-700" />
                      <span>Expand your vocabulary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarDays className="w-5 h-5 text-gray-700" />
                      <span>Learn real English with fun monthly lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 30 Day Listening Challenge */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Course Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                  <Image
                    src={registerImage}
                    alt="Woman at laptop learning English"
                    fill
                    className="object-cover"
                  />
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="bg-white p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 underline">
                    30 Day Listening Challenge
                  </h3>
                  
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-3">
                      <FastForward className="w-5 h-5 text-blue-600" />
                      <span>Understand fast English</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <span>Study real conversations</span>
                    </div>
                <div className="flex items-center gap-3">
                      <CalendarDays className="w-5 h-5 text-blue-600" />
                      <span>30 daily lessons</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
          </div>
        </section>

        {/* What is GEORGE Section */}
        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gray-900">What is </span>
                <span className="text-[#49BBBD]">GEORGE?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                GEORGE is a platform that allows educators to create online classes whereby they can 
                store the course materials online; manage assignments, quizzes and exams; monitor 
                due dates; grade results and provide students with feedback all in one place.
              </p>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* For Instructors Card */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={teacherImage}
                    alt="Teacher instructing students"
                    fill
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0 bg-black/40"></div> */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                      FOR INSTRUCTORS
                    </h3>
                    <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300">
                      Start a class today
                    </button>
                  </div>
                </div>
              </div>

              {/* For Students Card */}
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={childImage}
                    alt="Child learning English"
                    fill
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0 bg-black/40"></div> */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                      FOR STUDENTS
                    </h3>
                    <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300">
                      Enter access code
                    </button>
                  </div>
                </div>
                  {/* Placeholder for students image */}

                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                      FOR STUDENTS
                    </h3>
                    <button className="bg-[#49BBBD] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3FA9AB] transition-all duration-300 shadow-lg">
                      Enter access code
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative overflow-hidden">
      {/* Background book image */}
          <div className="absolute inset-0 opacity-80">
            <Image
              src={bookImage}
              alt="Background book"
              fill
              className="object-cover"
              style={{
                objectPosition: 'center'
              }}
            />
          </div>
          
      {/* Background decorative circles */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-orange-300 rounded-full"></div>
            <div className="absolute bottom-32 left-40 w-20 h-20 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-200 rounded-full"></div>
            <div className="absolute top-60 left-1/3 w-16 h-16 bg-yellow-200 rounded-full"></div>
            <div className="absolute bottom-60 right-1/3 w-12 h-12 bg-orange-400 rounded-full"></div>
          </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-yellow-600 leading-tight text-balance">
              Download the Free E-book
            </h1>

            <p className="text-lg text-white italic leading-relaxed max-w-md">
              "5 Steps to becoming a confident English Speaker" will give you the tools you need to start speaking
              English.
            </p>

            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
            >
              SEE E-BOOK
            </Button>
          </div>

          {/* Right Content - Book Mockup */}
          <div className="flex justify-center lg:justify-end hidden md:block">
            <div className="relative">
              {/* Book shadow */}
              <div className="absolute top-4 left-4 w-80 h-96 bg-gray-300 opacity-30 rounded-r-lg transform rotate-1"></div>

              {/* Main book */}
              <div className="relative w-80 h-96 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-r-lg shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                {/* Book spine highlight */}
                <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-l-lg"></div>

                {/* Book content */}
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-700 leading-tight text-balance">
                      5 Steps To Becoming A Confident English Speaker
                    </h2>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-inner">
                    <p className="text-sm font-semibold text-gray-800 mb-2">A free ebook by Natalia</p>

                    <div className="flex items-center gap-3">
                      {/* Character illustration placeholder */}
                      <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-600 rounded-full"></div>
                      </div>

                  <div>
                        <p className="text-xs font-bold text-gray-800">SPEAK ENGLISH</p>
                        <p className="text-xs text-gray-600">WITH Natalia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
       <section className="mx-auto bg-white py-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center text-balance">
            Why these  Courses
          </h2>

          <div className="grid md:grid-cols-2 gap-8 py-16 max-w-6xl mx-auto">
       
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Learn Real English</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Step away from textbooks. Real people don't speak like that! I'll help you learn real English from
                    real English speakers!
                  </p>
                </div>
              </div>
            </div>

         
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Volume2 className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Understand Fast English</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Finally stop using subtitles and understand your favorite movies and TV shows. You will easily
                    understand conversations in English.
                  </p>
                </div>
              </div>
            </div>

          
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MessageCircle className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Speak Natural English</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Speak confidently with other course members from around the world. I welcome you to join hundreds of
                    English learners and express yourself in English.
                  </p>
                </div>
              </div>
            </div>

 
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy Using English</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Stop feeling nervous and frustrated when you forget the right words. Have fun growing your skills
                    and communicating in English.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Logo and tagline */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-12 bg-teal-500 rounded-lg flex items-center justify-center px-2">
                <span className="text-white font-bold text-lg">TORC</span>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-300">Virtual Class</p>
                <p className="text-sm text-gray-300">for Zoom</p>
              </div>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-200">Subscribe to get our Newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:border-teal-500"
              />
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8">Subscribe</Button>
            </div>
          </div>

          {/* Footer links and copyright */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
            <p className="text-sm text-gray-500">© 2025 Class Technologies Inc.</p>
          </div>
        </div>
      </footer>
        {/* <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg 
            viewBox="0 0 1440 120" 
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,40 C480,100 960,100 1440,40 L1440,120 L0,120 Z" 
              fill="white" 
              fillOpacity="0.1"
            />
          </svg>
        </div> */}
      </main>
    </div>
  )
}