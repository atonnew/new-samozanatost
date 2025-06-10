import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">Услуга не найдена</h1>
        <p className="text-gray-600 mb-6">Возможно, услуга была удалена или вы перешли по неверной ссылке</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/services">Все услуги</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
