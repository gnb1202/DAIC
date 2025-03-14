import { openai } from "@ai-sdk/openai"

// 사용 가능한 모델 정의
export const models = {
  // OpenAI 모델
  "gpt-4o": openai("gpt-4o"),
  "gpt-4-turbo": openai("gpt-4-turbo"),
  "gpt-3.5-turbo": openai("gpt-3.5-turbo"),

  // 임베딩 모델
  "text-embedding-3-small": openai.embedding("text-embedding-3-small"),
  "text-embedding-3-large": openai.embedding("text-embedding-3-large"),
}

// 기본 모델 설정
export const defaultModel = models["gpt-4o"]
export const defaultEmbeddingModel = models["text-embedding-3-small"]

// 모델 선택 함수
export function selectModel(modelName: keyof typeof models) {
  if (!models[modelName]) {
    console.warn(`모델 ${modelName}을(를) 찾을 수 없습니다. 기본 모델을 사용합니다.`)
    return defaultModel
  }

  return models[modelName]
}

