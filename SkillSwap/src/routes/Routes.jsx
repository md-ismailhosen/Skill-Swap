import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import PrivateRoute from '../components/PrivateRoute.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import MyProfile from '../pages/MyProfile.jsx'
import NotFound from '../pages/NotFound.jsx'
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx'
import Register from '../pages/Register.jsx'
import SkillDetails from '../pages/SkillDetails.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route
          path="skills/:id"
          element={
            <PrivateRoute>
              <SkillDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
