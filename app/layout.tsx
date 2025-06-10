import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ФрилансРФ - Платформа для самозанятых",
  description: "Найдите лучших самозанятых специалистов в России",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">ФрилансРФ</h3>
                <p className="text-gray-400">
                  Платформа для поиска квалифицированных самозанятых специалистов в России
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Для клиентов</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/services" className="hover:text-white">
                      Найти услугу
                    </a>
                  </li>
                  <li>
                    <a href="/freelancers" className="hover:text-white">
                      Исполнители
                    </a>
                  </li>
                  <li>
                    <a href="/how-it-works" className="hover:text-white">
                      Как это работает
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Для исполнителей</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/auth/register?type=freelancer" className="hover:text-white">
                      Стать исполнителем
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="hover:text-white">
                      Личный кабинет
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Поддержка</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/support" className="hover:text-white">
                      Помощь
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-white">
                      Контакты
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 ФрилансРФ. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
