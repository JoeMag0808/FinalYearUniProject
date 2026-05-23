import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PlaylistDashboardPage from './pages/PlaylistDashboardPage'
import PlaylistDetailsPage from './pages/PlaylistDetailsPage'
import CreatePlaylistPage from './pages/CreatePlaylistPage'
import WorkoutTracking from './pages/WorkoutTracking'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return ( 
  <div className="min-h-screen bg-[#0a0a0a]">
    <Navbar />
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/playlists' element={<PlaylistDashboardPage />} />
      <Route path='/playlists/:id' element={<PlaylistDetailsPage />} />
      <Route path='/playlists/create' element={<CreatePlaylistPage />} />
      <Route path='/workout-tracking/:id' element={<WorkoutTracking />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/profile/:id' element={<ProfilePage />} />
    </Routes>
  </div>
  )
};

export default App;
