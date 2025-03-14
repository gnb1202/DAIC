"use client"

import { useState } from "react"
import { FileList } from "./file-list"
import { FileUpload } from "./file-upload"

// 임시 파일 데이터
const sampleFiles = [
  {
    id: "1",
    name: "2024년 분기별 매출.xml",
    description: "2024년 1-2분기 매출 데이터",
    fileType: "xml",
    createdAt: "2024-03-15T09:00:00Z",
  },
  {
    id: "2",
    name: "2023년 분기별 매출.xml",
    description: "2023년 전체 분기 매출 데이터",
    fileType: "xml",
    createdAt: "2024-03-10T09:00:00Z",
  },
]

export function StorageContent() {
  const [files, setFiles] = useState(sampleFiles)

  // 파일 삭제 처리
  const handleFileDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  // 파일 선택 처리
  const handleFileSelect = (fileIds: string[]) => {
    console.log("선택된 파일:", fileIds)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">데이터 저장소</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <FileUpload />

          <div className="mt-8">
            <FileList files={files} onFileSelect={handleFileSelect} onFileDelete={handleFileDelete} />
          </div>
        </div>
      </main>
    </div>
  )
}

