import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LessonNavigation } from "@/components/lesson-navigation"

export default function LessonsLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <Navigation />
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-12">
          <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto lg:prose-lg xl:prose-xl">
            {children}
            <LessonNavigation />
          </article>
        </div>
      </div>
      <Footer />
    </div>
  )
}
