import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  return (
    <main>
      <Hero />
      <About />
      <Projects locale={locale} />
      <CaseStudies locale={locale} />
      <Skills />
      <Contact />
    </main>
  )
}
