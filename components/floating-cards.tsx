import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, User, Star, Clock, TrendingUp } from "lucide-react"

export function FloatingCards() {
  return (
    <>
      {/* Student Stats Card - Top Right - Visible on larger screens */}
      <Card className="absolute -top-8 right-0 lg:right-4 xl:right-8 p-3 lg:p-4 shadow-xl animate-float hidden md:block z-20 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">250k</div>
            <div className="text-sm text-gray-600">Assisted Student</div>
          </div>
        </div>
      </Card>

      {/* Congratulations Card - Middle Right - Visible on tablets and up */}
      <Card className="absolute top-1/3 -right-4 lg:right-0 xl:right-4 p-3 lg:p-4 shadow-xl animate-float-delayed hidden lg:block z-20 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">Congratulations</div>
            <div className="text-xs text-gray-600">Your admission completed</div>
          </div>
        </div>
      </Card>

      {/* User Experience Class Card - Bottom Left - Desktop only */}
      <Card className="absolute bottom-16 -left-4 lg:left-0 xl:left-4 bg-white/95 backdrop-blur-sm p-4 shadow-xl animate-float hidden lg:block z-20 min-w-[320px]">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-gray-800">User Experience Class</div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              Today at 12:00 PM
            </div>
          </div>
        </div>
        <button className="w-full px-6 py-2.5 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Join Now
        </button>
      </Card>

      {/* Decorative floating elements for visual interest */}
      <div className="hidden lg:block">
        {/* Floating dot 1 */}
        <div className="absolute top-20 -left-8 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-400 rounded-full shadow-lg animate-bounce"></div>
        
        {/* Floating dot 2 */}
        <div className="absolute bottom-1/4 -right-8 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg animate-bounce delay-500"></div>
        
        {/* Floating dot 3 */}
        <div className="absolute top-1/2 left-8 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-md animate-pulse"></div>
      </div>
    </>
  )
}
