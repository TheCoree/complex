"use client"

import { usePathname } from "next/navigation"
import { COURSES } from "@/lib/courses"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function LessonNavigation() {
  const pathname = usePathname()
  
  if (pathname === "/lessons") return null
  
  const currentIndex = COURSES.findIndex(c => pathname.startsWith(c.href))
  if (currentIndex === -1) return null

  const prev = currentIndex > 0 ? COURSES[currentIndex - 1] : null
  const next = currentIndex < COURSES.length - 1 ? COURSES[currentIndex + 1] : null

  return (
    <div className="mt-20 pt-8 border-t border-border/20 flex flex-row items-start justify-between not-prose gap-4 font-sans">
      <div className="flex-1 flex justify-start">
        {prev && (
          <a href={prev.href} className="group inline-flex flex-col items-start gap-1">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Предыдущий
            </span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {prev.title}
            </span>
          </a>
        )}
      </div>

      <div className="flex-1 flex justify-center pt-2">
        <a href="/lessons" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Все уроки
        </a>
      </div>

      <div className="flex-1 flex justify-end">
        {next && (
          <a href={next.href} className="group inline-flex flex-col items-end gap-1">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Следующий
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors text-right">
              {next.title}
            </span>
          </a>
        )}
      </div>
    </div>
  )
}
