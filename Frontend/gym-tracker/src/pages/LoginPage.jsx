import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import mainImage from  "../assets/login-page.jpg"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error("Login failed", data.message);
            return;
        }

        toast.success("Login Success", data);

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        navigate("/home");

    } catch (error) {
        toast.error("Error during login", error);
    }
    };

    
    return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:justify-start relative ml-auto gap-12 px-10 lg:px-28">
      <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 rounded shadow-md w-full max-w-sm space-y-6 text-white lg:ml-72">
      <h1 className="text-7xl font-inter font-bold flex items-center justify-center">Welcome Back!</h1>

      <p className="font-inter text-2xl">Email</p>
      <input type="text" placeholder="Email" className="w-full p-2 mb-4 bg-[#2a2a2c] rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />

      <p className="font-inter text-2xl">Password</p>
      <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-2 mb-4 bg-[#2a2a2c] rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)}  />

      <button type="submit" className="bg-white text-black w-full bg-primary p-2 rounded-xl hover:bg-primary-dark transition-colors duration-200">Login</button>

      <button onClick={() => navigate("/register")} className="w-full bg-primary p-2 rounded hover:bg-primary-dark transition-colors duration-200">Don't have an account? Create one now</button>
      </form>
      <img src={mainImage} className="w-full lg:max-w-6xl h-[50vh] rounded-3xl object-cover ml-auto"/>
    </div>
  )
}

export default LoginPage;