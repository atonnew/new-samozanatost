import { Suspense } from "react"
import { supabase } from "@/lib/supabase"
import ServiceCard from "@/components/service-card"
import SearchForm from "@/components/search-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

async function getServices(searchParams: any) {
  if (!supabase) {
    // ИСПРАВЛЕНО: Добавляем демо-данные вместо пустого массива
    return [
      {
        id: 1,
        title: "Создание сайта-визитки",
        description:
          "Разработаю современный сайт-визитку для вашего бизнеса. Адаптивный дизайн, быстрая загрузка, SEO-оптимизация. Включает: дизайн, верстку, настройку хостинга.",
        price_from: 15000,
        price_to: 25000,
        price_type: "project" as const,
        views_count: 156,
        created_at: "2024-01-15",
        city: "Москва",
        region: "Москва",
        profiles: {
          full_name: "Алексей Петров",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Москва",
          region: "Москва",
        },
        categories: {
          name: "Веб-разработка",
          icon: "💻",
        },
      },
      {
        id: 2,
        title: "Логотип и фирменный стиль",
        description:
          "Создам уникальный логотип и фирменный стиль для вашей компании. Несколько вариантов на выбор, все исходники, руководство по использованию.",
        price_from: 8000,
        price_to: 15000,
        price_type: "project" as const,
        views_count: 89,
        created_at: "2024-01-14",
        city: "Санкт-Петербург",
        region: "Санкт-Петербург",
        profiles: {
          full_name: "Мария Иванова",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Санкт-Петербург",
          region: "Санкт-Петербург",
        },
        categories: {
          name: "Дизайн",
          icon: "🎨",
        },
      },
      {
        id: 3,
        title: "Копирайтинг для сайта",
        description:
          "Напишу продающие тексты для вашего сайта. Опыт работы более 5 лет, портфолио по запросу. Работаю с любыми тематиками.",
        price_from: 500,
        price_to: 1500,
        price_type: "hourly" as const,
        views_count: 234,
        created_at: "2024-01-13",
        city: "Екатеринбург",
        region: "Свердловская область",
        profiles: {
          full_name: "Елена Смирнова",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Екатеринбург",
          region: "Свердловская область",
        },
        categories: {
          name: "Копирайтинг",
          icon: "✍️",
        },
      },
      {
        id: 4,
        title: "SMM продвижение",
        description:
          "Ведение социальных сетей, создание контента, настройка рекламы в Instagram и ВКонтакте. Увеличение охватов и продаж.",
        price_from: 20000,
        price_to: 40000,
        price_type: "project" as const,
        views_count: 67,
        created_at: "2024-01-12",
        city: "Новосибирск",
        region: "Новосибирская область",
        profiles: {
          full_name: "Дмитрий Козлов",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Новосибирск",
          region: "Новосибирская область",
        },
        categories: {
          name: "Маркетинг",
          icon: "📈",
        },
      },
      {
        id: 5,
        title: "Интернет-магазин на WordPress",
        description:
          "Создание полнофункционального интернет-магазина на WordPress + WooCommerce. Настройка платежей, доставки, админ-панели.",
        price_from: 35000,
        price_to: 60000,
        price_type: "project" as const,
        views_count: 203,
        created_at: "2024-01-11",
        city: "Москва",
        region: "Москва",
        profiles: {
          full_name: "Алексей Петров",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Москва",
          region: "Москва",
        },
        categories: {
          name: "Веб-разработка",
          icon: "💻",
        },
      },
      {
        id: 6,
        title: "Дизайн мобильного приложения",
        description:
          "UI/UX дизайн мобильного приложения. Создание пользовательских сценариев, wireframes, финальный дизайн всех экранов.",
        price_from: 25000,
        price_to: 45000,
        price_type: "project" as const,
        views_count: 145,
        created_at: "2024-01-10",
        city: "Санкт-Петербург",
        region: "Санкт-Петербург",
        profiles: {
          full_name: "Мария Иванова",
          avatar_url: "/placeholder.svg?height=40&width=40",
          city: "Санкт-Петербург",
          region: "Санкт-Петербург",
        },
        categories: {
          name: "Дизайн",
          icon: "🎨",
        },
      },
    ]
  }

  let query = supabase
    .from("services")
    .select(`
      *,
      categories(name, icon)
    `)
    .eq("is_active", true)

  // Фильтры
  if (searchParams.q) {
    query = query.ilike("title", `%${searchParams.q}%`)
  }

  if (searchParams.category && searchParams.category !== "all") {
    const { data: category } = await supabase.from("categories").select("id").eq("slug", searchParams.category).single()
    if (category) {
      query = query.eq("category_id", category.id)
    }
  }

  if (searchParams.region && searchParams.region !== "all") {
    query = query.eq("region", searchParams.region)
  }

  const { data: services } = await query.order("created_at", { ascending: false })

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
    ]
  }

  const { data: categories } = await supabase.from("categories").select("*").eq("is_active", true).order("name")
  return categories || []
}

interface ServicesPageProps {
  searchParams: {
    q?: string
    category?: string
    region?: string
  }
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const [services, categories] = await Promise.all([getServices(searchParams), getCategories()])

  const activeFilters = Object.entries(searchParams).filter(
    ([key, value]) => value && value !== "all" && key !== "page",
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Каталог услуг</h1>
          <p className="text-gray-600">Найдите подходящего специалиста для вашего проекта</p>
        </div>

        {/* Форма поиска */}
        <div className="mb-8">
          <Suspense fallback={<div>Загрузка...</div>}>
            <SearchForm categories={categories} />
          </Suspense>
        </div>

        {/* Активные фильтры */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Активные фильтры:</span>
              {activeFilters.map(([key, value]) => (
                <Badge key={key} variant="secondary" className="text-xs">
                  {key === "q" && `Поиск: ${value}`}
                  {key === "category" && `Категория: ${value}`}
                  {key === "region" && `Регион: ${value}`}
                </Badge>
              ))}
              <Button asChild variant="ghost" size="sm">
                <Link href="/services">Очистить фильтры</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Результаты */}
        <div className="mb-6">
          <p className="text-gray-600">
            Найдено услуг: <span className="font-semibold">{services.length}</span>
          </p>
        </div>

        {/* Сетка услуг */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Услуги не найдены</h3>
            <p className="text-gray-600 mb-4">Попробуйте изменить параметры поиска</p>
            <Button asChild>
              <Link href="/services">Показать все услуги</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
