import React, { FC } from 'react'
import { UiTitleComponent } from '../../ui'
import { GiGuitar } from 'react-icons/gi'

export const AboutMeInterestsComponent: FC = () => {
  return (
    <>
      <UiTitleComponent tag='h2' Icon={GiGuitar} title='Intereses' />
      <section className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <p className='paragraph text-justify'>
          Mis intereses principales son el desarrollo web y en especial todo lo
          relacionado con la internet, me interesa de sobre manera estar al
          corriente sobre el mundo de la tecnología en sí, sobre los avances
          tecnológicos y novedades que se presentan día a día en este ámbito. Es
          por lo anterior, que permanentemente me encuentro realizando cursos
          sobre el desarrollo web y de esta manera busco perfeccionar mis
          conocimientos.
        </p>
        <p className='paragraph text-justify'>
          Sin embargo, pese a estar en permanente estudio y perfeccionamiento,
          no todo es programar o estar sentado al frente de un monitor en mi
          vida, puesto que me encanta la música, es por ello por lo que he
          desarrollado la habilidad de tocar la guitarra, convirtiéndose en un
          gran gusto personal, de igual modo el disfrutar de vídeos juegos, los
          cuales me ayudan a despejarme para posteriormente retomar la
          programación. Y finalmente, otro gran interés es dejar tiempo para
          compartir con mi familia y amigos.
        </p>
      </section>
    </>
  )
}
