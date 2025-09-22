'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Headphones, 
  MessageSquare, 
  Brain,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

// Demo data for free lessons
const freeLessons = [
  {
    id: 'speaking-basics',
    title: 'Speaking Basics',
    description: 'Learn fundamental speaking skills with interactive exercises',
    icon: MessageSquare,
    duration: '15 min',
    lessons: 8,
    difficulty: 'Beginner',
    progress: 75,
    rating: 4.8,
    students: 1234,
    topics: ['Pronunciation', 'Basic Conversations', 'Greetings'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'listening-skills',
    title: 'Listening Skills',
    description: 'Improve your listening comprehension with audio exercises',
    icon: Headphones,
    duration: '20 min',
    lessons: 6,
    difficulty: 'Intermediate',
    progress: 40,
    rating: 4.6,
    students: 987,
    topics: ['Audio Comprehension', 'Accent Recognition', 'Context Clues'],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'vocabulary-tour',
    title: 'Vocabulary Tour',
    description: 'Explore essential vocabulary through interactive tours',
    icon: BookOpen,
    duration: '25 min',
    lessons: 12,
    difficulty: 'Beginner',
    progress: 90,
    rating: 4.9,
    students: 2156,
    topics: ['Daily Vocabulary', 'Business Terms', 'Academic Words'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'vocabulary-test',
    title: 'Vocabulary Test',
    description: 'Test your vocabulary knowledge with adaptive quizzes',
    icon: Brain,
    duration: '10 min',
    lessons: 5,
    difficulty: 'All Levels',
    progress: 60,
    rating: 4.7,
    students: 1543,
    topics: ['Quiz Mode', 'Flashcards', 'Memory Games'],
    color: 'from-orange-500 to-orange-600'
  }
];

const difficultyColors = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-yellow-100 text-yellow-800',
  'Advanced': 'bg-red-100 text-red-800',
  'All Levels': 'bg-blue-100 text-blue-800'
};

export default function FreeLessonsPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleLessonClick = (lessonId: string) => {
    router.push(`/my-lessons/${lessonId}`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#49BBBD]/20 to-blue-500/20 rounded-full px-6 py-2 mb-6">
              <Star className="w-5 h-5 text-[#49BBBD]" />
              <span className="text-sm font-medium text-slate-700">100% Free Content</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-[#49BBBD] bg-clip-text text-transparent mb-6">
              Free Lessons
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Start your learning journey with our collection of free interactive lessons. 
              No payment required - just sign up and start learning today!
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#49BBBD]">31</div>
                <div className="text-sm text-slate-600">Free Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#49BBBD]">5,920</div>
                <div className="text-sm text-slate-600">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#49BBBD]">4.8★</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {freeLessons.map((lesson) => {
              const IconComponent = lesson.icon;
              return (
                <Card 
                  key={lesson.id}
                  className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  onMouseEnter={() => setHoveredCard(lesson.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleLessonClick(lesson.id)}
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${lesson.color}`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${lesson.color} text-white shadow-lg`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-slate-900 group-hover:text-[#49BBBD] transition-colors">
                            {lesson.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="secondary" className={difficultyColors[lesson.difficulty as keyof typeof difficultyColors]}>
                              {lesson.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {lesson.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {lesson.progress > 0 && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">{lesson.progress}%</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {lesson.description}
                    </CardDescription>

                    {/* Progress Bar */}
                    {lesson.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">Progress</span>
                          <span className="text-sm text-slate-600">{lesson.progress}% Complete</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                      </div>
                    )}

                    {/* Lesson Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Clock className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                        <div className="text-sm font-medium text-slate-700">{lesson.duration}</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <BookOpen className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                        <div className="text-sm font-medium text-slate-700">{lesson.lessons} Lessons</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Users className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                        <div className="text-sm font-medium text-slate-700">{lesson.students.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-slate-700">Topics Covered:</span>
                      <div className="flex flex-wrap gap-2">
                        {lesson.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className={`w-full bg-gradient-to-r ${lesson.color} hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLessonClick(lesson.id);
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {lesson.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        hoveredCard === lesson.id ? 'translate-x-1' : ''
                      }`} />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-[#49BBBD]/10 to-blue-500/10 border-[#49BBBD]/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready for More?</h3>
                <p className="text-slate-600 mb-6">
                  Unlock premium courses with advanced features, personalized learning paths, and certificates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => router.push('/all-courses')}
                    className="bg-gradient-to-r from-[#49BBBD] to-blue-500 hover:from-[#3da5a7] hover:to-blue-600"
                  >
                    Browse All Courses
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/my-lessons')}
                    className="border-[#49BBBD] text-[#49BBBD] hover:bg-[#49BBBD] hover:text-white"
                  >
                    View My Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
