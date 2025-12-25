"use client"

import { useEffect, useRef, useState } from "react"
import MathExpression from "@/components/MathExpression"

export function Visualization() {
  const canvasRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    updateCanvasSize()

    let time = 0

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const centerX = w / 2
      const centerY = h / 2
      const scale = Math.min(w, h) / 6

      ctx.clearRect(0, 0, w, h)

      // Grid
      ctx.strokeStyle = "rgba(85, 140, 160, 0.06)"
      ctx.lineWidth = 1

      for (let i = -8; i <= 8; i++) {
        ctx.beginPath()
        ctx.moveTo(centerX + i * scale, 0)
        ctx.lineTo(centerX + i * scale, h)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, centerY + i * scale)
        ctx.lineTo(w, centerY + i * scale)
        ctx.stroke()
      }

      // Axes
      ctx.strokeStyle = "rgba(85, 140, 160, 0.15)"
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(centerX, 0)
      ctx.lineTo(centerX, h)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(w, centerY)
      ctx.stroke()

      // Multiple rotating points creating pattern
      const numPoints = 8
      for (let i = 0; i < numPoints; i++) {
        const angle = time * 0.5 + (i * Math.PI * 2) / numPoints
        const radius = 2 + Math.sin(time * 0.3 + i) * 0.5
        const x = centerX + Math.cos(angle) * radius * scale
        const y = centerY - Math.sin(angle) * radius * scale

        // Draw vector
        ctx.strokeStyle = `hsla(${(i / numPoints) * 360 + time * 30}, 60%, 50%, 0.6)`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Draw point
        ctx.fillStyle = `hsla(${(i / numPoints) * 360 + time * 30}, 60%, 50%, 0.8)`
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      time += 0.01
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      updateCanvasSize()
      draw()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section id="visualization" className="relative py-32 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
              Визуализация в реальном времени
            </h2>
            <p className="text-xl lg:text-2xl text-foreground/60 max-w-3xl font-light leading-relaxed">
              Наблюдайте как комплексные числа создают удивительные паттерны на комплексной плоскости
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-border/50" onMouseMove={handleMouseMove}>
            <canvas ref={canvasRef} className="w-full aspect-[16/10] lg:aspect-[21/9] bg-background/50" />
            <div className="absolute top-6 left-6 text-xl text-muted-foreground font-mono"><MathExpression>{'z=re^{i\θ}'}</MathExpression></div>
          </div>
        </div>
      </div>
    </section>
  )
}
