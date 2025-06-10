import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Eye, Star, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

async function getService(id: string) {
  if (!supabase) {
    // Демо-данные
    return {
      id: Number.parseInt(id),
      title: "Создание сайта-визитки",
      description:
        "Разработаю современный сайт-визитку для вашего бизнеса. Адаптивный дизайн, быстрая загрузка, SEO-оптимизация. Включает: дизайн, верстку, настройку хостинга.",
      price_from: 15000,
      price_to: 25000,
      price_type: "project" as const,
      views_count: 156,
      created_at: "2024-01-15",
      profiles: {
        full_name: "Алексей Петров",
        avatar_url: "/placeholder.svg?height=80&width=80",
        city: "Москва",
        region: "Москва",
      },
      categories: {
        name: "Веб-разработка",
        icon: "💻",
      },
    }
  }

  const { data: service } = await supabase
    .from("services")
    .select(`
      *,
      profiles!services_freelancer_id_fkey(full_name, avatar_url, region, city, phone, email),
      categories(name, icon)
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single()

  return service
}

async function getFreelancerServices(freelancerId: string, currentServiceId: string) {
  if (!supabase) return []

  const { data: services } = await supabase
    .from("services")
    .select(`
      id,
      title,
      price_from,
      price_to,
      price_type,
      categories(name, icon)
    `)
    .eq("freelancer_id", freelancerId)
    .eq("is_active", true)
    .neq("id", currentServiceId)
    .limit(3)

  return services || []
}

interface ServicePageProps {
  params: {
    id: string
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getService(params.id)

  if (!service) {
    notFound()
  }

  const otherServices = service.profiles ? await getFreelancerServices(service.freelancer_id, params.id) : []

  const formatPrice = (priceFrom?: number, priceTo?: number, priceType?: string) => {
    if (!priceFrom) return "Договорная"

    const formatNumber = (num: number) => num.toLocaleString("ru-RU")

    if (priceTo && priceTo !== priceFrom) {
      return `${formatNumber(priceFrom)} - ${formatNumber(priceTo)} ₽`
    }

    const suffix = priceType === "hourly" ? "/час" : priceType === "project" ? "/проект" : ""
    return `от ${formatNumber(priceFrom)} ₽${suffix}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Навигация */}
        <nav className="mb-6">
          <Link href="/services" className="text-blue-600 hover:text-blue-800">
            ← Назад к услугам
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная информация */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <Badge variant="secondary">
                        {service.categories?.icon} {service.categories?.name}
                      </Badge>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {service.views_count} просмотров
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(service.price_from, service.price_to, service.price_type)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h3>Описание услуги</h3>
                  <p className="whitespace-pre-line">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Информация об исполнителе */}
            <Card>
              <CardHeader>
                <CardTitle>Исполнитель</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={service.profiles?.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback>{service.profiles?.full_name?.charAt(0) || "?"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{service.profiles?.full_name || "Аноним"}</h3>
                    {(service.profiles?.city || service.profiles?.region) && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {service.profiles?.city || service.profiles?.region}
                      </p>
                    )}
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm">4.8 (23 отзыва)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Написать сообщение
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Показать телефон
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Другие услуги исполнителя */}
            {otherServices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Другие услуги исполнителя</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {otherServices.map((otherService) => (
                      <Link
                        key={otherService.id}
                        href={`/services/${otherService.id}`}
                        className="block p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <h4 className="font-medium text-sm mb-1">{otherService.title}</h4>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {otherService.categories?.icon} {otherService.categories?.name}
                          </Badge>
                          <span className="text-sm font-semibold text-green-600">
                            {formatPrice(otherService.price_from, otherService.price_to, otherService.price_type)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
