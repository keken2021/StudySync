import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import RegisterPage from "./pages/public/RegisterPage"
import LoginPage from "./pages/public/LoginPage"
import DashboardPage from "./pages/public/DashboardPage"
import SubjectPage from "./pages/public/SubjectsPage"
import { ToastContainer } from "react-toastify"
import { Main } from "./pages/public/Main"
import TasksPage from "./pages/public/TasksPage"
import LandingPage from "./pages/public/LandingPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },
  {
    path: "/study", element: <Main children={undefined} />,

  },
  {
    path: "/dashboard", element: < DashboardPage />
  },
  {
    path: "/tasks", element: < TasksPage />
  },
  {
    path: "/subjects", element: <SubjectPage />
  },
  // < Route path = "/register" element = {< RegisterPage />} />

  // < Route path = "/subjects" element = {< SubjectPage />} />
]);


function App() {
  return (
    <><ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />;
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/study" element={<Main children={undefined} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subjects" element={<SubjectPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes></> */}
    </>
  )
}

export default App