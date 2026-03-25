import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ExamplesPage() {
  return (
    <div className="min-h-screen py-32 flex flex-col items-center justify-center container mx-auto px-6 text-center">
      <div className="mb-8 p-6 rounded-full bg-accent/10 text-accent">
        <Construction className="w-16 h-16" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: "var(--font-paplane)" }}>
        Примеры задач
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-light">
        Этот раздел находится в активной разработке. Скоро здесь появятся интерактивные примеры для закрепления материала по комплексным числам.
      </p>
      
      <div className="flex gap-4">
        <Link href="/" passHref>
          <Button variant="outline" className="rounded-full px-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Button>
        </Link>
        <Link href="/lessons/lesson-1" passHref>
          <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
            Перейти к урокам
          </Button>
        </Link>
      </div>
    </div>
  )
}
