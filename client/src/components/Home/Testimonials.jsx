import { BookUserIcon, User } from "lucide-react";
import React from "react";
import Title from "./Title";

/* 👉 Function to generate description based on role */
const getDescriptionByRole = (handle) => {
  if (handle.toLowerCase().includes("frontend")) {
    return "The CV builder helped me highlight my UI skills clearly. The design-focused sections made my resume stand out to recruiters.";
  }

  if (handle.toLowerCase().includes("backend")) {
    return "I was able to showcase my backend expertise and project experience in a structured and professional way using this CV builder.";
  }

  if (handle.toLowerCase().includes("ui")) {
    return "This platform made it easy to present my design skills, tools, and workflow in a clean and visually appealing resume.";
  }

  if (handle.toLowerCase().includes("company")) {
    return "We found the resumes generated here to be well-structured, professional, and job-ready for industry standards.";
  }

  return "Creating a resume was smooth and hassle-free. The builder guided me step by step to a polished final result.";
};

const Testimonials = () => {
  const cardsData = [
    {
      image: "https://img.sanishtech.com/u/3b721b1a50ed81dd2a3fc355b67e1ba0.jpg",
      name: "Muhammed Jaish",
      handle: "Frontend Developer and API Analyst",
    },
    {
      image: "https://img.sanishtech.com/u/2787c2393062cc4782254ddd976375dc.jpg",
      name: "Muhammed Nihal ok",
      handle: "UI Designer and DB analyst",
    },
    {
      image: "https://img.sanishtech.com/u/de7f01340f95c5ccc9fd417b3c15b2e0.jpg",
      name: "Amal C",
      handle: "Backend Developer and Tester",
    },
    {
      image: "https://img.sanishtech.com/u/a7414eefa81632b9f667790dadfcd716.jpg",
      name: "Dev Pulse",
      handle: "Project Company",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-xl mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-3 items-center">
        {card.image ? (
          <img
            src={card.image}
            alt={card.name}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <div className="size-11 rounded-full bg-green-100 flex items-center justify-center">
            <User className="text-green-600" size={20} />
          </div>
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium text-slate-800">{card.name}</p>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244l-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922l-.041.38a1.6 1.6 0 0 1-.245.59l-.239.297c-.313.368-.47.551-.56.743a1.63 1.63 0 0 0 0 1.404c.09.192.247.375.56.743l.239.297c.12.179.202.38.245.59l.041.38c.039.48.058.721.129.922a1.63 1.63 0 0 0 .992.992c.2.071.441.09.922.129l.38.041c.21.042.411.125.59.245l.297.239c.368.313.551.47.743.56a1.63 1.63 0 0 0 1.404 0c.192-.09.375-.247.743-.56l.297-.239c.179-.12.38-.202.59-.245l.38-.041c.48-.039.721-.058.922-.129a1.63 1.63 0 0 0 .992-.992c.071-.2.09-.441.129-.922l.041-.38c.042-.21.125-.411.245-.59l.239-.297c.313-.368.47-.551.56-.743a1.63 1.63 0 0 0 0-1.404c-.09-.192-.247-.375-.56-.743l-.239-.297a1.6 1.6 0 0 1-.245-.59l-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129l-.38-.041a1.6 1.6 0 0 1-.59-.245l-.297-.239C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56z"
                fill="#22c55e"
              />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      {/* 🔥 ROLE-BASED DESCRIPTION */}
      <p className="text-sm py-4 text-gray-700">
        {getDescriptionByRole(card.handle)}
      </p>
    </div>
  );

  return (
    <div
      id="testimonials"
      className="flex flex-col items-center my-16 scroll-mt-12
      bg-gradient-to-br from-green-50 via-green-100/60 to-green-50 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/20 rounded-full px-6 py-1.5 mt-6">
        <BookUserIcon width={14} className="stroke-green-600" />
        <span>Testimonials</span>
      </div>

      <Title
        title="Don’t just take our word for it"
        description="Hear from users who built job-ready CVs using our platform."
      />

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="w-full max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-green-50 to-transparent z-10" />
        <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, i) => (
            <CreateCard key={i} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-green-50 to-transparent z-10" />
      </div>
    </div>
  );
};

export default Testimonials;
