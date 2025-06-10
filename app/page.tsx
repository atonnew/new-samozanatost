import { Suspense } from "react"
import { supabase } from "@/lib/supabase"
import SearchForm from "@/components/search-form"
import ServiceCard from "@/components/service-card"
import CategoryGrid from "@/components/category-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getServices() {
  // Если Supabase не настроен, возвращаем демо-данные
  if (!supabase) {
    return [
      {
        id: 1,
        title: "Создание сайта-визитки",
        description:
          "Разработаю современный сайт-визитку для вашего бизнеса. Адаптивный дизайн, быстрая загрузка, SEO-оптимизация.",
        price_from: 15000,
        price_to: 25000,
        price_type: "project" as const,
        views_count: 156,
        created_at: "2024-01-15",
        profiles: {
          full_name: "Алексей Петров",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Москва",
        },
        categories: {
          name: "Веб-разработка",
          icon: "💻",
        },
      },
      {
        id: 2,
        title: "Логотип и фирменный стиль",
        description: "Создам уникальный логотип и фирменный стиль для вашей компании. Несколько вариантов на выбор.",
        price_from: 8000,
        price_to: 15000,
        price_type: "project" as const,
        views_count: 89,
        created_at: "2024-01-14",
        profiles: {
          full_name: "Мария Иванова",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Санкт-Петербург",
        },
        categories: {
          name: "Дизайн",
          icon: "🎨",
        },
      },
      {
        id: 3,
        title: "Копирайтинг для сайта",
        description: "Напишу продающие тексты для вашего сайта. Опыт работы более 5 лет, портфолио по запросу.",
        price_from: 500,
        price_to: 1500,
        price_type: "hourly" as const,
        views_count: 234,
        created_at: "2024-01-13",
        profiles: {
          full_name: "Елена Смирнова",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Екатеринбург",
        },
        categories: {
          name: "Копирайтинг",
          icon: "✍️",
        },
      },
      {
        id: 4,
        title: "SMM продвижение",
        description: "Ведение социальных сетей, создание контента, настройка рекламы в Instagram и ВКонтакте.",
        price_from: 20000,
        price_to: 40000,
        price_type: "project" as const,
        views_count: 67,
        created_at: "2024-01-12",
        profiles: {
          full_name: "Дмитрий Козлов",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Новосибирск",
        },
        categories: {
          name: "Маркетинг",
          icon: "📈",
        },
      },
    ]
  }

  const { data: services } = await supabase
    .from("services")
    .select(`
      *,
      categories(name, icon)
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8)

  // Добавляем фиктивные данные профилей для демонстрации
  const servicesWithProfiles = (services || []).map((service, index) => ({
    ...service,
    profiles: {
      full_name: ["Алексей Петров", "Мария Иванова", "Елена Смирнова", "Дмитрий Козлов"][index % 4],
      avatar_url: "/placeholder.svg?height=40&width=40",
      city: service.city,
      region: service.region,
    },
  }))

  return servicesWithProfiles
}

async function getCategories() {
  // Если Supabase не настроен, возвращаем демо-данные
  if (!supabase) {
    return [
      { id: 1, name: "Веб-разработка", slug: "web-development", icon: "💻", is_active: true, created_at: "2024-01-01" },
      { id: 2, name: "Дизайн", slug: "design", icon: "🎨", is_active: true, created_at: "2024-01-01" },
      { id: 3, name: "Копирайтинг", slug: "copywriting", icon: "✍️", is_active: true, created_at: "2024-01-01" },
      { id: 4, name: "Маркетинг", slug: "marketing", icon: "📈", is_active: true, created_at: "2024-01-01" },
      { id: 5, name: "Переводы", slug: "translation", icon: "🌐", is_active: true, created_at: "2024-01-01" },
      { id: 6, name: "Фотография", slug: "photography", icon: "📸", is_active: true, created_at: "2024-01-01" },
      { id: 7, name: "Видеомонтаж", slug: "video-editing", icon: "🎬", is_active: true, created_at: "2024-01-01" },
      { id: 8, name: "Консультации", slug: "consulting", icon: "💼", is_active: true, created_at: "2024-01-01" },
      { id: 9, name: "Репетиторство", slug: "tutoring", icon: "📚", is_active: true, created_at: "2024-01-01" },
      {
        id: 10,
        name: "Красота и здоровье",
        slug: "beauty-health",
        icon: "💆",
        is_active: true,
        created_at: "2024-01-01",
      },
    ]
  }

  const { data: categories } = await supabase.from("categories").select("*").eq("is_active", true).order("name")
  return categories || []
}

export default async function HomePage() {
  const [services, categories] = await Promise.all([getServices(), getCategories()])

  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Найдите лучших самозанятых специалистов</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Платформа для поиска квалифицированных фрилансеров и самозанятых в России
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/register?type=client">Найти специалиста</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/auth/register?type=freelancer">Стать исполнителем</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Форма поиска */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div>Загрузка...</div>}>
            <SearchForm categories={categories} />
          </Suspense>
        </div>
      </section>

      {/* Популярные категории */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные категории</h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* Последние услуги */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Новые услуги</h2>
            <Button asChild variant="outline">
              <Link href="/services">Смотреть все</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Удобный поиск</h3>
              <p className="text-gray-600">Найдите нужного специалиста по региону и категории</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Проверенные исполнители</h3>
              <p className="text-gray-600">Все специалисты проходят модерацию</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Прямая связь</h3>
              <p className="text-gray-600">Общайтесь напрямую с исполнителями</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
