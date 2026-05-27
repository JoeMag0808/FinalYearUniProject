import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import hero2Image from "../assets/landing-page-2.jpg"
import PlayistDemo from "../assets/PlaylistDemo.mp4"
import dashboarddemo from "../assets/dashboarddemo.mp4"

const LandingPage = () => {

    const navigate = useNavigate();

return (
    <>
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative ml-auto gap-12 px-10 lg:px-28">
    <div>
    <h1 className="text-white text-5xl font-bold font-serif font-weight-700 lg:text-8xl">Welcome to Gym-Track!</h1>
    <p className="text-white text-3xl mt-6 lg:text-3xl font-inter text-center">Track your workouts. Collect results. Push yourself to the limit.</p>
    <div className="flex flex-row justify-center gap-16">
    
    <button onClick={() => navigate("/register")} className="text-white bg-green-500 font-inter font-bold text-3xl mt-10 border border-white
     rounded-3xl px-6 py-2 hover:text-gray-600 transition-colors duration-200">Get Started</button>
    
    <button onClick={() => document.getElementById("explanation").scrollIntoView({ behavior: "smooth" })} className="text-white font-bold font-inter text-3xl mt-10 border border-white 
    rounded-3xl px-6 py-2 hover:text-gray-300 transition-colors duration-200">How it works</button>
    </div>
    </div>
    <div className="bg-zinc-950 p-4 rounded-xl pb-20">
    <img src={hero2Image} className="w-full max-w-md lg:max-w-xl rounded-3xl object-contain ml-auto"/>
    </div>
    </section>
    
    <section id="explanation" className="bg-[#0a0a0a] min-h-screen flex flex-col lg:flex-row items-center justify-center relative ml-auto gap-12 px-10 lg:px-28">
    <div className="text-white font-inter text-3xl mt-6 lg:text-3xl text-center">
    <h1 className="text-yellow-200 font-serif text-5xl font-bold lg:text-7xl">How does it work?</h1>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">Gym-Track utilises MediaPipe as a model to detect landmarks on the body, allowing certain poses and positions to be tracked.</p>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">This enables you to track your individual set and reps within your workout, allowing you to perfect your form and monitor your progress over time.</p>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">With detailed pose detection and analysis, you can be your best self and achieve any fitness goals to benefit your fitness journey.</p>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">See the individual systems that will guide you along your fitness journey.</p>
    <div className="flex flex-row justify-center gap-20">

     <button onClick={() => document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" })} className="text-white font-bold font-inter text-3xl mt-10 border border-white 
    rounded-3xl px-6 py-2 hover:text-gray-300 transition-colors duration-200">Dashboard Feature</button>

    <button onClick={() => document.getElementById("playlist").scrollIntoView({ behavior: "smooth" })} className="text-white font-bold font-inter text-3xl mt-10 border border-white 
    rounded-3xl px-6 py-2 hover:text-gray-300 transition-colors duration-200">Playlist Feature</button>
    </div>
    </div>
    </section>

    <section id="dashboard" className="bg-[#0a0a0a] min-h-screen flex flex-col lg:flex-row items-center justify-center relative ml-auto gap-12 px-10 lg:px-28">
    <div className="text-white font-inter text-3xl mt-6 lg:text-3xl text-center">
    <h1 className="text-yellow-200 font-serif text-5xl font-bold lg:text-7xl">Dashboard Feature</h1>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">The dashboard feature allows you to gain a deeper perspective on your fitness journey.</p>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">Through the use of multiple charts and graphs, you can visualise your progress and performance over time.</p>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">Use this data to understand trends, and form a more informed approach to fitness.</p>
    </div>
    <div className="w-full max-w-7xl">
    <video autoPlay loop muted className="w-full max-w-7xl rounded-3xl mt-4">
        <source src={dashboarddemo} type="video/mp4"/>
    </video>
    </div>
    </section>

    <section id="playlist" className="bg-[#0a0a0a] min-h-screen flex flex-col lg:flex-row items-center justify-center relative ml-auto gap-12 px-10 lg:px-28">
    <div className="text-white font-inter text-3xl mt-6 lg:text-3xl text-center">
    <h1 className="text-yellow-200 font-serif text-5xl font-bold lg:text-7xl">Playlist Feature</h1>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">The playlist feature allows you the creation of different custom-tailored workouts.</p>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">Create your own workout structure, selecting exercises of your choice, along with the amount of sets, reps and 
    rest times between.</p>
    <p className="text-white font-inter text-3xl mt-6 lg:text-3xl">Develop your own unique training plan, and gain control over your fitness journey.</p>
    </div>
    <div className="w-full max-w-7xl">
    <video autoPlay loop muted className="w-full max-w-7xl rounded-3xl mt-4">
        <source src={PlayistDemo} type="video/mp4"/>
    </video>
    </div>
    </section>
    </>
)
}

export default LandingPage;