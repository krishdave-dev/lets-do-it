import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, MessageSquare, Award } from "lucide-react"

export default function HomePage() {
  const stats = [
    { label: "Questions", value: "1,234", icon: MessageSquare },
    { label: "Users", value: "567", icon: Users },
    { label: "Answers", value: "2,890", icon: TrendingUp },
    { label: "Reputation", value: "45,678", icon: Award },
  ]

  const featuredQuestions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js 14?",
      author: "john_dev",
      votes: 15,
      answers: 3,
      views: 234,
      tags: ["nextjs", "authentication", "typescript"],
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "Best practices for React state management in 2024",
      author: "sarah_codes",
      votes: 28,
      answers: 7,
      views: 456,
      tags: ["react", "state-management", "redux"],
      timeAgo: "4 hours ago",
    },
    {
      id: 3,
      title: "How to optimize database queries in PostgreSQL?",
      author: "db_expert",
      votes: 42,
      answers: 12,
      views: 789,
      tags: ["postgresql", "optimization", "database"],
      timeAgo: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-blue-600">StackIt</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A community-driven Q&A platform where developers help developers. Ask questions, share knowledge, and build
            your reputation.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/questions">Browse Questions</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/ask">Ask Question</Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Questions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Questions</h2>
          <div className="space-y-6">
            {featuredQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        <Link href={`/questions/${question.id}`} className="hover:text-blue-600 transition-colors">
                          {question.title}
                        </Link>
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex gap-4">
                      <span>{question.votes} votes</span>
                      <span>{question.answers} answers</span>
                      <span>{question.views} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>by {question.author}</span>
                      <span>•</span>
                      <span>{question.timeAgo}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Join the Community</CardTitle>
              <CardDescription>
                Start asking questions, sharing knowledge, and building your developer reputation today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
