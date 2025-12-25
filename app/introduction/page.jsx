import MathExpression from "@/components/MathExpression"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowUpRight, Compass, Sparkles } from "lucide-react"

export const metadata = {
  title: "Введение — Complex Numbers",
  description:
    "Быстрое введение в комплексные числа в фирменном стиле проекта: базовые формы, ключевые операции и визуальные образы.",
}

const foundations = [
  {
    title: "Алгебраическая форма",
    expression: "z = a + bi",
    note: "a — действительная часть, b — мнимая. Её удобно использовать, когда складываем или вычитаем числа.",
  },
  {
    title: "Модуль и аргумент",
    expression: "|z| = \\sqrt{a^2 + b^2}",
    note: "Модуль — расстояние до начала координат, аргумент — угол поворота относительно оси Re: arg z = atan2(b, a).",
  },
  {
    title: "Показательная форма",
    expression: "z = r \\cdot e^{i\\varphi}",
    note: "r = |z|, \\varphi = arg z. В этой форме умножение превращается в сложение аргументов, а деление — в их разность.",
  },
]

const operations = [
  {
    title: "Сложение как сумма векторов",
    expression: "(a+bi)+(c+di) = (a+c) + (b+d)i",
    detail: "На плоскости это параллелограмм: соединяем хвосты и складываем координаты.",
  },
  {
    title: "Умножение через модули и аргументы",
    expression: "(r_1 e^{i\\varphi_1})(r_2 e^{i\\varphi_2}) = r_1 r_2 e^{i(\\varphi_1+\\varphi_2)}",
    detail: "Модули перемножаем, аргументы — складываем. Поэтому комплексные числа так удобны для поворотов.",
  },
  {
    title: "Сопряжение",
    expression: "\\overline{z} = a - bi",
    detail: "Отражение относительно оси Re. Полезно для деления: z^{-1} = \\overline{z} / |z|^2.",
  },
]

const roadmap = [
  {
    title: "1. Точка на плоскости",
    text: "Думайте о z как о координатах (a, b). Модуль — длина радиус-вектора, аргумент — угол.",
  },
  {
    title: "2. Повороты и масштаб",
    text: "Умножение на e^{i\\varphi} — чистый поворот на φ, умножение на r — масштабирование.",
  },
  {
    title: "3. Формулы Эйлера",
    text: "Связь тригонометрии и экспоненты: e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi.",
  },
  {
    title: "4. Применение",
    text: "Фильтры в сигнале, вращения в 3D, быстрое умножение многочленов через БПФ — всё опирается на эти идеи.",
  },
]

export default function IntroductionPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent/10 blur-2xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-16">
          <div className="max-w-5xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Введение
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance"
              style={{ fontFamily: "var(--font-paplane)" }}
            >
              Комплексные числа без паники: стартуем с главных идей
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
              На этой странице — краткий маршрут по базовым определениям и действиям. Всё в том же визуальном ритме, что и главная,
              с примерами формул через MathExpression.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full px-6 py-3 text-base">
                <a href="/">
                  <ArrowLeft className="h-4 w-4" />
                  На главную
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6 py-3 text-base border-border">
                <a href="#basics">
                  Быть к формулам
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3 pt-4">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">Определение</p>
                <MathExpression className="text-2xl font-semibold text-accent" inline>
                  {"z = a + bi"}
                </MathExpression>
                <p className="text-sm text-muted-foreground mt-3">i² = −1, поэтому добавляем мнимую ось Im.</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">Модуль</p>
                <MathExpression className="text-2xl font-semibold text-accent" displayMode>
                  {"|z| = \\sqrt{a^2 + b^2}"}
                </MathExpression>
                <p className="text-sm text-muted-foreground mt-3">Это длина радиус-вектора на комплексной плоскости.</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">Форма Эйлера</p>
                <MathExpression className="text-2xl font-semibold text-accent" displayMode>
                  {"e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi"}
                </MathExpression>
                <p className="text-sm text-muted-foreground mt-3">Связка экспоненты и тригонометрии для поворотов.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="basics" className="py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">шаг 1</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-3">Три формы записи, которые нужно помнить</h2>
            <p className="text-lg text-foreground/70 mt-4 leading-relaxed">
              Их достаточно для любых начальных задач: сумма, модуль, переход к полярной записи. Рядом — короткие подсказки,
              что стоит держать в голове.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {foundations.map((item, index) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background to-accent/5 p-7 shadow-sm"
              >
                <div className="absolute top-6 right-6 text-5xl font-black text-muted-foreground/10">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <MathExpression className="text-2xl md:text-3xl text-primary" displayMode>
                  {item.expression}
                </MathExpression>
                <p className="text-base text-foreground/70 mt-4 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-gradient-to-b from-background via-background/80 to-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">шаг 2</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-3">Быстрые формулы действий</h2>
            <p className="text-lg text-foreground/70 mt-4 leading-relaxed">
              Сложение, умножение и сопряжение — три операции, которые встречаются чаще всего. Держим их как рабочую шпаргалку.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {operations.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border/60 bg-background/80 p-7 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground uppercase tracking-wide">
                  <Compass className="h-4 w-4 text-accent" />
                  Операция
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <MathExpression className="text-xl md:text-2xl text-primary" displayMode>
                  {item.expression}
                </MathExpression>
                <p className="text-base text-foreground/70 mt-4 leading-relaxed flex-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">шаг 3</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-3">Маршрут дальше</h2>
            <p className="text-lg text-foreground/70 mt-4 leading-relaxed">
              Четыре коротких шага, которые помогут перейти от формул к практике. Используйте их как чек-лист для домашнего
              чтения или быстрой лекции.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {roadmap.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border/60 bg-background/70 p-7 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-base text-foreground/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
