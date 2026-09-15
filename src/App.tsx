import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { Layout } from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Materials from './pages/Materials'
import MaterialDetail from './pages/MaterialDetail'
import Playground from './pages/Playground'
import Exercises from './pages/Exercises'
import QuizPage from './pages/Quiz'
import Pretest from './pages/Pretest'
import Posttest from './pages/Posttest'
import AITutor from './pages/AITutor'
import Progress from './pages/Progress'
import Analytics from './pages/Analytics'
import Achievements from './pages/Achievements'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import SUS from './pages/SUS'
import AILog from './pages/AILog'

function App() {
  const { isAuthenticated } = useApp()

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/materi" element={isAuthenticated ? <Materials /> : <Navigate to="/login" replace />} />
        <Route path="/materi/:id" element={isAuthenticated ? <MaterialDetail /> : <Navigate to="/login" replace />} />
        <Route path="/playground" element={isAuthenticated ? <Playground /> : <Navigate to="/login" replace />} />
        <Route path="/latihan" element={isAuthenticated ? <Exercises /> : <Navigate to="/login" replace />} />
        <Route path="/quiz" element={isAuthenticated ? <QuizPage /> : <Navigate to="/login" replace />} />
        <Route path="/pretest" element={isAuthenticated ? <Pretest /> : <Navigate to="/login" replace />} />
        <Route path="/posttest" element={isAuthenticated ? <Posttest /> : <Navigate to="/login" replace />} />
        <Route path="/ai-tutor" element={isAuthenticated ? <AITutor /> : <Navigate to="/login" replace />} />
        <Route path="/progress" element={isAuthenticated ? <Progress /> : <Navigate to="/login" replace />} />
        <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" replace />} />
        <Route path="/achievements" element={isAuthenticated ? <Achievements /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" replace />} />
        <Route path="/evaluasi" element={isAuthenticated ? <SUS /> : <Navigate to="/login" replace />} />
        <Route path="/ai-log" element={isAuthenticated ? <AILog /> : <Navigate to="/login" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App