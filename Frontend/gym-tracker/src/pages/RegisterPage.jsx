import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import mainImage from  "../assets/login-page.jpg"

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Registration failed", data.message);
        return;
      }

      toast.success("Registration Success", data);

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");

    } catch (error) {
      toast.error("Error during registration", error);
    }
  };

  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:justify-start relative ml-auto gap-12 px-10 lg:px-28">
      <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 rounded shadow-md w-full max-w-sm space-y-6 text-white lg:ml-72">
      <h1 className="text-7xl font-bold font-inter flex items-center justify-center">Register</h1>

      <p className="font-inter text-2xl">Username</p>
      <input type="text" placeholder="Username" className="w-full p-2 mb-4 bg-[#2a2a2c] rounded-xl" value={username} onChange={(e) => setUsername(e.target.value)} />

      <p className="font-inter text-2xl">Email Address</p>
      <input type="email" placeholder="Email" className="w-full p-2 mb-4 bg-[#2a2a2c] rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />

      <p className="font-inter text-2xl">Password</p>
      <input type="password" placeholder="Password" className="w-full p-2 mb-4 bg-[#2a2a2c] rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className="bg-white text-black w-full bg-primary p-2 rounded-xl hover:bg-primary-dark transition-colors duration-200">Create Account</button>

      <Link to={`/login`} className="w-full bg-primary align-middle hover:text-gray-300 transition-colors duration-200">Already have an account? Login here</Link>
      </form>
      <img src={mainImage} className="w-full lg:max-w-6xl h-[50vh] rounded-3xl object-cover ml-auto scale-y-110"/>
    </div>
  ); 
};

export default RegisterPage;