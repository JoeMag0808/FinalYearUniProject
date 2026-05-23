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
    <div>
    </div>
  ); 
};

export default HomePage;