import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];

    if (field === "is_current" && value === true) {
      updated[index] = { ...updated[index], [field]: value, end_date: null };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }

    onChange(updated);
  };

  const generateDescription = async (index) => {
    const experience = data[index];

    if (!experience.position || !experience.company) {
      toast.error("Please fill in the Company Name and Job Title first.");
      return;
    }

    setGeneratingIndex(index);

    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`;

    try {
      const { data: responseData } = await api.post(
        "/api/ai/enhance-job-desc",
        {
          promptContent: prompt,
        },
        {
          headers: { Authorization: token },
        }
      );

      updateExperience(index, "description", responseData.enhancedContent);
      toast.success("Job description enhanced successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate description.";
      toast.error(errorMessage);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">

      {/* -------- HEADER -------- */}
      <div
        className="
          flex items-center justify-between
          bg-gradient-to-r from-green-100 to-green-50
          px-4 py-3 rounded-xl border border-green-200 shadow-sm
        "
      >
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Briefcase className="text-green-600" size={20} />
            Professional Experience
          </h3>
          <p className="text-sm text-gray-600">Add your job experience</p>
        </div>

        <button
          onClick={addExperience}
          className="
            flex items-center gap-2 px-4 py-2
            text-sm bg-green-600 text-white
            rounded-lg hover:bg-green-700 active:scale-95
            transition shadow-md
          "
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-10 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-600">No work experience added yet.</p>
          <p className="text-sm text-gray-500">Click “Add Experience” to start.</p>
        </div>
      ) : (
        <div className="space-y-5">

          {/* -------- EXPERIENCE ITEM -------- */}
          {data.map((experience, index) => (
            <div
              key={index}
              className="
                p-5 rounded-xl border border-green-200
                bg-white shadow hover:shadow-md transition
                space-y-4
              "
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-green-700">
                  Experience #{index + 1}
                </h4>

                <button
                  onClick={() => removeExperience(index)}
                  className="
                    text-red-500 hover:text-red-700
                    p-1 rounded-full hover:bg-red-50
                    transition
                  "
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company Name"
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title"
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />

                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />

                <input
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  type="month"
                  disabled={experience.is_current}
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    disabled:bg-gray-100
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="
                      flex items-center gap-1 px-2 py-1 text-xs
                      bg-green-100 text-green-700 rounded
                      hover:bg-green-200 transition
                      disabled:opacity-50
                    "
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="
                    w-full text-sm px-3 py-2 rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none resize-none
                  "
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
