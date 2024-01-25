import { authImage1, authImage2, authImage3, authImage4, authImage5 } from 'src/assets/images'
import { path } from 'src/constants/path'

export type AuthSlide = {
  id: number
  img: string
}
export type PoliciesOption = {
  id: number
  title: string
  to: string
}

export const authSlides: AuthSlide[] = [
  {
    id: 1,
    img: authImage1
  },
  {
    id: 2,
    img: authImage2
  },
  {
    id: 3,
    img: authImage3
  },
  {
    id: 4,
    img: authImage4
  },
  {
    id: 5,
    img: authImage5
  }
]

export const policiesOptions: PoliciesOption[] = [
  {
    id: 1,
    title: 'Terms & Condition',
    to: path.home
  },
  {
    id: 2,
    title: 'Privacy Policy',
    to: path.home
  },
  {
    id: 3,
    title: 'Help',
    to: path.home
  },
  {
    id: 4,
    title: 'English',
    to: path.home
  }
]
