import Image from 'next/image'
import Link from 'next/link'
import type { PersonalProject } from '@/content/personal-projects'
import { LinkPreview } from '@/components/ui/LinkPreview'


interface Props {
  project: PersonalProject
  locale: string
  viewLabel: string
}

export function PersonalProjectCard({ project, locale, viewLabel }: Props) {
  return (
    <article className="group relative flex flex-col border border-white/5 bg-zinc-900/40 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:border-emerald-500/20 transition-all duration-200">
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-inset rounded-xl"
        aria-label={`${viewLabel}: ${project.title}`}
      />
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-800 rounded-t-xl">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div>
          <LinkPreview
            url={project.url}
            imageSrc={project.image.src}
            imageAlt={project.image.alt}
            title={project.title}
            description={project.summary}
            className="relative z-20 text-xs text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
          >
            {project.domain}
          </LinkPreview>
          <h3 className="text-base font-semibold text-zinc-100 mt-0.5">{project.title}</h3>
        </div>

        <p className="text-zinc-400 text-xs leading-relaxed flex-1 line-clamp-2">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs bg-zinc-800 border border-white/5 text-zinc-300 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-xs text-zinc-400">+{project.stack.length - 3}</span>
          )}
        </div>
      </div>
    </article>
  )
}
