import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  ];

  return (
    <div>
      <div className="min-h-screen pb-20">

        {/* ================= NAVBAR ================= */}
        <nav className="z-50 w-full py-4 text-sm">
          <div
            className="w-full
                       flex items-center justify-between
                       px-6 md:px-16 lg:px-24 xl:px-40 py-4
                       bg-gradient-to-r from-green-100/80 to-green-50/80
                       backdrop-blur-xl
                       border-b border-green-200
                       shadow-md"
          >
            {/* Logo */}
            <img
              src="./logo.svg"
              alt="Resume Builder Logo"
              className="h-11 w-auto"
            />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-slate-800 font-medium">
              <a href="#" className="hover:text-green-600 transition">Home</a>
              <a href="#features" className="hover:text-green-600 transition">Features</a>
              <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
              <a href="#cta" className="hover:text-green-600 transition">Contact</a>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Link
                to="/app?state=register"
                hidden={user}
                className="hidden md:block px-6 py-2
                           bg-green-500 hover:bg-green-700
                           rounded-full text-white transition shadow"
              >
                Get Started
              </Link>

              <Link
                to="/app?state=login"
                hidden={user}
                className="hidden md:block px-6 py-2
                           border border-green-400
                           rounded-full text-slate-700
                           hover:bg-green-200/60 transition"
              >
                Login
              </Link>

              <Link
                to="/app"
                hidden={!user}
                className="hidden md:block px-8 py-2
                           bg-green-500 hover:bg-green-700
                           rounded-full text-white transition shadow"
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-green-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur
            flex flex-col items-center justify-center gap-8 md:hidden
            transition-transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="bg-green-100 rounded-2xl px-8 py-10 shadow-xl text-center space-y-6">
            <a href="#" className="block text-slate-800">Home</a>
            <a href="#features" className="block text-slate-800">Features</a>
            <a href="#testimonials" className="block text-slate-800">Testimonials</a>
            <a href="#cta" className="block text-slate-800">Contact</a>

            <button
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-green-600 hover:bg-green-700
                         text-white rounded-md px-6 py-2"
            >
              Close
            </button>
          </div>
        </div>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative flex flex-col items-center text-sm px-4 md:px-16 lg:px-24 xl:px-40">
          <div className="absolute top-28 left-1/4 -z-10 size-96 bg-green-300 blur-[100px] opacity-30"></div>

          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              {["🎓", "📄", "✏️", "💼", "📚"].map((icon, i) => (
                <div
                  key={i}
                  className="size-8 flex items-center justify-center
                             rounded-full bg-green-100
                             border-2 border-white text-green-700"
                >
                  {icon}
                </div>
              ))}
            </div>

            <div>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                    <path d="M12 2l3 6 6 .9-4.5 4.3 1 6-5.5-3-5.5 3 1-6L3 8.9 9 8z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          <div className="relative mt-6 mb-4 max-w-5xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r
                            from-green-400 via-emerald-400 to-sky-400
                            blur-sm opacity-70"></div>

            <h1 className="relative text-5xl md:text-6xl font-semibold
                           text-center px-8 py-6 rounded-3xl
                           bg-white/70 backdrop-blur-xl
                           leading-tight md:leading-[70px]">
              Land your dream job with{" "}
              <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-sky-600
                               bg-clip-text text-transparent">
                AI-powered
              </span>{" "}
              resumes.
            </h1>
          </div>

          <p className="max-w-md text-center text-base my-7">
            Create, edit and download professional resumes with AI-powered assistance.
          </p>

          <div className="flex gap-4">
            <Link to="/app" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 flex items-center">
              Get Started →
            </Link>

            <button className="flex items-center gap-2 border rounded-full px-7 h-12 text-slate-700 hover:bg-green-50">
              ▶ Try Demo
            </button>
          </div>

          <p className="py-6 text-slate-600 mt-14">
            We are all over the social medias
          </p>

          <div className="flex flex-wrap justify-center gap-6 max-w-3xl w-full mx-auto py-4">
            {logos.map((logo, index) => (
              <img key={index} src={logo} alt="Company logo" className="h-6" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default Hero;
