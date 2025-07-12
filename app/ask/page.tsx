"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RichTextEditor } from "@/components/editor/rich-text-editor"
import { X, Plus, HelpCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AskQuestionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    "css",
    "html",
  ]

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || tags.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and add at least one tag.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Question Posted!",
        description: "Your question has been successfully posted to the community.",
      })

      router.push("/questions")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ask a Question</h1>
        <p className="text-muted-foreground">Get help from the community by asking a clear, detailed question.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Question Title
                </CardTitle>
                <CardDescription>Be specific and imagine you're asking a question to another person.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="e.g., How to implement authentication in Next.js 14?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                  required
                />
                <div className="text-sm text-muted-foreground mt-2">{title.length}/150 characters</div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Question Details</CardTitle>
                <CardDescription>
                  Provide all the details someone would need to understand and answer your question.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Describe your problem in detail. Include what you've tried and what you expected to happen..."
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Add up to 5 tags to describe what your question is about.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Add Tag Input */}
                  {tags.length < 5 && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag(newTag)
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => addTag(newTag)} disabled={!newTag.trim()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Popular Tags */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Popular tags:</Label>
                    <div className="flex flex-wrap gap-2">
                      {popularTags
                        .filter((tag) => !tags.includes(tag))
                        .slice(0, 8)
                        .map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50"
                            onClick={() => addTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Difficulty */}
            <Card>
              <CardHeader>
                <CardTitle>Difficulty Level</CardTitle>
                <CardDescription>Help others understand the complexity of your question.</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Posting..." : "Post Question"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Writing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium mb-1">Be specific</h4>
                <p className="text-muted-foreground">
                  Include exact error messages, code snippets, and expected behavior.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Show your work</h4>
                <p className="text-muted-foreground">Explain what you've already tried and what didn't work.</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Use proper formatting</h4>
                <p className="text-muted-foreground">
                  Format code blocks and use clear headings to organize your question.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Search for existing questions first</p>
              <p>• Be respectful and constructive</p>
              <p>• Provide minimal reproducible examples</p>
              <p>• Accept helpful answers</p>
              <p>• Follow up with solutions you find</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
