import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/AuthProvider.jsx'
import AppRoutes from './routes/Routes.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: { borderRadius: '14px', fontFamily: 'Inter, sans-serif' },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
