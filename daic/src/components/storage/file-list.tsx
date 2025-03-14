"use client"

import { useState } from "react"
import { File, Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface DataFile {
  id: string
  name: string
  description: string
  fileType: string
  createdAt: string
}

interface FileListProps {
  files: DataFile[]
  onFileSelect?: (fileIds: string[]) => void
  onFileDelete?: (fileId: string) => void
  onFileRefresh?: (fileId: string) => void
}

export function FileList({ files, onFileSelect, onFileDelete, onFileRefresh }: FileListProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)

  // 파일 선택 처리
  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) => {
      const newSelection = prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]

      // 상위 컴포넌트에 선택 변경 알림
      if (onFileSelect) {
        onFileSelect(newSelection)
      }

      return newSelection
    })
  }

  // 파일 삭제 처리
  const handleDeleteConfirm = () => {
    if (fileToDelete && onFileDelete) {
      onFileDelete(fileToDelete)
      setFileToDelete(null)
    }
  }

  // 파일 새로고침 처리
  const handleRefresh = (fileId: string) => {
    if (onFileRefresh) {
      onFileRefresh(fileId)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">저장된 데이터 파일</h2>
        <div className="text-sm text-gray-500">
          {selectedFiles.length > 0 ? `${selectedFiles.length}개 선택됨` : ""}
        </div>
      </div>

      {files.length === 0 ? (
        <div className="text-center p-8 text-gray-500">저장된 파일이 없습니다. 파일을 업로드하세요.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <Card key={file.id} className={selectedFiles.includes(file.id) ? "border-green-500" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={() => handleFileSelect(file.id)}
                      id={`file-${file.id}`}
                    />
                    <File className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleRefresh(file.id)} title="파일 다시 처리">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setFileToDelete(file.id)} title="파일 삭제">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-base">{file.name}</CardTitle>
                <CardDescription className="text-xs">
                  {new Date(file.createdAt).toLocaleString("ko-KR")}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="line-clamp-2">{file.description || "설명 없음"}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{file.fileType.toUpperCase()}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* 삭제 확인 대화상자 */}
      <Dialog open={!!fileToDelete} onOpenChange={(open) => !open && setFileToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>파일 삭제</DialogTitle>
            <DialogDescription>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFileToDelete(null)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

