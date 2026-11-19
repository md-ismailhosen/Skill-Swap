import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'
import Loading from './Loading.jsx'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loading label="Checking your account..." />
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  return children
}

export default PrivateRoute
