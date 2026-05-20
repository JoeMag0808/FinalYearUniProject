import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HomePage = () => {
    const [playlists, setPlaylists] = useState([]);
  
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, []);

  const fetchPlaylists = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch("http://localhost:5001/api/playlists", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        setPlaylists(data);
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex items-top-center justify-center p-10">

      <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Playlists</h2>
          {playlists.length}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Time Spent Exercising</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Average Workout Duration</h2>
        </div>
      </div>
      </div>
    </div>
  ); 
};

export default HomePage;