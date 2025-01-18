import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/defaultLayout'
import { Home } from './components/Home/home'
import { Repository } from './components/Repository/repository'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/issues/:id" element={<Repository />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
