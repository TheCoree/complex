"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LightRays } from "@/components/ui/light-rays"
import { useTheme } from 'next-themes';  // Импорт хука для тем

export function Hero() {
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const animationRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  const { theme, resolvedTheme } = useTheme();  // Получаем текущую тему
  const currentTheme = resolvedTheme || theme;  // Учитываем system

  const lightRaysColor =
    mounted && currentTheme === "dark"
      ? "rgba(50, 100, 150, 0.8)"
      : "rgba(160, 210, 255, 0.6)"


  useEffect(() => {
    setIsVisible(true)
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll(".parallax")
      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.5
        el.style.transform = `translateY(${scrolled * speed}px)`
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    updateCanvasSize()
    let time = 0
    const drawComplexPlane = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const centerX = w / 2
      const centerY = h / 2
      const scale = Math.min(w, h) / 10
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = "rgba(85, 140, 160, 0.1)"
      ctx.lineWidth = 1
      for (let i = -10; i <= 10; i++) {
        ctx.beginPath()
        ctx.moveTo(centerX + i * scale, 0)
        ctx.lineTo(centerX + i * scale, h)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, centerY + i * scale)
        ctx.lineTo(w, centerY + i * scale)
        ctx.stroke()
      }
      ctx.strokeStyle = "rgba(85, 140, 160, 0.3)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, 0)
      ctx.lineTo(centerX, h)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(w, centerY)
      ctx.stroke()
      const angle = time * 0.5
      const radius = 3
      const x = centerX + Math.cos(angle) * radius * scale
      const y = centerY - Math.sin(angle) * radius * scale
      ctx.strokeStyle = "rgba(85, 140, 160, 0.8)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.fillStyle = "rgb(85, 140, 160)"
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "rgba(85, 140, 160, 0.2)"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * scale, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
      time += 0.01
      animationRef.current = requestAnimationFrame(drawComplexPlane)
    }
    drawComplexPlane()
    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      updateCanvasSize()
      drawComplexPlane()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
      {/* <div
        className="parallax absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 blur-3xl animate-float animate-morph"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="parallax absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-3xl animate-float animate-morph"
        style={{ animationDelay: "2s" }}
      /> */}
      <div className="container relative z-10 mx-auto px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h1
            className={`text-[56px] md:text-8xl lg:text-9xl font-bold tracking-tight mb-10 leading-[0.95] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ fontFamily: "var(--font-paplane)" }}
          >
            <span className="inline-block text-gradient" style={{ animationDelay: "0s" }}>
              Ко<span style={{ fontFamily: "var(--font-livret)", fontStyle: "italic" }}>м</span>п<span style={{ fontFamily: "var(--font-livret)", fontStyle: "italic" }}>л</span>ексные
            </span>
            <br />
            <span className="inline-block" style={{ animationDelay: "0.2s" }}>
              <span style={{ fontFamily: "var(--font-livret)", fontStyle: "italic" }}>Чи</span>с<span style={{ fontFamily: "var(--font-livret)", fontStyle: "italic" }}>л</span>а
            </span>
          </h1>
          <p
            className={`text-2xl md:text-3xl lg:text-4xl text-foreground/60 mb-16 max-w-4xl leading-relaxed text-pretty font-light transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
              }`}
          >
            Откройте элегантность математики через интерактивные визуализации
          </p>
          <Button
            size="lg"
            className="group text-lg !px-5 py-3 md:!px-10 md:py-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-auto transition-all duration-300"
          >
            Начать изучение
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" /> */}
      {/* LightRays только на ПК (lg и выше), с динамическим цветом */}
      <div className="hidden lg:block">  {/* Скрыто на экранах меньше lg (ПК) */}
        {mounted && (
          <div className="hidden lg:block">
            <LightRays color={lightRaysColor} />
          </div>
        )}
      </div>
    </section>
  )
}