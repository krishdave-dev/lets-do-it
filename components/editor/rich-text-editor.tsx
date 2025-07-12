"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, Underline, List, ListOrdered, Link, Code, Quote, Undo, Redo } from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState({
    bold: false,
    italic: false,
    underline: false,
  })

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateContent()
    updateActiveStates()
  }

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const updateActiveStates = () => {
    setIsActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault()
          handleCommand("bold")
          break
        case "i":
          e.preventDefault()
          handleCommand("italic")
          break
        case "u":
          e.preventDefault()
          handleCommand("underline")
          break
      }
    }
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      handleCommand("createLink", url)
    }
  }

  const insertCodeBlock = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      const codeElement = document.createElement("code")
      codeElement.className = "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
      codeElement.textContent = selectedText || "code"

      range.deleteContents()
      range.insertNode(codeElement)

      updateContent()
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-muted/50 p-2">
        <div className="flex items-center gap-1 flex-wrap">
          <Button
            type="button"
            variant={isActive.bold ? "default" : "ghost"}
            size="sm"
            onClick={() => handleCommand("bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={isActive.italic ? "default" : "ghost"}
            size="sm"
            onClick={() => handleCommand("italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={isActive.underline ? "default" : "ghost"}
            size="sm"
            onClick={() => handleCommand("underline")}
          >
            <Underline className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("insertUnorderedList")}>
            <List className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("insertOrderedList")}>
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button type="button" variant="ghost" size="sm" onClick={insertLink}>
            <Link className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={insertCodeBlock}>
            <Code className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("formatBlock", "blockquote")}>
            <Quote className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("undo")}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleCommand("redo")}>
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none"
        onInput={updateContent}
        onKeyUp={updateActiveStates}
        onMouseUp={updateActiveStates}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        style={{
          "--placeholder-color": "#9ca3af",
        }}
        suppressContentEditableWarning
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: var(--placeholder-color);
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
