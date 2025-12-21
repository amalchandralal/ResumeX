import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import pdfToText from "react-pdftotext";

// Modal Wrapper
const ModalWrapper = ({ children, onClose, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    onClick={onClose}
    className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-50 flex items-center justify-center"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white border shadow-md rounded-lg w-full max-w-sm p-6"
    >
      {children}
      <XIcon
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={onClose}
      />
    </div>
  </form>
);

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingTitle, setIsUpdatingTitle] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setTitle("");
    setResumeFile(null);
    setEditResumeId("");
  };

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes || []);
    } catch {
      toast.error("Failed to load resumes.");
    }
  };

  const createResume = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setShowCreateResume(false);
      resetForm();
      navigate(`/app/builder/${data.resume._id}`);
    } catch {
      toast.error("Failed to create resume.");
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) return toast.error("Please select a file to upload.");
    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resumeFile);

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );
      setShowUploadResume(false);
      resetForm();
      navigate(`/app/builder/${data.resumeId}`);
    } catch {
      toast.error("Failed to upload resume.");
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    e.preventDefault();
    setIsUpdatingTitle(true);
    try {
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      );
      setAllResumes(
        allResumes.map((r) =>
          r._id === editResumeId ? { ...r, title } : r
        )
      );
      resetForm();
      toast.success(data.message);
    } catch {
      toast.error("Failed to update title.");
    } finally {
      setIsUpdatingTitle(false);
    }
  };

  const deleteResume = async (resumeId) => {
    if (!window.confirm("Delete resume permanently?")) return;
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      });
      setAllResumes(allResumes.filter((r) => r._id !== resumeId));
      toast.success(data.message);
    } catch {
      toast.error("Failed to delete resume.");
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 🔥 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-60"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Green Glow Layers (unchanged) */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-20 z-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-20 z-20"></div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.12] z-20"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-30">
        <div className="max-w-7xl mx-auto px-4 py-8">

          <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-green-700 to-slate-700 bg-clip-text text-transparent sm:hidden">
            Welcome, Joe Doe
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateResume(true)}
              className="w-full bg-white/80 backdrop-blur-xl sm:max-w-36 h-48 
              flex flex-col items-center justify-center rounded-lg gap-2 
              text-slate-600 border border-dashed border-slate-300 
              group hover:border-green-500 hover:shadow-lg 
              transition-all duration-300 cursor-pointer"
            >
              <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-green-300 to-green-500 text-white rounded-full" />
              <p className="text-sm group-hover:text-green-600 transition-all duration-300">
                Create Resume
              </p>
            </button>

            <button
              onClick={() => setShowUploadResume(true)}
              className="w-full bg-white/80 backdrop-blur-xl sm:max-w-36 h-48 
              flex flex-col items-center justify-center rounded-lg gap-2 
              text-slate-600 border border-dashed border-slate-300 
              group hover:border-green-500 hover:shadow-lg 
              transition-all duration-300 cursor-pointer"
            >
              <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-emerald-300 to-emerald-500 text-white rounded-full" />
              <p className="text-sm group-hover:text-green-600 transition-all duration-300">
                Upload Existing
              </p>
            </button>
          </div>

          <hr className="border-slate-300 my-6 sm:w-[350px]" />

          {/* RESUME GRID */}
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes?.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <button
                  key={index}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="relative w-full sm:max-w-36 h-48 bg-white/70 backdrop-blur-xl 
                  flex flex-col items-center justify-center rounded-lg gap-2 
                  border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  <FilePenLineIcon
                    className="size-7 group-hover:scale-105 transition-all"
                    style={{ color: baseColor }}
                  />

                  <p
                    className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>

                  <p
                    className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                    style={{ color: baseColor + "90" }}
                  >
                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-1 right-1 group-hover:flex items-center hidden"
                  >
                    <TrashIcon
                      onClick={() => deleteResume(resume._id)}
                      className="size-7 p-1.5 hover:bg-white/60 rounded text-slate-700 transition-colors"
                    />
                    <PencilIcon
                      onClick={() => {
                        setEditResumeId(resume._id);
                        setTitle(resume.title);
                      }}
                      className="size-7 p-1.5 hover:bg-white/60 rounded text-slate-700 transition-colors"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* MODALS (unchanged) */}
          {/* CREATE */}
          {showCreateResume && (
            <ModalWrapper
              onSubmit={createResume}
              onClose={() => {
                setShowCreateResume(false);
                resetForm();
              }}
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 border rounded focus:border-green-600"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
            </ModalWrapper>
          )}

          {/* UPLOAD */}
          {showUploadResume && (
            <ModalWrapper
              onSubmit={uploadResume}
              onClose={() => {
                setShowUploadResume(false);
                resetForm();
              }}
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 border rounded focus:border-green-600"
                required
              />

              <label htmlFor="resume-input" className="block text-sm text-slate-700">
                Select Resume File
                <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                  {resumeFile ? (
                    <p className="text-green-700">{resumeFile.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-14 stroke-1" />
                      <p>Upload Resume</p>
                    </>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResumeFile(e.target.files[0])}
              />

              <button
                disabled={isLoading}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white" />}
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>
            </ModalWrapper>
          )}

          {/* EDIT */}
          {editResumeId && (
            <ModalWrapper
              onSubmit={editTitle}
              onClose={() => {
                setEditResumeId("");
                setTitle("");
              }}
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 border rounded focus:border-green-600"
                required
              />
              <button
                disabled={isUpdatingTitle}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                {isUpdatingTitle && <LoaderCircleIcon className="animate-spin size-4 text-white" />}
                {isUpdatingTitle ? "Updating..." : "Update"}
              </button>
            </ModalWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
