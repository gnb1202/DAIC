/**
 * AI 응답에서 JSON 데이터 추출
 */
export function extractJSONFromResponse(text: string): any | null {
    try {
      // JSON 코드 블록 찾기
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  
      if (jsonMatch && jsonMatch[1]) {
        // JSON 파싱
        return JSON.parse(jsonMatch[1].trim())
      }
  
      // 일반 텍스트에서 JSON 객체 찾기
      const jsonObjectMatch = text.match(/\{[\s\S]*\}/)
  
      if (jsonObjectMatch) {
        return JSON.parse(jsonObjectMatch[0])
      }
  
      return null
    } catch (error) {
      console.error("JSON 추출 오류:", error)
      return null
    }
  }
  
  /**
   * 시각화 데이터 추출 및 검증
   */
  export function extractVisualizationData(text: string): {
    type: string
    title: string
    data: any[]
  } | null {
    try {
      const json = extractJSONFromResponse(text)
  
      if (!json) return null
  
      // 필수 필드 검증
      if (!json.type || !json.title || !Array.isArray(json.data)) {
        return null
      }
  
      // 지원되는 차트 유형 검증
      const supportedTypes = ["bar", "line", "pie"]
  
      if (!supportedTypes.includes(json.type)) {
        json.type = "bar" // 기본값으로 설정
      }
  
      return {
        type: json.type,
        title: json.title,
        data: json.data,
      }
    } catch (error) {
      console.error("시각화 데이터 추출 오류:", error)
      return null
    }
  }
  
  