import { Link, useNavigate } from "react-router-dom"

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
    <header className="bg-black text-white p-4 border-base-content/10">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-6xl font-bold text-primary font-bebas tracking-tight">Gym-Track</h1>
            </Link>
            <div className="flex gap-6 text-lg font-medium text-white">
                {isLoggedIn ? (
                    <>
                        <Link to="/home" className="hover:text-white transition-colors duration-200">Home</Link>
                        <Link to="/dashboard" className="hover:text-white transition-colors duration-200">My Dashboard</Link>
                        <Link to="/playlists" className="hover:text-white transition-colors duration-200">My Playlists</Link>
                        <Link to={`/profile/${user._id}`} className="hover:text-white transition-colors duration-200">My Profile</Link>
                        <button onClick={handleLogout} className="hover:text-white transition-colors duration-200">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex flex-row justify-center font-bold gap-6 skew-x-12">
                        <Link to="/login" className="hover:text-yellow-200 transition-colors duration-200 border-2 border-white rounded-2xl px-6 py-2">Login</Link>
                        <Link to="/register" className="hover:text-yellow-200 transition-colors duration-200 border-2 border-white rounded-2xl px-6 py-2">Register</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar