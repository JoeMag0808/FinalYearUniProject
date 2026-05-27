import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import homepage from "../assets/landing-page-monochrome.png"

const HomePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, []);

  return (
    <>
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative ml-auto gap-12 px-10 lg:px-28">
        <div className="p-4 rounded-xl pb-28">
            <img src={homepage} className="w-full max-w-3xl lg:max-w-xl rounded-3xl object-contain ml-auto scale-100 scale-x-110"/>
        </div>
        <div className="p-20"> 
        <h1 className="text-gray-100 text-5xl font-bold font-inter font-weight-700 lg:text-8xl">Welcome Back!</h1>
        <p className="text-gray-100 text-3xl mt-6 lg:text-3xl font-inter text-center">Ready to start a new workout? Or maybe track your stats?</p>
        <div className="flex flex-row justify-center gap-16">
            
        
        <button onClick={() => navigate("/playlists")} className="text-gray-100 font-inter font-bold text-3xl mt-10 border border-white
         rounded-3xl px-6 py-2 hover:text-gray-400 transition-colors duration-200">Check Playlists</button>
        
        <button onClick={() => navigate("/dashboard")} className="text-gray-100 font-bold font-inter text-3xl mt-10 border border-white 
        rounded-3xl px-6 py-2 hover:text-gray-400 transition-colors duration-200">Check your stats</button>
        </div>
        </div>
        </section>
        </>
  ); 
};

export default HomePage;