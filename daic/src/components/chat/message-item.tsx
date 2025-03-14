interface Message {
    id: string
    role: string
    content: string
  }
  
  interface MessageItemProps {
    message: Message
  }
  
  export function MessageItem({ message }: MessageItemProps) {
    const isUser = message.role === "user"
  
    return (
      <div className={`flex items-end ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`rounded-lg py-2 px-4 max-w-xs ${
            isUser ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {message.content}
        </div>
      </div>
    )
  }
  
  