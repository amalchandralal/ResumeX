import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  Folder,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, {
        headers: { Authorization: token },
      });

      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: Folder },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error("Error in Saving resume: ", error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator
        .share({ url: resumeUrl })
        .catch(() =>
          toast.error("Share failed. Make sure you're on HTTPS browser."),
        );
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  // const downloadResume = () => {
  //   window.print();
  // };
const downloadResume = async () => {
  try {
    toast.loading("Preparing PDF...");

    const { default: html2canvas } = await import("html2canvas-pro");
    const { default: jsPDF } = await import("jspdf");

    const element = document.getElementById("resume-preview");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      allowTaint: true,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 10; // 10mm on all sides

    const contentWidth = pageWidth - margin * 2;   // 190mm
    const contentHeight = pageHeight - margin * 2; // 277mm

    // Convert content height from mm to canvas pixels
    const contentHeightPx = (contentHeight * canvas.width) / contentWidth;

    let remainingHeight = canvas.height;
    let sourceY = 0;
    let pageNumber = 0;

    while (remainingHeight > 0) {
      if (pageNumber > 0) pdf.addPage();

      const sliceHeight = Math.min(contentHeightPx, remainingHeight);

      // ✅ Create a white canvas for this page slice
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = contentHeightPx; // Always full page height

      const ctx = pageCanvas.getContext("2d");
      // ✅ Fill with white first (bottom margin area)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      // ✅ Draw the slice
      ctx.drawImage(
        canvas,
        0, sourceY,           // source start
        canvas.width, sliceHeight, // source size
        0, 0,                 // dest start
        canvas.width, sliceHeight  // dest size
      );

      const pageImgData = pageCanvas.toDataURL("image/png");

      pdf.addImage(
        pageImgData,
        "PNG",
        margin,        // left margin 10mm
        margin,        // top margin 10mm
        contentWidth,  // 190mm
        contentHeight  // 277mm
      );

      sourceY += sliceHeight;
      remainingHeight -= sliceHeight;
      pageNumber++;
    }

    pdf.save(`${resumeData.title || "resume"}.pdf`);
    toast.dismiss();
    toast.success("PDF downloaded! ✅");
  } catch (error) {
    toast.dismiss();
    toast.error("Download failed!");
    console.error("PDF Error:", error);
  }
};
  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));

      removeBackground && formData.append("removeBackground", "yes");

      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  return (
    <div
      className="
      min-h-screen 
      bg-gradient-to-br from-green-50 via-white to-green-100 
      relative overflow-hidden
    "
    >
      {/* Soft glow background */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-20"></div>

      {/* Light texture */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.15]"></div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            to={"/app"}
            className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
          >
            <ArrowLeftIcon className="size-4" /> Back to Dashboard
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* LEFT PANEL */}
            <div className="relative lg:col-span-5 rounded-2xl backdrop-blur-xl bg-white/60 shadow-lg border border-green-200 overflow-hidden">
              <div className="p-6 pt-1">
                {/* Progress bar */}
                <div className="relative h-1.5 bg-gray-200 rounded-full mb-6">
                  <div
                    className="absolute top-0 left-0 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                    style={{
                      width: `${
                        (activeSectionIndex * 100) / (sections.length - 1)
                      }%`,
                    }}
                  ></div>
                </div>

                {/* Section header */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-3">
                  <div className="flex items-center gap-2">
                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(template) =>
                        setResumeData((prev) => ({ ...prev, template }))
                      }
                    />

                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(color) =>
                        setResumeData((prev) => ({
                          ...prev,
                          accent_color: color,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center">
                    {activeSectionIndex !== 0 && (
                      <button
                        onClick={() =>
                          setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                        }
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-all"
                      >
                        <ChevronLeft className="size-4" /> Previous
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.min(prev + 1, sections.length - 1),
                        )
                      }
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-all ${
                        activeSectionIndex === sections.length - 1 &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Next <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* FORM SECTIONS */}
                <div className="space-y-6">
                  {activeSection.id === "personal" && (
                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  )}

                  {activeSection.id === "summary" && (
                    <ProfessionalSummaryForm
                      data={resumeData.professional_summary}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          professional_summary: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}

                  {activeSection.id === "experience" && (
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          experience: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "education" && (
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          education: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "projects" && (
                    <ProjectForm
                      data={resumeData.projects}
                      onChange={(data) =>
                        setResumeData((prev) => ({ ...prev, projects: data }))
                      }
                    />
                  )}

                  {activeSection.id === "skills" && (
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          skills: data,
                        }))
                      }
                    />
                  )}
                </div>

                {/* Save button */}
                <button
                  onClick={saveResume}
                  className="
                    bg-gradient-to-br from-green-200 to-green-300 
                    text-green-700 font-medium
                    rounded-xl px-6 py-2 mt-6 
                    ring-green-300 hover:ring transition-all text-sm
                  "
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="lg:col-span-7 max-lg:mt-6">
              <div className="relative">
                {/* Floating Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-3">
                  {resumeData.public && (
                    <button
                      onClick={handleShare}
                      className="flex items-center p-2 px-4 gap-2 text-xs 
                      bg-gradient-to-br from-blue-100 to-blue-200 
                      text-blue-600 rounded-xl ring-blue-300 hover:ring"
                    >
                      <Share2Icon className="size-4" /> Share
                    </button>
                  )}

                  <button
                    onClick={changeResumeVisibility}
                    className="flex items-center p-2 px-4 gap-2 text-xs 
                    bg-gradient-to-br from-purple-100 to-purple-200 
                    text-purple-600 rounded-xl ring-purple-300 hover:ring"
                  >
                    {resumeData.public ? (
                      <EyeIcon className="size-4" />
                    ) : (
                      <EyeOffIcon className="size-4" />
                    )}
                    {resumeData.public ? "Public" : "Private"}
                  </button>

                  <button
                    onClick={downloadResume}
                    className="flex items-center gap-2 px-6 py-2 text-xs 
                    bg-gradient-to-br from-green-100 to-green-200 
                    text-green-600 rounded-xl ring-green-300 hover:ring"
                  >
                    <DownloadIcon className="size-4" /> Download
                  </button>
                </div>
              </div>

              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
