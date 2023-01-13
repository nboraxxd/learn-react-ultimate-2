import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'
import HomePage from './components/Home/HomePage'
import User from './components/User/User'
import Admin from './components/Admin/Admin'
import ManageUser from './components/Admin/Content/ManageUser'
import DashBoard from './components/Admin/Content/DashBoard'
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<User />} />
        </Route>

        {/* Admin page */}
        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />}></Route>
        </Route>

        {/* Log in page */}
        <Route path="/log-in" element={<LogIn />}></Route>

        {/* Sign up page */}
        <Route path="/sign-up" element={<SignUp />}></Route>
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
