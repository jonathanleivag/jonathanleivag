import { ExternalLink } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContactForm } from '@/components/ui/ContactForm'
import { EmailCopyButton } from '@/components/ui/EmailCopyButton'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { getPublicProfile } from '@/lib/data/profile'

interface Props {
  locale: string
}

export async function Contact({ locale }: Props) {
  const t = await getTranslations('contact')
  const profile = await getPublicProfile(locale as 'es' | 'en')

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={t('label')} title={t('title')} subtitle={t('description')} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm leading-relaxed">{t('description')}</p>
              <div className="flex items-center gap-3">
                <span className="text-zinc-300 text-sm font-mono">{profile.social.email}</span>
                <EmailCopyButton
                  email={profile.social.email}
                  emailLabel={t('emailLabel')}
                  copiedLabel={t('copiedLabel')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-5 py-3 rounded-lg transition-colors min-h-[44px] justify-center sm:justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                <LinkedinIcon size={16} />LinkedIn<ExternalLink size={12} className="text-zinc-600" />
              </a>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/10 text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 px-5 py-3 rounded-lg transition-colors min-h-[44px] justify-center sm:justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                <GithubIcon size={16} />GitHub<ExternalLink size={12} className="text-zinc-600" />
              </a>
              <a href={profile.social.cv} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-white/5 text-zinc-300 px-5 py-3 rounded-lg transition-colors min-h-[44px] justify-center sm:justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                {t('downloadCv')}
              </a>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
