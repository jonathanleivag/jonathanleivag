import { FC } from 'react'
import { BiDetail } from 'react-icons/bi'
import { FiGithub } from 'react-icons/fi'
import { MdWeb } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { changeMenu } from '../../../features/article'
import { IProjectHomePage } from '../../../pages'

export interface IUiArticleMenuComponentProps {
  isOpen: boolean
  project: IProjectHomePage
  onClick: () => void
}

export type TTypeAction = 'code' | 'detail' | 'web'

export const UiArticleMenuComponent: FC<IUiArticleMenuComponentProps> = ({
  isOpen,
  project,
  onClick
}) => {
  const bg = useSelector((state: RootState) => state.theme.bg)
  const hover = useSelector((state: RootState) => state.theme.hoverBgLi)
  const dispatch = useDispatch()

  const handleClick = (type: TTypeAction) => {
    dispatch(changeMenu(false))

    switch (type) {
      case 'detail':
        onClick()
        break
      case 'web':
        window.open(project.url, '_blank')
        break
      case 'code':
        window.open(project.urlGitHub, '_blank')
        break
      default:
        dispatch(changeMenu(false))
        break
    }
  }

  return (
    <div
      className={`absolute w-32 right-0 top-10 z-50 transform duration-500 rounded-lg ${
        !isOpen ? 'h-0' : 'h-24'
      } w-[90px] ${bg} overflow-hidden`}
    >
      <ul className='flex flex-col h-full w-full justify-center p-2'>
        <li
          onClick={() => handleClick('detail')}
          className={`${hover} li_menu_article`}
        >
          <BiDetail />
          <span>Ver</span>
        </li>
        <li
          onClick={() => handleClick('web')}
          className={`${hover} li_menu_article`}
        >
          <MdWeb />
          <span>Web</span>
        </li>
        <li
          onClick={() => handleClick('code')}
          className={`${hover} li_menu_article`}
        >
          <FiGithub />
          <span>GitHub</span>
        </li>
      </ul>
    </div>
  )
}
