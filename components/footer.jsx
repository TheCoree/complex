import { Github, Mail, Globe } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="font-mono text-2xl font-bold text-primary">ℂ</div>
              <span className="text-xl font-semibold">Complex</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Образовательный проект для изучения комплексных чисел через интерактивные визуализации и подробные курсы
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Обучение</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/lessons/lesson-1" className="hover:text-foreground transition-colors">
                  Введение
                </Link>
              </li>
              <li>
                <Link href="/lessons/lesson-3" className="hover:text-foreground transition-colors">
                  Алгебраическая форма
                </Link>
              </li>
              <li>
                <Link href="/lessons/lesson-4" className="hover:text-foreground transition-colors">
                  Тригонометрическая форма
                </Link>
              </li>
              <li>
                <Link href="/lessons/lesson-5" className="hover:text-foreground transition-colors">
                  Показательная форма
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ресурсы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Документация
                </a>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-foreground transition-colors">
                  Калькулятор
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  Примеры задач
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Создатель</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  corede
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TheCoree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@corede.dev"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © 2026 Complex Numbers. Создано{" "}
            <a href="https://github.com/TheCoree" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-accent transition-colors cursor-pointer">
              TheCoree
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
