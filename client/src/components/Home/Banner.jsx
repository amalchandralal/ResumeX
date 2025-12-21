import React from "react";

const Banner = () => {
  return (
    <div className="w-full py-4 font-semibold text-base text-green-900 text-center 
      bg-gradient-to-r from-[#ABFF7E] to-[#FDFEFF] shadow-sm">
      
      <p className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-full text-white bg-green-600 text-sm">
          New
        </span>

        <span>
          AI Resume Suggestions • Smart Skill Matching • AI enhancing •
          One-Click Export
        </span>
      </p>
    </div>
  );
};

export default Banner;
