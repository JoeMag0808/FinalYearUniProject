import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const fetchUserDetails = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/auth/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            toast.error("Failed to fetch user details");
            return;
        }

        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email)
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);


    const updateUserDetails = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/auth/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                username,
                email, 
            }),
        });

        const data = await res.json();
        if (res.ok) {
        toast.success("User updated successfully!");
        setEditMode(false);
    } else {
        toast.error("User not updated")
    }
};

    const deleteUser = async () => {
        const token = sessionStorage.getItem("token");
        
        const confirmDeletion = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDeletion) return;

        const res = await fetch(`http://localhost:5001/api/auth/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            sessionStorage.removeItem("token");
            navigate("/");
            toast.success("Account deleted successfully");
        } else {
            toast.error("Failed to delete account");
        }
    };


return (
    <div className="min-h-fit flex items-top-center justify-center p-10">
      <div className="w-full max-w-7xl bg-zinc-900 p-8 rounded-2xl shadow-lg font-inter">
      <h1 className="text-4xl font-bold mb-6 text-center underline text-gray-100">Profile Page</h1>
     {!editMode ? (
    <div  className="flex gap-4 flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-300">Username: {username}</h1>

      <h2 className="text-2xl font-semibold text-gray-300">Email Address: {email}</h2>

    <div className="flex gap-6 pt-4">
      <button onClick={() => setEditMode(true)} className="text-white bg-green-500 p-2 rounded hover:bg-green-600 transition-colors duration-200 max-w-32">Edit Profile</button>
      <button onClick={deleteUser} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200 max-w-32">Delete Profile</button>
      </div>
    </div>
     ) : (
        <div className="flex gap-4 flex-col items-center">
            <p className="text-2xl font-semibold text-gray-300">Username</p>
            <input className="p-2 w-[300px] mr-2 border border-grey-300 rounded bg-zinc-900 text-white" value={username} onChange={(e) => setUsername(e.target.value)} />

            <p className="text-2xl font-semibold text-gray-300">Email Address</p>
            <input className="p-2 w-[300px] mr-2 border border-grey-300 rounded bg-zinc-900 text-white" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="flex gap-6 pt-4">
            <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors duration-200 max-w-20">Cancel</button>
            <button onClick={updateUserDetails} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200 max-w-32">Save Changes</button>
        </div>
        </div>
     )}
    </div>
    </div>
    
)

}

export default ProfilePage;