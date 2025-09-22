'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Trophy, 
  Target,
  TrendingUp,
  Calendar,
  Star,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';

// Demo data for user's lessons
const userStats = {
  totalLessons: 24,
  completedLessons: 18,
  hoursLearned: 45.5,
  currentStreak: 7,
  totalPoints: 1250,
  level: 'Intermediate',
  nextLevelPoints: 1500
};

const enrolledCourses = [
  {
    id: 'speaking-basics',
    title: 'Speaking Basics',
    progress: 75,
    totalLessons: 8,
    completedLessons: 6,
    timeSpent: '12h 30m',
    lastAccessed: '2 hours ago',
    nextLesson: 'Lesson 7: Advanced Conversations',
    difficulty: 'Beginner',
    category: 'Speaking',
    status: 'in_progress'
  },
  {
    id: 'listening-skills',
    title: 'Listening Skills',
    progress: 40,
    totalLessons: 6,
    completedLessons: 2,
    timeSpent: '8h 15m',
    lastAccessed: '1 day ago',
    nextLesson: 'Lesson 3: Context Clues',
    difficulty: 'Intermediate',
    category: 'Listening',
    status: 'in_progress'
  },
  {
    id: 'vocabulary-tour',
    title: 'Vocabulary Tour',
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    timeSpent: '25h 45m',
    lastAccessed: '3 days ago',
    nextLesson: 'Course Completed!',
    difficulty: 'Beginner',
    category: 'Vocabulary',
    status: 'completed'
  },
  {
    id: 'vocabulary-test',
    title: 'Vocabulary Test',
    progress: 60,
    totalLessons: 5,
    completedLessons: 3,
    timeSpent: '6h 20m',
    lastAccessed: '5 hours ago',
    nextLesson: 'Lesson 4: Memory Games',
    difficulty: 'All Levels',
    category: 'Testing',
    status: 'in_progress'
  }
];

const recentActivity = [
  {
    id: 1,
    action: 'Completed',
    course: 'Speaking Basics',
    lesson: 'Lesson 6: Pronunciation Practice',
    points: 50,
    time: '2 hours ago'
  },
  {
    id: 2,
    action: 'Started',
    course: 'Vocabulary Test',
    lesson: 'Lesson 3: Flashcards Review',
    points: 25,
    time: '5 hours ago'
  },
  {
    id: 3,
    action: 'Completed',
    course: 'Listening Skills',
    lesson: 'Lesson 2: Audio Comprehension',
    points: 75,
    time: '1 day ago'
  }
];

const achievements = [
  { id: 1, title: 'First Steps', description: 'Complete your first lesson', earned: true, date: '2 weeks ago' },
  { id: 2, title: 'Consistent Learner', description: '7-day learning streak', earned: true, date: '1 day ago' },
  { id: 3, title: 'Vocabulary Master', description: 'Complete a vocabulary course', earned: true, date: '3 days ago' },
  { id: 4, title: 'Speed Learner', description: 'Complete 5 lessons in one day', earned: false, date: null },
  { id: 5, title: 'Perfectionist', description: 'Score 100% on 10 quizzes', earned: false, date: null }
];

export default function MyLessonsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const handleCourseClick = (courseId: string) => {
    router.push(`/my-lessons/${courseId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case 'paused':
        return <PauseCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <RotateCcw className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-[#49BBBD] bg-clip-text text-transparent mb-2">
              My Learning Dashboard
            </h1>
            <p className="text-slate-600">Track your progress and continue your learning journey</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-6 h-6 text-[#49BBBD] mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userStats.totalLessons}</div>
                <div className="text-xs text-slate-600">Total Lessons</div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userStats.completedLessons}</div>
                <div className="text-xs text-slate-600">Completed</div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userStats.hoursLearned}h</div>
                <div className="text-xs text-slate-600">Hours Learned</div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 text-center">
                <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userStats.currentStreak}</div>
                <div className="text-xs text-slate-600">Day Streak</div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userStats.totalPoints}</div>
                <div className="text-xs text-slate-600">Points</div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{userStats.level}</div>
                <div className="text-xs text-slate-600">Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress to Next Level */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Progress to Advanced Level</h3>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {userStats.totalPoints}/{userStats.nextLevelPoints} points
                </Badge>
              </div>
              <Progress 
                value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} 
                className="h-3 mb-2" 
              />
              <p className="text-sm text-slate-600">
                {userStats.nextLevelPoints - userStats.totalPoints} points to reach Advanced level
              </p>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Continue Learning */}
                <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-[#49BBBD]" />
                      Continue Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enrolledCourses
                      .filter(course => course.status === 'in_progress')
                      .slice(0, 2)
                      .map((course) => (
                        <div key={course.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                             onClick={() => handleCourseClick(course.id)}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-slate-900">{course.title}</h4>
                            <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                              {course.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{course.nextLesson}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>{course.progress}% complete</span>
                              <span>{course.lastAccessed}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Continue <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#49BBBD] rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900">
                            <span className="font-medium">{activity.action}</span> {activity.lesson}
                          </p>
                          <p className="text-xs text-slate-500">{activity.course} • {activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          +{activity.points} pts
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* My Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} 
                        className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => handleCourseClick(course.id)}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                              {course.difficulty}
                            </Badge>
                            <Badge variant="secondary">{course.category}</Badge>
                          </div>
                        </div>
                        {getStatusIcon(course.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">Progress</span>
                          <span className="text-sm text-slate-600">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold text-slate-900">{course.completedLessons}</div>
                          <div className="text-xs text-slate-600">Completed</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-slate-900">{course.totalLessons}</div>
                          <div className="text-xs text-slate-600">Total</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-slate-900">{course.timeSpent}</div>
                          <div className="text-xs text-slate-600">Time</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <p className="text-sm text-slate-600 mb-3">
                          <span className="font-medium">Next:</span> {course.nextLesson}
                        </p>
                        <Button className="w-full" variant={course.status === 'completed' ? 'outline' : 'default'}>
                          {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Learning Activity</CardTitle>
                  <CardDescription>Your recent learning history and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-[#49BBBD]/20 rounded-lg">
                        {activity.action === 'Completed' ? 
                          <CheckCircle className="w-4 h-4 text-green-500" /> :
                          <PlayCircle className="w-4 h-4 text-blue-500" />
                        }
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{activity.lesson}</h4>
                        <p className="text-sm text-slate-600">{activity.course}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-slate-500">{activity.time}</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            +{activity.points} points
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} 
                        className={`bg-white/60 backdrop-blur-sm border-white/20 shadow-lg ${
                          achievement.earned ? 'ring-2 ring-yellow-400/50' : 'opacity-75'
                        }`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <Award className={`w-8 h-8 ${
                          achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">{achievement.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Earned {achievement.date}
                        </Badge>
                      ) : (
                        <Badge variant="outline">Not Earned</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
} 