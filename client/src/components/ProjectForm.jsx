import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
      live_link: "",
      technologies: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">

      {/* ===== HEADER ===== */}
      <div
        className="
          flex items-center justify-between
          bg-gradient-to-r from-green-100 to-green-50
          px-4 py-3 rounded-xl border border-green-200 shadow-sm
        "
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Projects
          </h3>
          <p className="text-sm text-gray-600">Add your project details</p>
        </div>

        <button
          onClick={addProject}
          className="
            flex items-center gap-2 px-4 py-2 text-sm
            bg-green-600 text-white rounded-lg shadow
            hover:bg-green-700 transition active:scale-95
          "
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* ===== EMPTY STATE ===== */}
      <div className="space-y-4 mt-4">
        {data.length === 0 ? (
          <div
            className="
              text-center p-8 rounded-xl shadow-sm border border-green-200
              bg-white text-gray-600
            "
          >
            No projects added yet.  
            <br />
            <span className="text-sm">Click “Add Project” to begin.</span>
          </div>
        ) : (
          /* ===== PROJECT CARDS ===== */
          data.map((project, index) => (
            <div
              key={index}
              className="
                p-5 rounded-xl border border-green-200 bg-white
                shadow-sm hover:shadow-md transition space-y-4
              "
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-green-700">
                  Project #{index + 1}
                </h4>

                <button
                  onClick={() => removeProject(index)}
                  className="
                    text-red-500 hover:text-red-700
                    p-1 rounded-full hover:bg-red-50 transition
                  "
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* ===== INPUT FIELDS ===== */}
              <div className="grid gap-4">

                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="Project Name"
                  className="
                    px-3 py-2 text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    outline-none transition
                  "
                />

                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="Role / Type (e.g., Frontend Developer)"
                  className="
                    px-3 py-2 text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    outline-none transition
                  "
                />

                <input
                  type="url"
                  value={project.live_link || ""}
                  onChange={(e) =>
                    updateProject(index, "live_link", e.target.value)
                  }
                  placeholder="Live Link / GitHub URL"
                  className="
                    px-3 py-2 text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    outline-none transition
                  "
                />

                <input
                  type="text"
                  value={project.technologies || ""}
                  onChange={(e) =>
                    updateProject(index, "technologies", e.target.value)
                  }
                  placeholder="Technologies (e.g., React, Node.js, Tailwind)"
                  className="
                    px-3 py-2 text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    outline-none transition
                  "
                />

                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Describe what this project does and your key contributions..."
                  className="
                    px-3 py-2 text-sm border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-green-400 focus:border-green-400
                    outline-none resize-none transition
                  "
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
