import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BoardPage from './pages/BoardPage/BoardPage'
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage'
import TaskPage from './pages/TaskPage/TaskPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
      </Routes>
    </Layout>
  )
}

export default App
