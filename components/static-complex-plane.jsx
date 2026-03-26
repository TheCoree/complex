"use client"
import React, { useState, useRef, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import MathExpression from "@/components/MathExpression"
import { ZoomIn, ZoomOut, Maximize, Eye, EyeOff } from "lucide-react"

export function StaticComplexPlane({
  points = [],
  type = "complex", // "complex" | "cartesian"
  showVectors = true, // Новое свойство: показывать ли линии-векторы по умолчанию
}) {
  const containerRef = useRef(null)

  // Нормализация точек
  const normPoints = useMemo(() => {
    return points.map((p) => ({
      x: p.x ?? p.re ?? 0,
      y: p.y ?? p.im ?? 0,
      label: p.label,
      color: p.color || '#3b82f6',
      drawVector: p.showVector ?? showVectors
    }))
  }, [points, showVectors])

  // Состояния
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [showNumbers, setShowNumbers] = useState(true) // Видимость цифр
  const dragStartInfo = useRef(null)

  const resetView = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  const maxValOrig = useMemo(() => {
    if (normPoints.length === 0) return 5
    const vmax = Math.max(...normPoints.flatMap(p => [Math.abs(p.x), Math.abs(p.y)]))
    return vmax === 0 ? 5 : vmax * 1.3
  }, [normPoints])

  const maxVal = maxValOrig / zoom
  const vW = 800
  const vH = 400
  const baseScale = (vH / 2) / maxValOrig
  const scale = baseScale * zoom

  const cX = vW / 2 + offset.x
  const cY = vH / 2 + offset.y

  // Шаг сетки
  const step = useMemo(() => {
    if (maxVal === 0) return 1
    const log10 = Math.floor(Math.log10(maxVal))
    let s = Math.pow(10, log10)
    if (maxVal / s < 2) s /= 5
    else if (maxVal / s < 5) s /= 2
    return s
  }, [maxVal])

  // Сетка
  const { gridLinesX, gridLinesY } = useMemo(() => {
    const gx = []
    const gy = []
    const limitXStart = Math.floor(-cX / scale / step) - 1
    const limitXEnd = Math.ceil((vW - cX) / scale / step) + 1
    for (let i = limitXStart; i <= limitXEnd; i++) {
      if (i !== 0) gx.push(i * step)
    }

    const limitYStart = Math.floor((cY - vH) / scale / step) - 1
    const limitYEnd = Math.ceil(cY / scale / step) + 1
    for (let i = limitYStart; i <= limitYEnd; i++) {
      if (i !== 0) gy.push(i * step)
    }
    return { gridLinesX: gx, gridLinesY: gy }
  }, [cX, cY, scale, step, vW, vH])

  const xAxisLabel = type === "complex" ? "Re" : "X"
  const yAxisLabel = type === "complex" ? "Im" : "Y"

  // Драг (панорамирование)
  const handlePointerDown = (e) => {
    setIsDragging(true)
    dragStartInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y
    }
    e.target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging || !dragStartInfo.current) return
    const dx = e.clientX - dragStartInfo.current.startX
    const dy = e.clientY - dragStartInfo.current.startY
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const svgRatioX = vW / rect.width
    const svgRatioY = vH / rect.height

    setOffset({
      x: dragStartInfo.current.startOffsetX + dx * svgRatioX,
      y: dragStartInfo.current.startOffsetY + dy * svgRatioY
    })
  }

  const handlePointerUp = (e) => {
    setIsDragging(false)
    dragStartInfo.current = null
    e.target.releasePointerCapture(e.pointerId)
  }

  // Зум колесиком
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return
      e.preventDefault()
      setZoom((z) => {
        const newZ = z * (e.deltaY > 0 ? 0.9 : 1.1)
        return Math.min(Math.max(newZ, 0.1), 50)
      })
    }
    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [])

  const zoomIn = () => setZoom(z => Math.min(z * 1.3, 50))
  const zoomOut = () => setZoom(z => Math.max(z / 1.3, 0.1))

  const formatNum = (num) => parseFloat(num.toPrecision(4))

  return (
    <div className="flex flex-col items-center my-10 not-prose w-full group relative">
      {/* Кнопки управления */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setShowNumbers(v => !v)} className="p-2 bg-background/80 shadow-sm border border-border/50 rounded-lg hover:bg-accent/20 backdrop-blur-md text-foreground transition-all" title={showNumbers ? "Скрыть значения на осях" : "Показать значения на осях"}>
          {showNumbers ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button onClick={zoomIn} className="p-2 bg-background/80 shadow-sm border border-border/50 rounded-lg hover:bg-accent/20 backdrop-blur-md text-foreground transition-all">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={zoomOut} className="p-2 bg-background/80 shadow-sm border border-border/50 rounded-lg hover:bg-accent/20 backdrop-blur-md text-foreground transition-all">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={resetView} className="p-2 bg-background/80 shadow-sm border border-border/50 rounded-lg hover:bg-accent/20 backdrop-blur-md text-foreground transition-all" title="Центрировать">
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Подсказка */}
      <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-50 transition-opacity text-xs font-semibold tracking-wider uppercase text-foreground bg-background/50 px-2 py-1 rounded backdrop-blur border border-border/30 pointer-events-none">
        Ctrl + Scroll (или Shift + Scroll) для зума
      </div>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full aspect-[4/3] md:aspect-[2/1] bg-background/40 backdrop-blur-2xl border border-border/40 shadow-xl overflow-hidden touch-none select-none rounded-[1.5rem] md:rounded-[2.5rem] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 pointer-events-none" />

        <svg viewBox={`0 0 ${vW} ${vH}`} className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Сетка X */}
          <g className="text-muted-foreground/[0.15]">
            {gridLinesX.map((val) => {
              const xPos = cX + val * scale
              return (
                <g key={`gx-${val}`}>
                  <line x1={xPos} y1={0} x2={xPos} y2={vH} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  {showNumbers && (
                    <text
                      x={xPos + 6}
                      y={Math.min(Math.max(cY - 6, 16), vH - 6)}
                      fill="currentColor"
                      fontSize="14"
                      fontWeight="600"
                      className="text-foreground/40"
                      style={{ textShadow: '0 0 4px var(--background), 0 0 10px var(--background), 0 0 16px var(--background)' }}
                    >
                      {formatNum(val)}
                    </text>
                  )}
                </g>
              )
            })}
          </g>

          {/* Сетка Y */}
          <g className="text-muted-foreground/[0.15]">
            {gridLinesY.map((val) => {
              const yPos = cY - val * scale
              return (
                <g key={`gy-${val}`}>
                  <line x1={0} y1={yPos} x2={vW} y2={yPos} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  {showNumbers && (
                    <text
                      x={Math.min(Math.max(cX + 6, 6), vW - 40)}
                      y={yPos - 6}
                      fill="currentColor"
                      fontSize="14"
                      fontWeight="600"
                      className="text-foreground/40"
                      style={{ textShadow: '0 0 4px var(--background), 0 0 10px var(--background), 0 0 16px var(--background)' }}
                    >
                      {formatNum(val)}{type === "complex" ? 'i' : ''}
                    </text>
                  )}
                </g>
              )
            })}
          </g>

          {/* Главные Оси */}
          <g className="text-muted-foreground/60">
            <line x1={0} y1={cY} x2={vW} y2={cY} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <line x1={cX} y1={0} x2={cX} y2={vH} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

            {/* Динамические метки осей */}
            <text x={vW - 12} y={cY - 12} textAnchor="end" fill="currentColor" fontSize="15" fontWeight="800" className="text-foreground/90 drop-shadow-md tracking-wider" style={{ textShadow: '0 0 8px var(--background), 0 0 16px var(--background)' }}>
              {xAxisLabel}
            </text>
            <text x={cX + 12} y={24} textAnchor="start" fill="currentColor" fontSize="15" fontWeight="800" className="text-foreground/90 drop-shadow-md tracking-wider" style={{ textShadow: '0 0 8px var(--background), 0 0 16px var(--background)' }}>
              {yAxisLabel}
            </text>
          </g>

          {/* Векторы и Точки */}
          {normPoints.map((p, idx) => {
            const px = cX + p.x * scale
            const py = cY - p.y * scale
            return (
              <g key={`vec-${idx}`}>
                {p.drawVector && (
                  <motion.line
                    x1={cX}
                    y1={cY}
                    x2={px}
                    y2={py}
                    stroke={p.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, delay: 0.1 + idx * 0.3, ease: "easeOut" }}
                  />
                )}
                <motion.circle
                  cx={px}
                  cy={py}
                  r="7"
                  fill={p.color}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ type: "spring", stiffness: 200, delay: p.drawVector ? 0.8 + idx * 0.3 : 0.2 + idx * 0.3 }}
                />
              </g>
            )
          })}
        </svg>

        {/* Метки точек (HTML) */}
        {normPoints.map((p, idx) => {
          if (!p.label) return null
          const px = cX + p.x * scale
          const py = cY - p.y * scale
          const leftPct = (px / vW) * 100
          const topPct = (py / vH) * 100

          return (
            <motion.div
              key={`lbl-${idx}`}
              className="absolute font-bold text-base md:text-lg whitespace-nowrap pointer-events-none drop-shadow-lg"
              style={{
                left: `${leftPct}%`,
                top: `calc(${topPct}% - 34px)`,
                color: p.color,
                transform: 'translateX(12px)',
                textShadow: '0 2px 8px rgba(0,0,0,0.2), 0 0 12px var(--background), 0 0 20px var(--background)'
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: p.drawVector ? 0.9 + idx * 0.3 : 0.3 + idx * 0.3, duration: 0.4 }}
            >
              <MathExpression inline>{p.label}</MathExpression>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
