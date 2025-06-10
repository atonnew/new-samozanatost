"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import type { Category } from "@/lib/supabase"

interface SearchFormProps {
  categories: Category[]
}

const REGIONS = [
  "Москва",
  "Санкт-Петербург",
  "Московская область",
  "Краснодарский край",
  "Ростовская область",
  "Свердловская область",
  "Новосибирская область",
  "Татарстан",
  "Челябинская область",
  "Нижегородская область",
]

export default function SearchForm({ categories }: SearchFormProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [region, setRegion] = useState("all")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (category !== "all") params.set("category", category)
    if (region !== "all") params.set("region", region)

    router.push(`/services?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Что вы ищете?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Регион" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все регионы</SelectItem>
            {REGIONS.map((reg) => (
              <SelectItem key={reg} value={reg}>
                {reg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full mt-4 h-12" size="lg">
        <Search className="w-5 h-5 mr-2" />
        Найти
      </Button>
    </form>
  )
}
