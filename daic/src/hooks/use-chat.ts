"use client"

import type React from "react"

import { useState, useCallback } from "react"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

interface UseChatOptions {
  api?: string
  initialMessages?: Message[]
  body?: Record<string, any>
  onResponse?: (response: Response) => void | Promise<void>
  onFinish?: (message: Message) => void | Promise<void>
  onError?: (error: Error) => void | Promise<void>
}

export function useChat({
  api = "/api/chat",
  initialMessages = [],
  body,
  onResponse,
  onFinish,
  onError,
}: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // 입력 변경 처리
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  // 메시지 전송 처리
  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault()

      if (!input.trim() || isLoading) return

      // 사용자 메시지 추가
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input,
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      setError(null)

      try {
        // API 요청
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            ...body,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}`)
        }

        if (onResponse) {
          await onResponse(response)
        }

        // 스트림 처리
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let done = false
        let botMessageContent = ""

        while (!done && reader) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading

          if (value) {
            const chunk = decoder.decode(value)
            botMessageContent += chunk
          }
        }

        // 봇 메시지 추가
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: botMessageContent,
        }

        setMessages((prev) => [...prev, botMessage])

        if (onFinish) {
          await onFinish(botMessage)
        }
      } catch (err) {
        const error = err as Error
        setError(error)

        if (onError) {
          await onError(error)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [api, body, input, isLoading, messages, onError, onFinish, onResponse],
  )

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
  }
}

