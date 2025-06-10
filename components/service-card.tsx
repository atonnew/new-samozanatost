import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Eye } from "lucide-react"
import type { Service } from "@/lib/supabase"

interface ServiceCardProps {
  service: Service & {
    profiles?: {
      full_name?: string
      avatar_url?: string
      region?: string
      city?: string
    }
    categories?: {
      name: string
      icon?: string
    }
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={service.profiles?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{service.profiles?.full_name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{service.profiles?.full_name || "Аноним"}</p>
            {(service.profiles?.city || service.profiles?.region) && (
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {service.profiles?.city || service.profiles?.region}
              </p>
            )}
          </div>
        </div>

        <Link href={`/services/${service.id}`} className="block">
          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">{service.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{service.description}</p>
        </Link>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {service.categories?.icon} {service.categories?.name}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <Eye className="w-3 h-3 mr-1" />
            {service.views_count}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full flex justify-between items-center">
          <span className="font-bold text-lg text-green-600">
            {formatPrice(service.price_from, service.price_to, service.price_type)}
          </span>
          <Link href={`/services/${service.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Подробнее →
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
