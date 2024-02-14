import { path } from 'src/constants/path'
import { PoliciesOption } from 'src/data/auth'
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineClipboardDocumentCheck,
  HiOutlineUser,
  HiOutlineUserGroup
} from 'react-icons/hi2'
import { IconType } from 'react-icons'

interface QuickOptionNavbar extends PoliciesOption {}
interface SidebarOption extends QuickOptionNavbar {
  icon: IconType
}

export const quickOptionsNavbar: QuickOptionNavbar[] = [
  {
    id: 1,
    title: 'Profile',
    to: '/'
  },
  {
    id: 2,
    title: 'Settings',
    to: '/'
  },
  {
    id: 3,
    title: 'Sign out',
    to: '/'
  }
]

export const sidebarOption: SidebarOption[] = [
  {
    id: 1,
    title: 'Home',
    to: path.home,
    icon: HiOutlineHome
  },
  {
    id: 2,
    title: 'Patient',
    to: path.patients,
    icon: HiOutlineUserGroup
  },
  {
    id: 3,
    title: 'Appointment Schedule',
    to: path.schedules,
    icon: HiOutlineCalendarDays
  },
  {
    id: 4,
    title: 'Medical Survey',
    to: path.surveys,
    icon: HiOutlineClipboardDocumentCheck
  },
  {
    id: 5,
    title: 'Personal',
    to: path.personals,
    icon: HiOutlineUser
  }
]
