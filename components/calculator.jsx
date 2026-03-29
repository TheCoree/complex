"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalculatorIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import MathExpression from "@/components/MathExpression"

export function Calculator() {
  const [z1, setZ1] = useState({ re: 2, im: 3 })
  const [z2, setZ2] = useState({ re: 1, im: -2 })
  const [op, setOp] = useState("+")
  const [result, setResult] = useState({ re: 3, im: 1 })
  const canvasRef = useRef(null)

  useEffect(() => {
    const a = parseFloat(z1.re) || 0
    const b = parseFloat(z1.im) || 0
    const c = parseFloat(z2.re) || 0
    const d = parseFloat(z2.im) || 0

    let res = { re: 0, im: 0 }
    switch (op) {
      case "+":
        res = { re: a + c, im: b + d }
        break
      case "-":
        res = { re: a - c, im: b - d }
        break
      case "*":
        res = { re: a * c - b * d, im: a * d + b * c }
        break
      case "/":
        const den = c * c + d * d
        if (den === 0) {
          res = { re: NaN, im: NaN }
        } else {
          res = { re: (a * c + b * d) / den, im: (b * c - a * d) / den }
        }
        break
    }
    setResult(res)
  }, [z1, z2, op])

  // Авто-масштабирование
  const currentScaleVal = useMemo(() => {
    const vals = [
      Math.abs(parseFloat(z1.re) || 0),
      Math.abs(parseFloat(z1.im) || 0),
      Math.abs(parseFloat(z2.re) || 0),
      Math.abs(parseFloat(z2.im) || 0),
      Math.abs(result.re || 0),
      Math.abs(result.im || 0),
      5 // Минимальный масштаб
    ]
    return Math.max(...vals) * 1.3
  }, [z1, z2, result])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const draw = () => {
      const w = rect.width
      const h = rect.height
      const centerX = w / 2
      const centerY = h / 2
      const scale = (Math.min(w, h) / 2) / currentScaleVal

      ctx.clearRect(0, 0, w, h)

      // Оптимизированный расчет шага сетки
      const log10 = Math.log10(currentScaleVal)
      const magnitude = Math.pow(10, Math.floor(log10))
      let step = magnitude
      if (currentScaleVal / step < 2) step /= 5
      else if (currentScaleVal / step < 5) step /= 2

      // Grid
      ctx.strokeStyle = "rgba(85, 140, 160, 0.08)"
      ctx.lineWidth = 1
      ctx.font = "11px sans-serif"
      ctx.fillStyle = "rgba(85, 140, 160, 0.4)"
      ctx.textAlign = "start"

      // Лимит отрисовки линий для производительности
      const maxLines = 50
      const count = Math.ceil(currentScaleVal / step)

      for (let i = -count; i <= count; i++) {
        if (i === 0) continue
        const val = i * step

        // Вертикальные линии
        ctx.beginPath()
        ctx.moveTo(centerX + val * scale, 0)
        ctx.lineTo(centerX + val * scale, h)
        ctx.stroke()
        ctx.fillText(val.toString(), centerX + val * scale + 4, centerY - 4)

        // Горизонтальные линии
        ctx.beginPath()
        ctx.moveTo(0, centerY - val * scale)
        ctx.lineTo(w, centerY - val * scale)
        ctx.stroke()
        ctx.fillText(val.toString() + "i", centerX + 4, centerY - val * scale - 4)
      }

      // Axes
      ctx.strokeStyle = "rgba(85, 140, 160, 0.2)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(centerX, 0); ctx.lineTo(centerX, h); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, centerY); ctx.lineTo(w, centerY); ctx.stroke()

      const drawVector = (val, color, label) => {
        if (isNaN(val.re) || isNaN(val.im)) return
        const x = centerX + val.re * scale
        const y = centerY - val.im * scale

        ctx.strokeStyle = color
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "currentColor"
        ctx.font = "12px sans-serif"
        ctx.fillText(label, x + 10, y - 10)
      }

      drawVector(z1, "rgba(59, 130, 246, 0.7)", "z₁")
      drawVector(z2, "rgba(16, 185, 129, 0.7)", "z₂")
      drawVector(result, "rgba(244, 63, 94, 0.9)", "res")
    }

    draw()
  }, [z1, z2, result, currentScaleVal])

  const toTrigForm = (val) => {
    if (isNaN(val.re)) return "—"
    const r = Math.sqrt(val.re * val.re + val.im * val.im).toFixed(2)
    const theta = Math.atan2(val.im, val.re).toFixed(2)
    return `${r}(\\cos ${theta} + i\\sin ${theta})`
  }

  const toExpForm = (val) => {
    if (isNaN(val.re)) return "—"
    const r = Math.sqrt(val.re * val.re + val.im * val.im).toFixed(2)
    const theta = Math.atan2(val.im, val.re).toFixed(2)
    return `${r}e^{i${theta}}`
  }

  const toAlgebraicForm = (val) => {
    if (isNaN(val.re)) return "—"
    const re = val.re.toFixed(2)
    const im = Math.abs(val.im).toFixed(2)
    const sign = val.im >= 0 ? "+" : "-"
    return `${re} ${sign} ${im}i`
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div className="space-y-8">
        <Card className="bg-background/40 backdrop-blur-2xl border-border/40 overflow-hidden shadow-xl">
          <CardHeader className="border-b border-border/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalculatorIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">Вычисления</CardTitle>
                <CardDescription className="text-sm">
                  Введите значения <MathExpression inline>{'z_1'}</MathExpression> и <MathExpression inline>{'z_2'}</MathExpression>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-10 font-sans">
            <div className="space-y-8">
              {/* Z1 Input */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  Число <MathExpression inline>{'z_1 = a + bi'}</MathExpression>
                </Label>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Часть <MathExpression inline>{'a'}</MathExpression></span>
                    <Input
                      type="number"
                      value={z1.re}
                      onChange={(e) => setZ1({ ...z1, re: e.target.value })}
                      className="bg-background/30 text-lg py-6 rounded-xl border-border/50 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Часть <MathExpression inline>{'b'}</MathExpression></span>
                    <Input
                      type="number"
                      value={z1.im}
                      onChange={(e) => setZ1({ ...z1, im: e.target.value })}
                      className="bg-background/30 text-lg py-6 rounded-xl border-border/50 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Operators */}
              <div className="flex justify-between items-center bg-accent/5 p-1.5 rounded-2xl border border-border/20">
                {["+", "-", "*", "/"].map((option) => (
                  <Button
                    key={option}
                    variant={op === option ? "default" : "ghost"}
                    onClick={() => setOp(option)}
                    className={`flex-1 h-12 rounded-xl text-xl font-medium transition-all duration-200 ${op === option ? "shadow-md" : "hover:bg-accent/10"
                      }`}
                  >
                    {option === "*" ? "×" : option === "/" ? "÷" : option}
                  </Button>
                ))}
              </div>

              {/* Z2 Input */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  Число <MathExpression inline>{'z_2 = c + di'}</MathExpression>
                </Label>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Часть <MathExpression inline>{'c'}</MathExpression></span>
                    <Input
                      type="number"
                      value={z2.re}
                      onChange={(e) => setZ2({ ...z2, re: e.target.value })}
                      className="bg-background/30 text-lg py-6 rounded-xl border-border/50 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Часть <MathExpression inline>{'d'}</MathExpression></span>
                    <Input
                      type="number"
                      value={z2.im}
                      onChange={(e) => setZ2({ ...z2, im: e.target.value })}
                      className="bg-background/30 text-lg py-6 rounded-xl border-border/50 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/10">
              <div className="bg-primary/[0.03] rounded-3xl p-8 space-y-6 border border-primary/5">
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">Результат <MathExpression inline>{'z'}</MathExpression></Label>
                  {isNaN(result.re) && <span className="text-destructive text-xs">Деление на ноль</span>}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${z1.re}-${z1.im}-${op}-${z2.re}-${z2.im}`}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    className="space-y-6"
                  >
                    <div className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
                      <MathExpression>{toAlgebraicForm(result)}</MathExpression>
                    </div>

                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-background/20 border border-border/20 backdrop-blur-sm">
                        <span className="text-xs font-medium text-muted-foreground">Тригонометрическая:</span>
                        <div className="text-sm"><MathExpression inline>{toTrigForm(result)}</MathExpression></div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-background/20 border border-border/20 backdrop-blur-sm">
                        <span className="text-xs font-medium text-muted-foreground">Показательная:</span>
                        <div className="text-sm"><MathExpression inline>{toExpForm(result)}</MathExpression></div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-32 md:space-y-8">
        <Card className="bg-background/40 backdrop-blur-2xl border-border/40 shadow-xl overflow-hidden aspect-square flex flex-col rounded-[2.5rem]">
          <CardHeader className="border-b border-border/10">
            <CardTitle className="text-xl">Комплексная плоскость</CardTitle>
            <CardDescription className="text-sm">Интерактивный график</CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-1 relative bg-accent/[0.01]">
            <canvas ref={canvasRef} className="w-full h-full absolute inset-0 cursor-crosshair" />

            <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/20 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              Скейл: {currentScaleVal.toFixed(0)}
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-around p-3.5 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/10 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"><MathExpression inline>{'z_1'}</MathExpression></span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"><MathExpression inline>{'z_2'}</MathExpression></span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">результат</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
