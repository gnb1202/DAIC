import type React from "react"
import { Input } from "@/components/ui/input"

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function ChatInput({ ...props }: ChatInputProps) {
  return (
    <Input className="flex-1 rounded-l-lg border-gray-300 focus:ring-green-500 focus:border-green-500" {...props} />
  )
}

