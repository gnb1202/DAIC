import { AppSidebar } from "@/components/app-sidebar"
import { MainContent } from "@/components/main-content"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <MainContent />
    </div>
  )
}

