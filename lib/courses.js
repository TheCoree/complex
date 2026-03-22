import { BookOpen, CalculatorIcon, Zap, Grid3x3, TrendingUp, Shapes } from "lucide-react"

export const COURSES = [
  { id: 1, icon: BookOpen, title: "Введение", desc: "Основы комплексных чисел", href: "/lessons/lesson-1" },
  { id: 2, icon: CalculatorIcon, title: "Основные операции", desc: "Сложение, вычитание, умножение", href: "/lessons/lesson-2" },
  { id: 3, icon: Zap, title: "Алгебраическая форма", desc: "Работа с a + bi представлением", href: "/lessons/lesson-3" },
  { id: 4, icon: Grid3x3, title: "Тригонометрическая форма", desc: "Полярные координаты и модуль", href: "/lessons/lesson-4" },
  { id: 5, icon: TrendingUp, title: "Показательная форма", desc: "Великая формула Эйлера", href: "/lessons/lesson-5" },
  { id: 6, icon: Shapes, title: "Геометрия", desc: "Визуализация и геометрический смысл", href: "/lessons/lesson-6" },
]
