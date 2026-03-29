"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, Moon, Sun, BookOpen, Calculator, Zap, Grid3x3, TrendingUp, Shapes, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { COURSES as courses } from "@/lib/courses"
import Link from "next/link"

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false)
  const timeoutRef = useRef(null)
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    console.log("[v0] Mobile menu state:", isMobileMenuOpen)
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsCoursesOpen(true)
  }
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCoursesOpen(false)
    }, 150)
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">Complex</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
              Главная
            </Link>
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1">
                Обучение
                <ChevronDown className={`h-4 w-4 transition-transform ${isCoursesOpen ? "rotate-180" : ""}`} />
              </button>
              {isCoursesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-background/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl p-5 opacity-100 transition-opacity duration-200">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Основной курс
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {courses.map((course) => {
                      const Icon = course.icon
                      return (
                        <a
                          key={course.id}
                          href={course.href}
                          className="relative block px-3 py-2.5 rounded-lg hover:bg-accent/10 transition-colors border border-border/50 group"
                        >
                          <div className="absolute top-2 right-2 text-4xl font-bold text-muted-foreground/10 leading-none">
                            {String(course.id).padStart(2, "0")}
                          </div>
                          <Icon className="h-4 w-4 text-primary mb-1.5" />
                          <div className="font-medium text-sm mb-0.5">{course.title}</div>
                          <div className="text-xs text-muted-foreground">{course.desc}</div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            <Link href="/lessons" className="text-sm font-medium hover:text-accent transition-colors">
              Все уроки
            </Link>
            <Link href="/calculator" className="text-sm font-medium hover:text-accent transition-colors">
              Калькулятор
            </Link>
            <Link href="/examples" className="text-sm font-medium hover:text-accent transition-colors">
              Примеры
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Переключить тему</span>
              </Button>
            )}
            <Button asChild className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/lessons">Начать изучение</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed h-screen inset-x-0 top-16 bottom-0 bg-background border-t border-border z-[160] overflow-y-scroll">
          <div className="container mx-auto px-5 py-7">
            <div className="flex flex-col gap-6">
              <a
                href="#home"
                className="text-lg font-medium hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Главная
              </a>
              <div>
                <button
                  className="text-lg font-medium hover:text-accent transition-colors flex items-center justify-between w-full py-2"
                  onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                >
                  Обучение
                  <ChevronDown className={`h-5 w-5 transition-transform ${isMobileCoursesOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileCoursesOpen && (
                  <div className="mt-4 space-y-3 pl-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Основной курс
                    </h3>
                    {courses.map((course) => {
                      const Icon = course.icon
                      return (
                        <a
                          key={course.id}
                          href={course.href}
                          className="block p-4 rounded-xl bg-accent/5 border border-border/50 hover:bg-accent/10 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-3xl font-bold text-muted-foreground/20 leading-none min-w-[40px]">
                              {String(course.id).padStart(2, "0")}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="h-4 w-4 text-primary" />
                                <div className="font-medium">{course.title}</div>
                              </div>
                              <div className="text-sm text-muted-foreground">{course.desc}</div>
                            </div>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
              <a
                href="/lessons"
                className="text-lg font-medium hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Все уроки
              </a>
              <a
                href="/calculator"
                className="text-lg font-medium hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Калькулятор
              </a>
              <a
                href="#examples"
                className="text-lg font-medium hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Примеры
              </a>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/lessons">Начать изучение</Link>
              </Button>
            </div>
          </div>
          <div className="h-24"></div>
        </div>
      )}
    </nav>
  )
}
