"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      // 실제 API 호출 (현재는 임시 처리)
      // 실제 구현에서는 /api/upload 엔드포인트 호출
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 성공 처리
      alert(`파일 "${file.name}"이(가) 업로드되었습니다.`)
      setFile(null)
      setDescription("")

      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error)
      alert("파일 업로드 중 오류가 발생했습니다.")
    } finally {
      setIsUploading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>데이터 파일 업로드</CardTitle>
        <CardDescription>XML, CSV 또는 JSON 형식의 데이터 파일을 업로드하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">파일 선택</Label>
            <div className="flex items-center gap-2">
              <Input
                ref={fileInputRef}
                id="file"
                type="file"
                accept=".xml,.csv,.json"
                onChange={handleFileChange}
                className="flex-1"
              />
              {file && (
                <Button variant="ghost" size="icon" onClick={clearFile} title="파일 지우기">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {file && (
            <div className="space-y-2">
              <Label htmlFor="description">파일 설명 (선택사항)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="파일에 대한 설명을 입력하세요"
              />
            </div>
          )}

          <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
            {isUploading ? (
              "업로드 중..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> 파일 업로드
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

