import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import React from "react";

/* -------------------------------------------
   SafeImage Component — print-safe image
--------------------------------------------*/
const SafeImage = ({ src }) => {
  if (!src) return null;

  return (
    <img
      src={src}
      alt="Profile"
      className="w-28 h-28 object-cover rounded-full mx-auto mb-6 border-4 shadow-md"
      style={{
        borderColor: "#ffffff",
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
      }}
    />
  );
};

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white text-gray-800"
      style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
    >
      {/* --- Header Block --- */}
      <header
        className="p-10 text-white text-center"
        style={{ backgroundColor: accentColor }}
      >
        {/* ★ Profile Image (same style as Classic) */}
        {data.personal_info?.image && (
          <SafeImage
            src={
              typeof data.personal_info.image === "string"
                ? data.personal_info.image
                : URL.createObjectURL(data.personal_info.image)
            }
          />
        )}

        {/* Name */}
        <h1 className="text-4xl font-light mb-4">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm justify-center mt-2">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2 justify-center">
              <Mail className="size-4" /> {data.personal_info.email}
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2 justify-center">
              <Phone className="size-4" /> {data.personal_info.phone}
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="size-4" /> {data.personal_info.location}
            </div>
          )}
          {data.personal_info?.linkedin && (
            <a
              target="_blank"
              href={data.personal_info.linkedin}
              className="flex items-center gap-2 justify-center break-all"
              rel="noreferrer"
            >
              <Linkedin className="size-4" />
              <span className="text-xs">
                {data.personal_info.linkedin.replace("https://www.", "")}
              </span>
            </a>
          )}
          {data.personal_info?.website && (
            <a
              target="_blank"
              href={data.personal_info.website}
              className="flex items-center gap-2 justify-center break-all"
              rel="noreferrer"
            >
              <Globe className="size-4" />
              <span className="text-xs">
                {data.personal_info.website.replace("https://", "")}
              </span>
            </a>
          )}
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="p-10">
        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l border-gray-200">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-medium">{exp.position}</h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} —{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Projects
            </h2>

            <div className="space-y-6">
              {data.project.map((p, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="text-lg font-medium">{p.name}</h3>

                  {p.description && (
                    <p className="text-gray-700 text-sm mt-3 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education + Skills */}
        <div className="grid sm:grid-cols-2 gap-10">
          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                Education
              </h2>

              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.institution}</p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white rounded-full"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
