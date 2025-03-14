import { AppSidebar } from "@/components/app-sidebar"
import { StorageContent } from "@/components/storage/storage-content"

export default function StoragePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <StorageContent />
    </div>
  )
}

