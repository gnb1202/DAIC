import { PrismaClient } from "@prisma/client"

// PrismaClient 인스턴스 생성 (개발 환경에서 중복 방지)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

