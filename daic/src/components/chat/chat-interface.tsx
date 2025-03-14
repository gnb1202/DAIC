"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { MessageItem } from "./message-item"
import { ChatInput } from "./chat-input"

// 임시 메시지 데이터
const initialMessages = [{ id: "1", role: "assistant", content: "안녕하세요, 무엇을 도와드릴까요?" }]

interface ChatInterfaceProps {
  sessionId?: string
  selectedFileIds?: string[]
}

export function ChatInterface({ sessionId, selectedFileIds = [] }: ChatInterfaceProps = {}) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // 새 메시지가 추가될 때 스크롤 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 메시지 전송 처리
  const handleSend = async () => {
    if (!input.trim()) return

    // 사용자 메시지 추가
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // 실제 API 호출 (현재는 임시 응답)
      // 실제 구현에서는 /api/chat 엔드포인트 호출
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 임시 응답 (실제 구현에서는 API 응답 사용)
      const botResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `"${input}"에 대한 응답입니다. 이 부분은 실제 AI 응답으로 대체됩니다.`,
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("메시지 전송 오류:", error)
      // 오류 처리
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>응답 생성 중...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex space-x-2"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="메시지를 입력하세요..."
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  )
}

