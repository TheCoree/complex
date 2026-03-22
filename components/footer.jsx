import { Github, Mail, Globe } from "lucide-react"

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
                <a href="#" className="hover:text-foreground transition-colors">
                  Введение
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Алгебраическая форма
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Тригонометрическая форма
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Показательная форма
                </a>
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
                <a href="/calculator" className="hover:text-foreground transition-colors">
                  Калькулятор
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Примеры задач
                </a>
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
                  href="https://github.com/corede"
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
            <span className="text-foreground font-medium hover:text-accent transition-colors cursor-pointer">
              corede
            </span>
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
