import { Outlet } from 'react-router-dom'
import { HeaderImg } from '../assets/headerImg'

export function DefaultLayout() {
  return (
    <div>
      <HeaderImg />
      <Outlet />
    </div>
  )
}
