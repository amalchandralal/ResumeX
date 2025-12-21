import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-[9999]">

      {/* BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 text-sm font-medium
          bg-white/70 backdrop-blur-md
          border border-green-300 text-green-700
          px-4 py-2 rounded-xl hover:bg-green-100
          transition-all active:scale-95 shadow-sm
        "
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Colour</span>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="
            absolute left-0 mt-3 w-64 grid grid-cols-4 gap-3
            bg-white/90 backdrop-blur-xl
            border border-green-200 rounded-xl
            shadow-xl p-4
            animate-[fadeIn_0.2s_ease]
            z-[9999]
          "
        >
          {colors.map((color) => {
            const selected = selectedColor === color.value;

            return (
              <div
                key={color.value}
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
                className="cursor-pointer relative group"
              >
                {/* Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full border-[3px] shadow-sm transition
                    ${selected ? "border-green-600 scale-105" : "border-gray-200 group-hover:border-green-400"}
                  `}
                  style={{ backgroundColor: color.value }}
                ></div>

                {/* Checkmark */}
                {selected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="text-white w-5 h-5 drop-shadow" />
                  </div>
                )}

                {/* Label */}
                <p className="text-xs text-center mt-1 text-gray-700">
                  {color.name}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Fade Animation */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ColorPicker;
