import type { NextRequest } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const description = formData.get("description") as string

    if (!file) {
      return new Response(JSON.stringify({ error: "파일이 제공되지 않았습니다." }), { status: 400 })
    }

    // 파일 유형 확인
    const fileType = file.name.split(".").pop()?.toLowerCase()

    if (!["xml", "csv", "json"].includes(fileType || "")) {
      return new Response(
        JSON.stringify({ error: "지원되지 않는 파일 형식입니다. XML, CSV, JSON 파일만 지원됩니다." }),
        { status: 400 },
      )
    }

    // 파일 내용 읽기
    const content = await file.text()

    // 실제 구현에서는 데이터베이스에 저장하고 처리
    console.log(`파일 "${file.name}" 업로드됨, 크기: ${content.length} 바이트`)
    console.log(`설명: ${description || "(없음)"}`)

    // 임시 응답
    return new Response(
      JSON.stringify({
        success: true,
        message: "파일이 업로드되었습니다.",
        fileId: Date.now().toString(),
      }),
      { status: 200 },
    )
  } catch (error) {
    console.error("파일 업로드 오류:", error)
    return new Response(JSON.stringify({ error: "파일 업로드 중 오류가 발생했습니다." }), { status: 500 })
  }
}

