import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">

      {/* -------- Title Section -------- */}
      <div
        className="
          flex items-center justify-between
          bg-gradient-to-r from-green-100 to-green-50
          px-4 py-3 rounded-xl border border-green-200 shadow-sm
        "
      >
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GraduationCap className="text-green-600" size={20} />
            Education
          </h3>
          <p className="text-sm text-gray-600">Add your education details</p>
        </div>

        <button
          onClick={addEducation}
          className="
            flex items-center gap-2 px-4 py-2 text-sm
            bg-green-600 text-white rounded-lg
            hover:bg-green-700 active:scale-95 transition
            shadow-md
          "
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* -------- Empty State -------- */}
      {data.length === 0 ? (
        <div className="text-center py-10 bg-white border border-gray-200 rounded-lg shadow-sm">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-600">No education added yet.</p>
          <p className="text-sm text-gray-500">Click “Add Education” to start.</p>
        </div>
      ) : (
        <div className="space-y-5">

          {/* -------- Each Education Block -------- */}
          {data.map((education, index) => (
            <div
              key={index}
              className="
                p-5 rounded-xl border border-green-200
                bg-white shadow hover:shadow-md transition
                space-y-4
              "
            >
              {/* Header Row */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-green-700">
                  Education #{index + 1}
                </h4>

                <button
                  onClick={() => removeEducation(index)}
                  className="
                    text-red-500 hover:text-red-700
                    p-1 rounded-full hover:bg-red-50
                    transition
                  "
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Input Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  type="text"
                  placeholder="Institution Name"
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />

                <input
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  type="text"
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />

                <input
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  type="text"
                  placeholder="Field of Study"
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />

                <input
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  type="month"
                  className="
                    px-3 py-2 text-sm rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    transition outline-none
                  "
                />
              </div>

              <input
                value={education.gpa || ""}
                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                type="text"
                placeholder="GPA (Optional)"
                className="
                  px-3 py-2 text-sm rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-green-400 focus:border-green-400
                  transition outline-none w-full
                "
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
