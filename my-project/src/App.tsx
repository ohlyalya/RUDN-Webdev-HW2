import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage'
import TaskPage from './pages/TaskPage/TaskPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
      </Routes>
    </Layout>
  )
}

export default App
