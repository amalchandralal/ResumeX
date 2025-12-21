import { Lock, Mail, User2Icon, LoaderCircleIcon } from "lucide-react";
import React from "react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="
      min-h-screen flex items-center justify-center 
      relative overflow-hidden
      bg-gradient-to-br from-green-50 via-white to-green-100
    "
    >
      {/* Soft Glow Background Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-20"></div>

      {/* Texture Layer */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.15]"></div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="
        relative z-10 
        sm:w-[380px] w-[90%]
        backdrop-blur-xl bg-white/60
        border border-green-200 shadow-xl
        rounded-3xl px-10 py-10
        transition-all
      "
      >
        {/* Title */}
        <h1 className="text-gray-900 text-3xl font-semibold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
          {state === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-gray-600 text-sm mt-1">
          {state === "login" ? "Login to continue" : "Sign up to get started"}
        </p>

        {/* Name Field */}
        {state !== "login" && (
          <div className="flex items-center mt-6 bg-white/70 shadow-inner border border-green-200 h-12 rounded-xl overflow-hidden pl-4 gap-2">
            <User2Icon size={18} className="text-green-600" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="flex items-center mt-4 bg-white/70 shadow-inner border border-green-200 h-12 rounded-xl overflow-hidden pl-4 gap-2">
          <Mail size={16} className="text-green-600" />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            className="w-full bg-transparent outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center mt-4 bg-white/70 shadow-inner border border-green-200 h-12 rounded-xl overflow-hidden pl-4 gap-2">
          <Lock size={16} className="text-green-600" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forget Password */}
        <div className="mt-3 text-left">
          <button
            className="text-sm text-green-600 hover:underline"
            type="button"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
          mt-5 w-full h-12 rounded-xl text-white 
          bg-gradient-to-r from-green-500 to-green-600 
          hover:opacity-95 active:scale-[0.98]
          transition-all flex items-center justify-center gap-2
        "
        >
          {isLoading ? (
            <>
              <LoaderCircleIcon className="animate-spin size-4" />
              Please Wait...
            </>
          ) : state === "login" ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Toggle State */}
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-600 text-sm mt-6 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-green-600 font-semibold hover:underline">
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
