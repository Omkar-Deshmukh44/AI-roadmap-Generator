import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import RoadmapView from './viewRoadmap/[tripId]' 
import MyTrips from './my-trips'
import CreateRoadmap from './create-trip/index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>

  },
  {
    path:'/create-trip',
    element:<CreateRoadmap/>
  },
  {
    path:'/view-roadmap/:tripId',
    element:<RoadmapView/>
  },  
  {
    path:'/my-trips',
    element:<MyTrips/>
  }
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header/>
      <Toaster/>
      <RouterProvider router = {router} />
    </GoogleOAuthProvider>;    
  </StrictMode>,
)
