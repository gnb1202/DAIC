"use client"
import { ChatInterface } from "@/components/chat/chat-interface"

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">데이터 분석 대시보드</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <ChatInterface />
        </div>
      </main>
    </div>
  )
}

