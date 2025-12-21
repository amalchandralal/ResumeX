import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-6">
      {/* -------- HEADER -------- */}
      <div
        className="
          bg-gradient-to-r from-green-100 to-green-50
          px-4 py-3 rounded-xl border border-green-200 shadow-sm
        "
      >
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User className="text-green-600" size={20} />
          Personal Information
        </h3>
        <p className="text-sm text-gray-600">
          Get started with your personal details
        </p>
      </div>

      {/* -------- IMAGE UPLOAD -------- */}
      <div className="flex items-center gap-4 mt-3">
        {/* Image */}
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="User"
              className="
                w-20 h-20 rounded-full object-cover ring-2 ring-green-200
                shadow hover:opacity-90 transition cursor-pointer
              "
            />
          ) : (
            <div
              className="
                inline-flex items-center gap-2 mt-2
                text-slate-600 hover:text-slate-700 cursor-pointer
              "
            >
              <User className="size-10 p-2.5 border rounded-full" />
              <span className="text-sm">Upload User Image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Remove Background Toggle */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 text-sm mt-2">
            <p className="text-gray-700">Remove Background</p>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setRemoveBackground((prev) => !prev)}
              />
              <div
                className="
                  w-10 h-5 bg-slate-300 rounded-full
                  peer peer-checked:bg-green-600
                  transition-colors
                "
              ></div>
              <span
                className="
                  absolute left-1 top-1 w-3 h-3 bg-white rounded-full
                  peer-checked:translate-x-5 transition-transform
                "
              ></span>
            </label>
          </div>
        )}
      </div>

      {/* -------- INPUT FIELDS -------- */}
      <div className="space-y-5">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.key}>
              {/* Label */}
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="size-4 text-green-700" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {/* Input */}
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
                className="
                  w-full mt-1 px-3 py-2 text-sm
                  border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-green-400 focus:border-green-400
                  outline-none transition
                "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
