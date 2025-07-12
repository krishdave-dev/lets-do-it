import { type NextRequest, NextResponse } from "next/server"

// Mock questions database
const questions = [
  {
    id: 1,
    title: "How to implement authentication in Next.js 14 with App Router?",
    content: "I'm trying to implement authentication in my Next.js 14 application...",
    authorId: 1,
    author: {
      name: "john_dev",
      avatar: "/placeholder-user.jpg",
      reputation: 1234,
    },
    votes: 15,
    answers: 3,
    views: 234,
    tags: ["nextjs", "authentication", "typescript", "app-router"],
    difficulty: "intermediate",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Best practices for React state management in 2024",
    content: "With so many state management solutions available...",
    authorId: 2,
    author: {
      name: "sarah_codes",
      avatar: "/placeholder-user.jpg",
      reputation: 2567,
    },
    votes: 28,
    answers: 7,
    views: 456,
    tags: ["react", "state-management", "redux", "zustand"],
    difficulty: "advanced",
    createdAt: "2024-01-15T06:30:00Z",
    updatedAt: "2024-01-15T06:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const tag = searchParams.get("tag")
    const sort = searchParams.get("sort") || "newest"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredQuestions = [...questions]

    // Apply search filter
    if (search) {
      filteredQuestions = filteredQuestions.filter(
        (q) =>
          q.title.toLowerCase().includes(search.toLowerCase()) ||
          q.content.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply tag filter
    if (tag) {
      filteredQuestions = filteredQuestions.filter((q) => q.tags.includes(tag))
    }

    // Apply sorting
    switch (sort) {
      case "votes":
        filteredQuestions.sort((a, b) => b.votes - a.votes)
        break
      case "answers":
        filteredQuestions.sort((a, b) => b.answers - a.answers)
        break
      case "views":
        filteredQuestions.sort((a, b) => b.views - a.views)
        break
      default: // newest
        filteredQuestions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex)

    return NextResponse.json({
      questions: paginatedQuestions,
      pagination: {
        page,
        limit,
        total: filteredQuestions.length,
        totalPages: Math.ceil(filteredQuestions.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, tags, difficulty } = await request.json()

    // Validate input
    if (!title || !content || !tags || tags.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new question (in real app, save to database)
    const newQuestion = {
      id: Date.now(),
      title,
      content,
      tags,
      difficulty: difficulty || "intermediate",
      authorId: 1, // Would get from auth token
      author: {
        name: "current_user",
        avatar: "/placeholder-user.jpg",
        reputation: 1234,
      },
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        message: "Question created successfully",
        question: newQuestion,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
