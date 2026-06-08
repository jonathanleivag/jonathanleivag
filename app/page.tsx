import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <CaseStudies />
      <Skills />
      <Contact />
    </main>
  )
}
