"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ArrowUp, ArrowDown, MessageSquare, Eye, Bookmark, Plus } from "lucide-react"

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterTag, setFilterTag] = useState("")

  const questions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js 14 with App Router?",
      content:
        "I'm trying to implement authentication in my Next.js 14 application using the new App Router. What's the best approach for handling JWT tokens and protecting routes?",
      author: {
        name: "john_dev",
        avatar: "/placeholder-user.jpg",
        reputation: 1234,
      },
      votes: 15,
      answers: 3,
      views: 234,
      tags: ["nextjs", "authentication", "typescript", "app-router"],
      timeAgo: "2 hours ago",
      isBookmarked: false,
      difficulty: "intermediate",
    },
    {
      id: 2,
      title: "Best practices for React state management in 2024",
      content:
        "With so many state management solutions available (Redux, Zustand, Jotai, etc.), what are the current best practices for managing state in React applications?",
      author: {
        name: "sarah_codes",
        avatar: "/placeholder-user.jpg",
        reputation: 2567,
      },
      votes: 28,
      answers: 7,
      views: 456,
      tags: ["react", "state-management", "redux", "zustand"],
      timeAgo: "4 hours ago",
      isBookmarked: true,
      difficulty: "advanced",
    },
    {
      id: 3,
      title: "How to optimize database queries in PostgreSQL?",
      content:
        "My PostgreSQL queries are running slowly on large datasets. What are some effective strategies for optimizing query performance?",
      author: {
        name: "db_expert",
        avatar: "/placeholder-user.jpg",
        reputation: 3456,
      },
      votes: 42,
      answers: 12,
      views: 789,
      tags: ["postgresql", "optimization", "database", "performance"],
      timeAgo: "1 day ago",
      isBookmarked: false,
      difficulty: "advanced",
    },
    {
      id: 4,
      title: "Understanding TypeScript generics with practical examples",
      content:
        "I'm struggling to understand TypeScript generics. Can someone provide practical examples of when and how to use them effectively?",
      author: {
        name: "ts_learner",
        avatar: "/placeholder-user.jpg",
        reputation: 567,
      },
      votes: 8,
      answers: 2,
      views: 123,
      tags: ["typescript", "generics", "javascript"],
      timeAgo: "3 hours ago",
      isBookmarked: false,
      difficulty: "beginner",
    },
  ]

  const popularTags = [
    "javascript",
    "react",
    "nextjs",
    "typescript",
    "nodejs",
    "python",
    "postgresql",
    "mongodb",
    "authentication",
    "api",
  ]

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !filterTag || question.tags.includes(filterTag)
    return matchesSearch && matchesTag
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes
      case "answers":
        return b.answers - a.answers
      case "views":
        return b.views - a.views
      default:
        return 0 // newest would require actual dates
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">All Questions</h1>
            <Button asChild>
              <Link href="/ask">
                <Plus className="h-4 w-4 mr-2" />
                Ask Question
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="votes">Most Votes</SelectItem>
                <SelectItem value="answers">Most Answers</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Questions List */}
          <div className="space-y-4">
            {sortedQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        <Link href={`/questions/${question.id}`} className="hover:text-blue-600 transition-colors">
                          {question.title}
                        </Link>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{question.content}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-blue-100"
                            onClick={() => setFilterTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{question.votes}</span>
                      <Button variant="ghost" size="sm">
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{question.answers} answers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{question.views} views</span>
                      </div>
                      <Badge
                        variant={
                          question.difficulty === "beginner"
                            ? "default"
                            : question.difficulty === "intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {question.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm">
                        <Bookmark className={`h-4 w-4 ${question.isBookmarked ? "fill-current" : ""}`} />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
                          <AvatarFallback>{question.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium">{question.author.name}</div>
                          <div className="text-muted-foreground">
                            {question.author.reputation} rep • {question.timeAgo}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination would go here */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">1</Button>
              <Button>2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => setFilterTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Questions</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Answers</span>
                  <span className="font-medium">2,890</span>
                </div>
                <div className="flex justify-between">
                  <span>Users</span>
                  <span className="font-medium">567</span>
                </div>
                <div className="flex justify-between">
                  <span>Tags</span>
                  <span className="font-medium">89</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
