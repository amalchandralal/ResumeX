import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      const prompt = `enhance my professional summary "${data}"`;

      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: { Authorization: token },
        }
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div
        className="
          flex items-center justify-between
          bg-gradient-to-r from-green-100 to-green-50
          px-4 py-3 rounded-xl border border-green-200 shadow-sm
        "
      >
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-600">
            Add a short, powerful summary to your resume
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="
            flex items-center gap-2 px-4 py-2 text-sm
            bg-green-600 text-white rounded-lg shadow
            hover:bg-green-700 active:scale-95 transition
            disabled:opacity-50
          "
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "Enhance with AI"}
        </button>
      </div>

      {/* TEXTAREA BOX */}
      <div
        className="
          bg-white border border-green-200 rounded-xl
          shadow-sm p-4 space-y-3 transition
          hover:shadow-md
        "
      >
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          placeholder="Write a compelling professional summary that highlights your strengths, achievements, and career goals..."
          className="
            w-full text-sm px-4 py-3
            rounded-lg border border-gray-300
            focus:ring-2 focus:ring-green-400
            focus:border-green-400 outline-none
            resize-none transition
          "
        />

        <p className="text-xs text-gray-500 text-center">
          Tip: Keep it 3–4 sentences. Focus on achievements & strengths.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
