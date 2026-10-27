import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const Dashboard = lazy(() => import('./pages/Dashboard'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projetos/:name" element={<ProjectPage />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<p>Carregando painel…</p>}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
