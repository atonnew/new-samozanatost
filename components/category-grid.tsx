import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/supabase"

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  // Проверка на пустые категории
  if (!categories || categories.length === 0) {
    return <div className="text-center text-gray-500">Категории не найдены</div>
  }

  // Отладочный вывод для проверки содержимого
  console.log("Categories:", categories)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/services?category=${category.slug}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">{category.icon || "🔍"}</div>
              <h3 className="font-medium text-sm">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
