import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import React from "react";
import { SafeImage } from "../ResumePreview";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px", backgroundColor: "#ffffff", color: "#1f2937", lineHeight: "1.6", fontFamily: "Georgia, serif" }}>

      {/* HEADER */}
      <header style={{ textAlign: "center", marginBottom: "32px", paddingBottom: "24px", borderBottom: `2px solid ${accentColor}` }}>
        {data.personal_info?.image && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <SafeImage
              src={data.personal_info?.image}
              className="w-28 h-28 rounded-full object-cover shadow-md"
              style={{ width: "112px", height: "112px", borderRadius: "50%", objectFit: "cover", border: `4px solid ${accentColor}` }}
            />
          </div>
        )}

        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {data.personal_info?.profession && (
          <p style={{ fontSize: "16px", color: "#4b5563", marginBottom: "8px" }}>
            {data.personal_info.profession}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", fontSize: "13px", color: "#4b5563" }}>
          {data.personal_info?.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Mail size={14} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Phone size={14} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={14} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Linkedin size={14} />
              <span>{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Globe size={14} />
              <span>{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.professional_summary && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ color: "#374151", lineHeight: "1.7" }}>
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.experience.map((exp, index) => (
              <div key={index} style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ fontWeight: "600", color: "#111827" }}>{exp.position}</h3>
                    <p style={{ color: "#374151", fontWeight: "500" }}>{exp.company}</p>
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280", textAlign: "right" }}>
                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>
                {exp.description && (
                  <p style={{ color: "#374151", whiteSpace: "pre-line" }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: accentColor }}>
            PROJECTS
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.projects.map((proj, index) => (
              <div key={index} style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ fontWeight: "600", color: "#111827" }}>{proj.name}</h3>
                  {proj.live_link && (
                    <a href={proj.live_link} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: accentColor }}>
                      View Project ↗
                    </a>
                  )}
                </div>
                {proj.type && <p style={{ fontSize: "13px", color: "#6b7280" }}>{proj.type}</p>}
                {proj.technologies && <p style={{ fontSize: "13px", color: "#6b7280", fontStyle: "italic" }}>{proj.technologies}</p>}
                {proj.description && <p style={{ color: "#374151", marginTop: "4px" }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: accentColor }}>
            EDUCATION
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.education.map((edu, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontWeight: "600", color: "#111827" }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p style={{ color: "#374151" }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: "13px", color: "#6b7280" }}>GPA: {edu.gpa}</p>}
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: accentColor }}>
            CORE SKILLS
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {data.skills.map((skill, index) => (
              <span key={index} style={{ color: "#374151" }}>• {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;