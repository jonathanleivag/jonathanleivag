import { connectToDatabase } from '@/lib/mongodb'
import { Profile } from '@/models/Profile'
import { ProfileForm } from '@/components/admin/ProfileForm'

export default async function AdminProfilePage() {
  await connectToDatabase()
  const profile = await Profile.findOne().lean() as Record<string, unknown> | null

  const role = profile?.role as { es?: string; en?: string } | null
  const headline = profile?.headline as { es?: string; en?: string } | null
  const summary = profile?.summary as { es?: string; en?: string } | null
  const social = profile?.social as { github?: string; linkedin?: string; email?: string; cv?: string } | null
  const about = profile?.about as { body?: Array<{ es?: string; en?: string }> } | null
  const portrait = profile?.portrait as { url?: string; publicId?: string; width?: number; height?: number } | null

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Perfil</h1>
        <p className="text-sm text-zinc-500 mt-1">Edita tu información profesional</p>
      </div>

      <ProfileForm
        data={{
          name: profile?.name as string,
          handle: profile?.handle as string,
          location: profile?.location as string,
          roleEs: role?.es,
          roleEn: role?.en,
          headlineEs: headline?.es,
          headlineEn: headline?.en,
          summaryEs: summary?.es,
          summaryEn: summary?.en,
          aboutBodyEs: about?.body?.map((p) => p.es ?? '').join('\n\n'),
          aboutBodyEn: about?.body?.map((p) => p.en ?? '').join('\n\n'),
          portrait: portrait?.url ? {
            url: portrait.url,
            publicId: portrait.publicId ?? '',
            width: portrait.width ?? 1200,
            height: portrait.height ?? 800,
          } : undefined,
          github: social?.github,
          linkedin: social?.linkedin,
          email: social?.email,
          cv: social?.cv,
        }}
      />
    </div>
  )
}
