import React, { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">

      {/* ===== HEADER ===== */}
      <div
        className="
          bg-gradient-to-r from-green-100 to-green-50
          px-4 py-3 rounded-xl border border-green-200 shadow-sm
        "
      >
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-600">
          Add your technical and soft skills
        </p>
      </div>

      {/* ===== INPUT AREA ===== */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter a skill (e.g., React, Team Leadership)"
          className="
            flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300
            focus:ring-2 focus:ring-green-400 focus:border-green-400
            outline-none transition
          "
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="
            flex items-center gap-2 px-5 py-2 text-sm
            bg-green-600 text-white rounded-lg shadow
            hover:bg-green-700 active:scale-95
            transition disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <Plus className="size-4" /> Add
        </button>
      </div>

      {/* ===== SKILLS LIST ===== */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="
                flex items-center gap-2 px-3 py-1.5
                bg-green-100 text-green-800 rounded-full
                text-sm shadow-sm
              "
            >
              {skill}

              <button
                onClick={() => removeSkill(index)}
                className="
                  p-0.5 rounded-full hover:bg-green-200
                  transition
                "
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p className="font-medium">No skills added yet.</p>
          <p className="text-sm">Add your skills above.</p>
        </div>
      )}

      {/* ===== TIP BOX ===== */}
      <div
        className="
          bg-green-50 border border-green-200
          p-4 rounded-lg shadow-sm
        "
      >
        <p className="text-sm text-green-800">
          <strong>Tip:</strong> Add 8–12 relevant skills. Include both technical
          skills (React, Node.js, UI Design) and soft skills (Leadership, Communication).
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
