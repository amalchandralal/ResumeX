import React from "react";
import Banner from "../components/Home/Banner";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";
import CallToAction from "../components/Home/CallToAction";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 🔥 VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20 opacity-50"
      >
        <source src="background.mp4" type="video/mp4" />
      </video>

      {/* Soft White Glass Overlay so content is readable */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] -z-10"></div>

      {/* OPTIONAL: Glow effects preserved exactly from your original */}
      <div className="absolute top-10 left-20 w-[500px] h-[500px] rounded-full bg-green-400 opacity-40 blur-[140px] -z-10" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-emerald-500 opacity-30 blur-[160px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-green-300 opacity-40 blur-[200px] -z-10" />

      {/* Main Page Sections */}
      <div className="relative z-10">
        <Banner />
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
