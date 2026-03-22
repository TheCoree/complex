import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calculator } from "@/components/calculator"
import MathExpression from "@/components/MathExpression"

export const metadata = {
  title: "Калькулятор комплексных чисел | Complex",
  description: "Интерактивный калькулятор для операций с комплексными числами",
}

export default function CalculatorPage() {
  return (
    <main className="min-h-screen flex flex-col pt-16">
      <Navigation />

      <div className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: "var(--font-paplane)" }}>
                  Калькулятор
                </h1>
                <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-light">
                  Выполняйте базовые операции и мгновенно визуализируйте результат на комплексной плоскости
                </p>
              </div>

              <Calculator />

              <div className="grid md:grid-cols-2 gap-8 pt-12">
                <div className="p-8 rounded-3xl bg-accent/5 border border-border/50">
                  <h3 className="text-2xl font-semibold mb-4">Как это работает?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Калькулятор поддерживает сложение, вычитание, умножение и деление. Для каждого числа вы можете указать действительную <MathExpression inline>{'a'}</MathExpression> и мнимую <MathExpression inline>{'b'}</MathExpression> части. Результат автоматически пересчитывается в алгебраическую, тригонометрическую и показательную формы.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-accent/5 border border-border/50">
                  <h3 className="text-2xl font-semibold mb-4">Визуализация</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    На графике справа отображаются векторы <MathExpression inline>{'z_1'}</MathExpression>, <MathExpression inline>{'z_2'}</MathExpression> и результат операции. Это помогает лучше понять геометрический смысл операций над комплексными числами, особенно умножения и деления.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
