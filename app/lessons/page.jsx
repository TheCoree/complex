import { COURSES } from "@/lib/courses"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Все уроки | Complex",
  description: "Полный интерактивный курс по комплексным числам",
}

export default function LessonsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto not-prose">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Курс: Комплексные числа</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Пошаговое интерактивное руководство от базовых понятий до геометрических трансформаций комплексной плоскости.
        </p>
      </div>

      <div className="grid gap-6">
        {COURSES.map((course, index) => {
          const Icon = course.icon
          return (
            <a 
              key={course.id} 
              href={course.href}
              className="group relative flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-[2rem] bg-accent/5 hover:bg-accent/10 transition-all border border-border/40 hover:border-primary/20 overflow-hidden"
            >
              {/* Декоративная цифра на фоне */}
              <div className="absolute -right-6 -bottom-10 text-[180px] font-bold text-muted-foreground/[0.03] select-none pointer-events-none group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700">
                {course.id}
              </div>

              <div className="w-16 h-16 shrink-0 rounded-2xl bg-background border border-border/50 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                <Icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />
              </div>

              <div className="flex-1 space-y-1.5 relative z-10">
                <div className="text-sm font-medium text-primary/80">
                  Урок {index + 1}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">{course.title}</h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{course.desc}</p>
              </div>

              <div className="mt-2 sm:mt-0 flex-shrink-0 relative z-10">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors px-4 py-2 rounded-full bg-background/50 border border-border/30">
                  <span>Пройти урок</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
