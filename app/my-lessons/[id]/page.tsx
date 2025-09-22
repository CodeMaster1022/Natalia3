'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { 
  Play, 
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  Clock, 
  BookOpen, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Download,
  Share2,
  MessageSquare,
  ThumbsUp,
  Eye,
  Award,
  Target
} from 'lucide-react';

// Demo lesson data
const lessonData: { [key: string]: any } = {
  'speaking-basics': {
    title: 'Speaking Basics',
    description: 'Master fundamental speaking skills with interactive exercises',
    instructor: 'Dr. Sarah Johnson',
    duration: '45 minutes',
    difficulty: 'Beginner',
    rating: 4.8,
    students: 1234,
    lessons: [
      {
        id: 1,
        title: 'Introduction to Speaking',
        duration: '8:30',
        completed: true,
        type: 'video'
      },
      {
        id: 2,
        title: 'Pronunciation Basics',
        duration: '12:15',
        completed: true,
        type: 'interactive'
      },
      {
        id: 3,
        title: 'Common Greetings',
        duration: '6:45',
        completed: true,
        type: 'video'
      },
      {
        id: 4,
        title: 'Practice Session 1',
        duration: '10:20',
        completed: true,
        type: 'quiz'
      },
      {
        id: 5,
        title: 'Conversation Starters',
        duration: '15:30',
        completed: true,
        type: 'video'
      },
      {
        id: 6,
        title: 'Role Play Exercise',
        duration: '18:45',
        completed: true,
        type: 'interactive'
      },
      {
        id: 7,
        title: 'Advanced Conversations',
        duration: '22:10',
        completed: false,
        type: 'video',
        current: true
      },
      {
        id: 8,
        title: 'Final Assessment',
        duration: '25:00',
        completed: false,
        type: 'quiz'
      }
    ],
    currentLesson: {
      id: 7,
      title: 'Advanced Conversations',
      description: 'Learn how to maintain longer conversations and express complex ideas clearly.',
      videoUrl: '/placeholder-video.mp4',
      duration: '22:10',
      transcript: `Welcome to Advanced Conversations. In this lesson, we'll explore techniques for maintaining engaging dialogues and expressing complex thoughts with clarity and confidence.

First, let's discuss the importance of active listening in conversations. Active listening involves not just hearing the words, but understanding the context and emotions behind them.

Key points to remember:
1. Ask follow-up questions
2. Use appropriate body language
3. Show genuine interest
4. Provide relevant responses

Practice these techniques in your daily conversations to see immediate improvement in your communication skills.`,
      keyPoints: [
        'Active listening techniques',
        'Maintaining conversation flow',
        'Expressing complex ideas',
        'Non-verbal communication',
        'Cultural awareness in conversations'
      ],
      quiz: [
        {
          question: 'What is the most important aspect of active listening?',
          options: [
            'Speaking loudly',
            'Understanding context and emotions',
            'Interrupting frequently',
            'Looking at your phone'
          ],
          correct: 1
        },
        {
          question: 'Which of these helps maintain conversation flow?',
          options: [
            'Asking follow-up questions',
            'Changing the topic abruptly',
            'Speaking only about yourself',
            'Avoiding eye contact'
          ],
          correct: 0
        }
      ]
    }
  },
  'listening-skills': {
    title: 'Listening Skills',
    description: 'Improve comprehension with audio exercises and practice sessions',
    instructor: 'Prof. Michael Chen',
    duration: '35 minutes',
    difficulty: 'Intermediate',
    rating: 4.6,
    students: 987,
    lessons: [
      { id: 1, title: 'Introduction to Listening', duration: '5:30', completed: true, type: 'video' },
      { id: 2, title: 'Audio Comprehension', duration: '12:15', completed: true, type: 'interactive' },
      { id: 3, title: 'Context Clues', duration: '8:45', completed: false, type: 'video', current: true },
      { id: 4, title: 'Accent Recognition', duration: '10:20', completed: false, type: 'interactive' },
      { id: 5, title: 'Practice Test', duration: '15:30', completed: false, type: 'quiz' },
      { id: 6, title: 'Final Assessment', duration: '20:00', completed: false, type: 'quiz' }
    ],
    currentLesson: {
      id: 3,
      title: 'Context Clues',
      description: 'Learn to understand meaning through context when you don\'t know every word.',
      videoUrl: '/placeholder-video.mp4',
      duration: '8:45'
    }
  }
};

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id as string;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState('content');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const lesson = lessonData[lessonId];
  
  useEffect(() => {
    if (!lesson) {
      router.push('/my-lessons');
    }
  }, [lesson, router]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Lesson Not Found</h2>
          <Button onClick={() => router.push('/my-lessons')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Lessons
          </Button>
        </div>
      </div>
    );
  }

  const completedLessons = lesson.lessons.filter((l: any) => l.completed).length;
  const totalLessons = lesson.lessons.length;
  const progress = (completedLessons / totalLessons) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
  };

  const getCorrectAnswers = () => {
    if (!lesson.currentLesson.quiz) return 0;
    return quizAnswers.reduce((correct, answer, index) => {
      return answer === lesson.currentLesson.quiz[index].correct ? correct + 1 : correct;
    }, 0);
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'interactive':
        return <MessageSquare className="w-4 h-4" />;
      case 'quiz':
        return <Target className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
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
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/my-lessons')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Lessons
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getDifficultyColor(lesson.difficulty)}>
                {lesson.difficulty}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{lesson.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <Eye className="w-4 h-4" />
                {lesson.students.toLocaleString()} students
              </div>
            </div>
          </div>

          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{lesson.title}</h1>
            <p className="text-slate-600 mb-4">{lesson.description}</p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {lesson.duration}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {totalLessons} lessons
              </div>
              <span>Instructor: {lesson.instructor}</span>
            </div>
          </div>

          {/* Progress */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Course Progress</h3>
                <span className="text-sm font-medium text-slate-600">
                  {completedLessons}/{totalLessons} lessons completed
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-slate-600 mt-2">{Math.round(progress)}% complete</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Video Player */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg mb-6">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-slate-900 rounded-t-lg overflow-hidden">
                    {/* Placeholder Video Player */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors"
                             onClick={handlePlayPause}>
                          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{lesson.currentLesson.title}</h3>
                        <p className="text-white/80">{lesson.currentLesson.duration}</p>
                      </div>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-4">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={handlePlayPause}>
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <div className="flex-1 mx-4">
                          <Progress value={30} className="h-1" />
                        </div>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lesson Info */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{lesson.currentLesson.title}</h2>
                    <p className="text-slate-600 mb-4">{lesson.currentLesson.description}</p>
                    <div className="flex items-center gap-4">
                      <Button className="bg-gradient-to-r from-[#49BBBD] to-blue-500">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Complete
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lesson Content Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle>Key Learning Points</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {lesson.currentLesson.keyPoints?.map((point: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#49BBBD] rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-700">{point}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transcript" className="mt-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle>Lesson Transcript</CardTitle>
                      <CardDescription>Full text of the lesson content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-slate max-w-none">
                        <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                          {lesson.currentLesson.transcript}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quiz" className="mt-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle>Knowledge Check</CardTitle>
                      <CardDescription>Test your understanding of the lesson</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {lesson.currentLesson.quiz?.map((question: any, qIndex: number) => (
                        <div key={qIndex} className="space-y-4">
                          <h4 className="font-semibold text-slate-900">
                            Question {qIndex + 1}: {question.question}
                          </h4>
                          <div className="space-y-2">
                            {question.options.map((option: string, oIndex: number) => (
                              <div key={oIndex} className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  id={`q${qIndex}_o${oIndex}`}
                                  name={`question_${qIndex}`}
                                  value={oIndex}
                                  onChange={() => {
                                    const newAnswers = [...quizAnswers];
                                    newAnswers[qIndex] = oIndex;
                                    setQuizAnswers(newAnswers);
                                  }}
                                  className="w-4 h-4 text-[#49BBBD]"
                                />
                                <label 
                                  htmlFor={`q${qIndex}_o${oIndex}`}
                                  className={`cursor-pointer ${
                                    showQuizResults 
                                      ? oIndex === question.correct 
                                        ? 'text-green-600 font-medium' 
                                        : quizAnswers[qIndex] === oIndex 
                                          ? 'text-red-600' 
                                          : 'text-slate-700'
                                      : 'text-slate-700'
                                  }`}
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {!showQuizResults ? (
                        <Button 
                          onClick={handleQuizSubmit}
                          disabled={quizAnswers.length !== lesson.currentLesson.quiz?.length}
                          className="bg-gradient-to-r from-[#49BBBD] to-blue-500"
                        >
                          Submit Quiz
                        </Button>
                      ) : (
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h4 className="font-semibold text-slate-900 mb-2">Quiz Results</h4>
                          <p className="text-slate-700">
                            You got {getCorrectAnswers()} out of {lesson.currentLesson.quiz?.length} questions correct!
                          </p>
                          {getCorrectAnswers() === lesson.currentLesson.quiz?.length && (
                            <div className="flex items-center gap-2 mt-2 text-green-600">
                              <Award className="w-4 h-4" />
                              <span className="font-medium">Perfect score! Well done!</span>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle>My Notes</CardTitle>
                      <CardDescription>Add your personal notes for this lesson</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <textarea
                        className="w-full h-48 p-4 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-[#49BBBD] focus:border-transparent"
                        placeholder="Write your notes here..."
                      />
                      <Button className="mt-4 bg-gradient-to-r from-[#49BBBD] to-blue-500">
                        Save Notes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Course Lessons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lesson.lessons.map((lessonItem: any, index: number) => (
                    <div
                      key={lessonItem.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        lessonItem.current 
                          ? 'bg-[#49BBBD]/20 border-2 border-[#49BBBD]/30' 
                          : lessonItem.completed 
                            ? 'bg-green-50 hover:bg-green-100' 
                            : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded ${
                          lessonItem.completed ? 'bg-green-500' : lessonItem.current ? 'bg-[#49BBBD]' : 'bg-slate-400'
                        }`}>
                          {lessonItem.completed ? 
                            <CheckCircle className="w-4 h-4 text-white" /> :
                            getLessonTypeIcon(lessonItem.type)
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium text-sm ${
                            lessonItem.current ? 'text-[#49BBBD]' : 'text-slate-900'
                          }`}>
                            {lessonItem.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1">{lessonItem.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
