"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RichTextEditor } from "@/components/editor/rich-text-editor"
import { ArrowUp, ArrowDown, Bookmark, Share, Flag, MessageSquare, Eye, Calendar, Check, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newAnswer, setNewAnswer] = useState("")
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false)

  // Mock question data - in real app this would come from API
  const question = {
    id: Number.parseInt(params.id),
    title: "How to implement authentication in Next.js 14 with App Router?",
    content: `
      <p>I'm trying to implement authentication in my Next.js 14 application using the new App Router. I've been looking at various approaches but I'm confused about the best practices.</p>
      
      <p>Here's what I've tried so far:</p>
      
      <pre><code>// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for auth token
  const token = request.cookies.get('auth-token')
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}</code></pre>

      <p>But I'm not sure if this is the right approach. What are the current best practices for:</p>
      
      <ul>
        <li>JWT token storage and validation</li>
        <li>Protecting API routes</li>
        <li>Server-side authentication checks</li>
        <li>Client-side route protection</li>
      </ul>
      
      <p>Any guidance would be greatly appreciated!</p>
    `,
    author: {
      name: "john_dev",
      avatar: "/placeholder-user.jpg",
      reputation: 1234,
      joinDate: "2023-01-15",
      badges: ["Contributor", "Question Asker"],
    },
    votes: 15,
    views: 234,
    answers: 3,
    tags: ["nextjs", "authentication", "typescript", "app-router"],
    timeAgo: "2 hours ago",
    createdAt: "2024-01-15T10:30:00Z",
    difficulty: "intermediate",
    isBookmarked: false,
  }

  const answers = [
    {
      id: 1,
      content: `
        <p>Great question! For Next.js 14 with App Router, I recommend using a combination of server actions and middleware. Here's a comprehensive approach:</p>
        
        <h3>1. JWT Token Management</h3>
        <pre><code>// lib/auth.ts
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch {
    return null
  }
}

export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) return null
  
  return await verifyToken(token)
}</code></pre>

        <h3>2. Middleware for Route Protection</h3>
        <pre><code>// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}</code></pre>

        <p>This approach gives you both server-side protection and good performance. The key is using server actions for authentication logic and middleware for route protection.</p>
      `,
      author: {
        name: "auth_expert",
        avatar: "/placeholder-user.jpg",
        reputation: 5678,
        badges: ["Expert", "Top Contributor"],
      },
      votes: 23,
      timeAgo: "1 hour ago",
      isAccepted: true,
      isUserVoted: null,
    },
    {
      id: 2,
      content: `
        <p>I'd also recommend looking into NextAuth.js (now Auth.js) for a more complete solution:</p>
        
        <pre><code>// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Your authentication logic here
        const user = await authenticateUser(credentials)
        return user ? { id: user.id, email: user.email } : null
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  }
})

export { handler as GET, handler as POST }</code></pre>

        <p>This handles a lot of the complexity for you and integrates well with the App Router.</p>
      `,
      author: {
        name: "nextjs_dev",
        avatar: "/placeholder-user.jpg",
        reputation: 3456,
        badges: ["Contributor"],
      },
      votes: 12,
      timeAgo: "45 minutes ago",
      isAccepted: false,
      isUserVoted: null,
    },
  ]

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null)
      toast({
        title: "Vote removed",
        description: "Your vote has been removed.",
      })
    } else {
      setUserVote(type)
      toast({
        title: `Vote ${type === "up" ? "up" : "down"}`,
        description: `You voted ${type === "up" ? "up" : "down"} on this question.`,
      })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Question bookmarked",
      description: isBookmarked ? "Question removed from bookmarks." : "Question added to your bookmarks.",
    })
  }

  const handleAnswerSubmit = async () => {
    if (!newAnswer.trim()) {
      toast({
        title: "Empty Answer",
        description: "Please write an answer before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingAnswer(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Answer Posted!",
        description: "Your answer has been posted successfully.",
      })

      setNewAnswer("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post answer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingAnswer(false)
    }
  }

  const handleAnswerVote = (answerId: number, type: "up" | "down") => {
    toast({
      title: `Vote ${type === "up" ? "up" : "down"}`,
      description: `You voted ${type === "up" ? "up" : "down"} on this answer.`,
    })
  }

  const handleAcceptAnswer = (answerId: number) => {
    toast({
      title: "Answer Accepted",
      description: "This answer has been marked as the accepted solution.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Question Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Asked {question.timeAgo}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{question.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{question.answers} answers</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Question Content */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Vote Controls */}
                <div className="flex flex-col items-center gap-2">
                  <Button variant={userVote === "up" ? "default" : "ghost"} size="sm" onClick={() => handleVote("up")}>
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-medium">{question.votes}</span>
                  <Button
                    variant={userVote === "down" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVote("down")}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleBookmark}>
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                  <div
                    className="prose prose-sm max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: question.content }}
                  />

                  {/* Question Actions */}
                  <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag
                    </Button>
                  </div>

                  {/* Author Info */}
                  <div className="flex justify-end">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">asked {question.timeAgo}</div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
                          <AvatarFallback>{question.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{question.author.name}</div>
                          <div className="text-sm text-muted-foreground">{question.author.reputation} reputation</div>
                          <div className="flex gap-1 mt-1">
                            {question.author.badges.map((badge) => (
                              <Badge key={badge} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answers Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">{answers.length} Answers</h2>

            <div className="space-y-6">
              {answers.map((answer) => (
                <Card
                  key={answer.id}
                  className={
                    answer.isAccepted
                      ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10"
                      : ""
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Vote Controls */}
                      <div className="flex flex-col items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleAnswerVote(answer.id, "up")}>
                          <ArrowUp className="h-5 w-5" />
                        </Button>
                        <span className="text-lg font-medium">{answer.votes}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleAnswerVote(answer.id, "down")}>
                          <ArrowDown className="h-5 w-5" />
                        </Button>
                        {answer.isAccepted && (
                          <div className="mt-2">
                            <Check className="h-6 w-6 text-green-600" />
                          </div>
                        )}
                        {!answer.isAccepted && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAcceptAnswer(answer.id)}
                            className="mt-2"
                          >
                            <Check className="h-5 w-5" />
                          </Button>
                        )}
                      </div>

                      {/* Answer Content */}
                      <div className="flex-1">
                        {answer.isAccepted && (
                          <div className="flex items-center gap-2 mb-4 text-green-600">
                            <Award className="h-4 w-4" />
                            <span className="text-sm font-medium">Accepted Answer</span>
                          </div>
                        )}

                        <div
                          className="prose prose-sm max-w-none mb-6"
                          dangerouslySetInnerHTML={{ __html: answer.content }}
                        />

                        {/* Answer Actions */}
                        <div className="flex items-center gap-4 mb-4">
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Flag className="h-4 w-4 mr-2" />
                            Flag
                          </Button>
                        </div>

                        {/* Author Info */}
                        <div className="flex justify-end">
                          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-2">answered {answer.timeAgo}</div>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={answer.author.avatar || "/placeholder.svg"}
                                  alt={answer.author.name}
                                />
                                <AvatarFallback>{answer.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{answer.author.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {answer.author.reputation} reputation
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {answer.author.badges.map((badge) => (
                                    <Badge key={badge} variant="outline" className="text-xs">
                                      {badge}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add Answer Section */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Your Answer</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RichTextEditor
                  content={newAnswer}
                  onChange={setNewAnswer}
                  placeholder="Write your answer here. Be specific and provide examples when possible..."
                />
                <div className="flex gap-4">
                  <Button onClick={handleAnswerSubmit} disabled={isSubmittingAnswer}>
                    {isSubmittingAnswer ? "Posting..." : "Post Your Answer"}
                  </Button>
                  <Button variant="outline" onClick={() => setNewAnswer("")}>
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Question Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Question Stats</h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Asked</span>
                <span>{question.timeAgo}</span>
              </div>
              <div className="flex justify-between">
                <span>Viewed</span>
                <span>{question.views} times</span>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <span>1 hour ago</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty</span>
                <Badge variant="secondary" className="text-xs">
                  {question.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Related Questions */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Related Questions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Next.js 14 middleware best practices",
                "JWT vs Session authentication in React",
                "Protecting API routes in Next.js",
                "Server-side authentication with App Router",
              ].map((title, index) => (
                <Link
                  key={index}
                  href={`/questions/${index + 10}`}
                  className="block text-sm text-blue-600 hover:underline"
                >
                  {title}
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Hot Network Questions */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Hot Network Questions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Why is React 18 concurrent rendering important?",
                "Best practices for TypeScript in 2024",
                "How to optimize PostgreSQL queries?",
                "Understanding Docker containers",
              ].map((title, index) => (
                <Link
                  key={index}
                  href={`/questions/${index + 20}`}
                  className="block text-sm text-blue-600 hover:underline"
                >
                  {title}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
