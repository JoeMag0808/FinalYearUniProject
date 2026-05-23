import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import heroImage from  "../assets/landing-page.jpg"
import hero2Image from "../assets/landing-page-2.jpg"

const LandingPage = () => {

    const navigate = useNavigate();

return (
    <>
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative ml-auto gap-12 px-10 lg:px-28">
    <div>
    <h1 className="text-[#f9fafb] text-5xl font-bold font-inter font-weight-700 lg:text-8xl">Welcome to Gym-Track!</h1>
    <p className="text-[#f9fafb] text-3xl mt-6 lg:text-3xl font-inter text-center">Track your workouts. Collect results. Push yourself to the limit.</p>
    <div className="flex flex-row justify-center gap-16">
    
    <button onClick={() => navigate("/register")} className="text-black bg-orange-500 font-inter font-bold text-3xl mt-10 border border-white
     rounded-3xl px-6 py-2 hover:text-gray-200 transition-colors duration-200">Get Started</button>
    
    <button onClick={() => document.getElementById("explanation").scrollIntoView({ behavior: "smooth" })} className="text-white font-bold font-inter text-3xl mt-10 border border-white 
    rounded-3xl px-6 py-2 hover:text-[#f9fafb] transition-colors duration-200">How it works</button>
    </div>
    </div>
    <div className="bg-black p-4 rounded-xl">
    <img src={hero2Image} className="w-full max-w-md lg:max-w-xl rounded-3xl object-contain ml-auto"/>
    </div>
    </section>
    
    <section id="explanation" className="bg-[#0a0a0a] min-h-screen flex flex-col lg:flex-row items-center justify-center relative ml-auto gap-12 px-10 lg:px-28">
    <img src={heroImage} className="w-full max-w-md lg:max-w-xl rounded-3xl object-contain ml-auto"/>
    <div>
    <h1 className="text-yellow-200 font-serif text-5xl font-bold lg:text-7xl">How does it work?</h1>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">Gym-Track utilises MediaPipe as a model to detect landmarks on the body, allowing them to be tracked and exercises reps and sets to be counted and recorded.</p>
    <div className="flex flex-row justify-center gap-20">
    </div>
    </div>
    </section>
    </>
)
}

export default LandingPage;