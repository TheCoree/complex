"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Lightbulb, TrendingUp, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Features() {
  const [visibleItems, setVisibleItems] = useState([])
  const observerRef = useRef(null)

  const features = [
    {
      icon: BookOpen,
      title: "Интуитивная теория",
      description: "Понятные объяснения сложных концепций без лишней математической строгости",
    },
    {
      icon: Lightbulb,
      title: "Практические примеры",
      description: "Реальные применения комплексных чисел в физике, инженерии и обработке сигналов",
    },
    {
      icon: TrendingUp,
      title: "Пошаговое обучение",
      description: "От основ до продвинутых тем с постепенным увеличением сложности",
    },
    {
      icon: Zap,
      title: "Живые вычисления",
      description: "Экспериментируйте с формулами и мгновенно видите результаты",
    },
  ]

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index
            setVisibleItems((prev) => [...new Set([...prev, Number.parseInt(index)])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = document.querySelectorAll(".feature-item")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <section id="examples" className="py-32 lg:py-40">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-balance leading-tight">Почему это важно</h2>
            <p className="text-xl lg:text-2xl text-foreground/60 max-w-3xl font-light leading-relaxed">
              Комплексные числа — мощный инструмент для решения реальных задач в науке и технике
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-20 mb-32">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`feature-item transition-all duration-700 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 translate-y-12 blur-sm"
                  }`}
                  data-index={index}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 transition-all duration-300">
                    <Icon className="h-6 w-6 text-accent transition-transform" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-semibold mb-4 transition-colors">{feature.title}</h3>
                  <p className="text-lg text-foreground/60 leading-relaxed font-light">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="relative p-16 lg:p-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden transition-transform duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] transition-opacity" />
            <div className="relative max-w-3xl">
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight" style={{ fontFamily: "var(--font-paplane)" }}>
                Готовы погрузиться в мир комплексных чисел?
              </h3>
              <p className="text-xl opacity-90 mb-8 leading-relaxed font-light">
                Начните свое путешествие с интерактивных уроков
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-7 rounded-full h-auto transition-all duration-300"
              >
                Начать обучение
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
