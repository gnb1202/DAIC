DEPENDENCY
```
-핵심 의존성 설치
npm install next react react-dom typescript

-UI 라이브러리 설치
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn@latest init

-shadcn/ui 컴포넌트 설치
npx shadcn@latest add button card input dialog dropdown-menu sidebar

-AI 및 데이터 관련 패키지 설치
npm install ai @ai-sdk/openai recharts

-데이터베이스 관련 패키지 설치
npm install prisma @prisma/client
npx prisma init
```

edit local .env file for replacing API KEYS.


run the development server:
```
bash
npm run dev
 or
yarn dev
 or
pnpm dev
 or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
