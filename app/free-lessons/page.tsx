import { Header } from "@/components/header"
import { Card, CardContent} from "@/components/ui/card"
import { Footer } from "react-day-picker"
export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Free Lessons Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Free Lessons
          </h1>
        </div>

        {/* Lesson Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Speaking Card */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <CardContent className="p-8 h-48 flex items-end justify-center">
              <h3 className="text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                Speaking
              </h3>
            </CardContent>
          </Card>

          {/* Listening Card */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <CardContent className="p-8 h-48 flex items-end justify-center">
              <h3 className="text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                Listening
              </h3>
            </CardContent>
          </Card>

          {/* Vocabulary Tour Card */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <CardContent className="p-8 h-48 flex items-end justify-center">
              <h3 className="text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                Vocabulary tour
              </h3>
            </CardContent>
          </Card>

          {/* Vocabulary Test Card */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <CardContent className="p-8 h-48 flex items-end justify-center">
              <h3 className="text-xl font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                Vocabulary test
              </h3>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
