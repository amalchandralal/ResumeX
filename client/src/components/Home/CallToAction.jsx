import React from "react";

const CallToAction = () => {
  return (
    <>
      {/* 🔧 Component-scoped CSS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .floating {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

      <section className="w-full mt-28">
        <a
          href="https://github.com/Nihalok"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative block w-full overflow-hidden
            rounded-3xl
            bg-white/20 backdrop-blur-2xl
            border border-white/30
            shadow-[0_0_40px_rgba(0,255,120,0.35)]
          "
        >

          {/* 🌟 Bright Glossy Green Glow Layer */}
          <div className="absolute inset-0 bg-gradient-to-r 
            from-green-300/40 via-green-200/35 to-green-400/40 
            opacity-70 blur-2xl" />

          {/* ✨ Subtle bright highlight */}
          <div className="absolute inset-0 bg-gradient-to-b 
            from-white/15 to-transparent opacity-40" />

          {/* CONTENT */}
          <div className="relative py-24 px-6 text-center">

            {/* ✨ Floating Icons */}
            <span className="absolute top-10 left-10 text-white/60 text-4xl floating">🎓</span>
            <span className="absolute top-20 right-16 text-white/55 text-3xl floating">📄</span>
            <span className="absolute bottom-16 left-24 text-white/55 text-3xl floating">✏️</span>
            <span className="absolute bottom-10 right-20 text-white/60 text-4xl floating">💼</span>
            <span className="absolute top-1/2 left-1/3 text-white/50 text-5xl floating">🧠</span>

            {/* 🌟 Main Text */}
            <p className="mx-auto max-w-3xl text-2xl md:text-3xl font-semibold 
              text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]">
              Build a Professional Resume That Helps You Stand Out and Get Hired
            </p>

            {/* ⚡Bright Green Button */}
            <div
              className="
                mt-10 inline-flex items-center gap-3
                rounded-xl bg-gradient-to-r from-green-500 to-green-600
                px-8 py-3 text-white font-semibold
                shadow-[0_0_18px_rgba(0,255,120,0.5)]
                hover:shadow-[0_0_28px_rgba(0,255,120,0.8)]
                hover:scale-105
                transition-all duration-300
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              follow me on GitHub
            </div>

          </div>
        </a>
      </section>
    </>
  );
};

export default CallToAction;
