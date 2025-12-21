import React, { useState } from "react";
import { Check, Layout } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a simple image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center",
    },
  ];

  return (
    <div className="relative z-[9999]"> {/* FIX: high z-index */}
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 text-sm
          bg-gradient-to-r from-green-100 to-green-50
          text-green-700 border border-green-300
          hover:bg-green-200 hover:border-green-400
          transition-all px-4 py-2 rounded-xl shadow-sm
          active:scale-95
        "
      >
        <Layout size={16} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="
            absolute left-0 top-full mt-2 w-72
            bg-white/90 backdrop-blur-xl
            border border-green-200 rounded-xl shadow-xl
            p-3 space-y-3 
            animate-[fadeIn_0.2s_ease]
            z-[9999]  /* FIX */
          "
          style={{ pointerEvents: "auto" }}
        >
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`
                  relative p-4 rounded-xl cursor-pointer transition-all
                  border
                  ${
                    isSelected
                      ? "border-green-500 bg-green-50 shadow-lg"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/60"
                  }
                  hover:shadow-md
                `}
              >
                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shadow">
                      <Check size={12} />
                    </div>
                  </div>
                )}

                <h4 className="font-semibold text-gray-800">{template.name}</h4>

                <p
                  className="
                    mt-2 p-2 text-xs text-gray-600 italic rounded-lg
                    bg-gradient-to-r from-green-50 to-green-100
                    border border-green-200 shadow-inner
                  "
                >
                  {template.preview}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TemplateSelector;
