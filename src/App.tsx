import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/public/RegisterPage"
import LoginPage from "./pages/public/LoginPage"
import DashboardPage from "./pages/public/DashboardPage"
import SubjectPage from "./pages/public/SubjectsPage"
import { ToastContainer } from "react-toastify"
import { Main } from "./pages/public/Main"
import TasksPage from "./pages/public/TasksPage"

function App() {
  return (
    <><ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/study" element={<Main children={undefined} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subjects" element={<SubjectPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes></>
  )
}

export default App