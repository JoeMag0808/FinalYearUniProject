import { Link, useNavigate } from "react-router-dom"
import dumbbell from "../assets/dumbbell.png"

const Navbar = () => {
  
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const token = sessionStorage.getItem("token");

  const isLoggedIn = !!token;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user")
    navigate("/");
    windows.location.reload();
  };

  return (
    <nav className="bg-[#0a0a0a] border-b border-gray-600 sticky top-0 z-50 font-inter">
      <div className="p-4">
        <div className="flex items-center text-white">

            <img src={dumbbell} className="w-10 h-10 mr-2"/>
            <h1 className="text-6xl font-bold text-primary font-bebas tracking-tight">Gym-Track</h1>
            <div className="flex gap-6 text-lg font-medium text-gray-300 ml-auto">
                {isLoggedIn ? (
                    <>
                    <div className="flex flex-row justify-center font-bold gap-6">
                        <Link to="/home" className="hover:text-white transition-colors duration-200">Home</Link>
                        <Link to="/dashboard" className="hover:text-white transition-colors duration-200">Dashboard</Link>
                        <Link to="/playlists" className="hover:text-white transition-colors duration-200">Playlists</Link>
                        <Link to={`/profile/${user._id}`} className="hover:text-white transition-colors duration-200">Profile</Link>
                        <button onClick={handleLogout} className="hover:text-white transition-colors duration-200">
                            Logout
                        </button>
                    </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-row justify-center font-bold gap-6 skew-x-6">
                        <Link to="/login" className="hover:text-yellow-200 transition-colors duration-200 border-2 border-white rounded-2xl px-6 py-2">Login</Link>
                        <Link to="/register" className="hover:text-yellow-200 transition-colors duration-200 border-2 border-white rounded-2xl px-6 py-2">Register</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar