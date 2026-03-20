import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

export const SafeImage = ({ src, className = "" }) => {
  if (!src) return null;

  const finalSrc = typeof src === "string" ? src : URL.createObjectURL(src);

  return (
    <img
      src={finalSrc}
      alt="Profile"
      className={className}
      crossOrigin="anonymous"
    />
  );
};

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    const props = {
      data,
      accentColor,
      SafeImage, // 🔥 PASS FIXED IMAGE RENDERER TO ALL TEMPLATES
    };

    switch (template) {
      case "modern":
        return <ModernTemplate {...props} />;
      case "minimal":
        return <MinimalTemplate {...props} />;
      case "minimal-image":
        return <MinimalImageTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      {/* Resume Container */}
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none " +
          classes
        }
      >
        {renderTemplate()}
      </div>

      
    </div>
  );
};

export default ResumePreview;
