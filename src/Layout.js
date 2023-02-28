import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import App from './App'
import HomePage from './components/Home/HomePage'
// import User from './components/User/User'
import Admin from './components/Admin/Admin'
import ManageUser from './components/Admin/Content/ManageUser'
import DashBoard from './components/Admin/Content/DashBoard'
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'
import QuizList from './components/User/QuizList'
import DetailQuiz from './components/User/DetailQuiz'
import 'react-toastify/dist/ReactToastify.css'
import NotFound from './components/NotFound/NotFound'
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz'

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<QuizList />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        {/* Admin page */}
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />}></Route>
          <Route path="manage-quizzes" element={<ManageQuiz />}></Route>
        </Route>

        {/* Log in page */}
        <Route path="/log-in" element={<LogIn />}></Route>

        {/* Sign up page */}
        <Route path="/sign-up" element={<SignUp />}></Route>

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* toast notification */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Layout
