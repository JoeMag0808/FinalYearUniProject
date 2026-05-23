import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const playlistDashboardPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [searchPlaylist, setSearchPlaylist] = useState("");
    
    const navigate = useNavigate();

    const fetchPlaylists = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch("http://localhost:5001/api/playlists", {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await res.json();
        setPlaylists(data);
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase())
    );
    
    return (
        <div className="p-5 font-inter min-h-screen">
            <h1 className="font-bold font-inter text-white text-4xl">Playlist Dashboard</h1>

            <div className="my-5">
                <input 
                    type="text" 
                    placeholder="Search Playlists..." 
                    value={searchPlaylist} 
                    onChange={(e) => setSearchPlaylist(e.target.value)} 
                    className="p-2 w-[300px] mr-2 border border-grey-300 rounded bg-zinc-900 text-white"
                /> 
                <button onClick={() => navigate("/playlists/create")} className="bg-green-500 text-white p-2 rounded-xl text-lg absolute right-4 hover:bg-green-600 transition-colors duration-200">
                    Create Playlist
                </button>
            </div>

            {filteredPlaylists.length === 0 ? (
                <p className="text-white mt-4">No playlists found. Create one to get started!</p>
            ) : (
                <div className="grid grid-cols-3 gap-8 px-2">
                {filteredPlaylists.map((playlist) => (
                    <div 
                        key={playlist._id}
                        onClick={() => navigate(`/playlists/${playlist._id}`)}
                        className="border border-grey-300 cursor-pointer h-80 bg-zinc-900 p-4 rounded-xl shadow hover:shadow-md hover:bg-gray-600 transition-all duration-200">
                        <h3 className="text-xl font-semibold text-center text-gray-100">{playlist.name}</h3>
                    </div>
                ))}
                </div>
            )}
        </div>
)
}

export default playlistDashboardPage;