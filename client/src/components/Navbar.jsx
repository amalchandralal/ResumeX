import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div
      className="
        w-full
        bg-gradient-to-r from-green-100/80 to-green-50/80
        backdrop-blur-xl
        border-b border-green-200
        shadow-md
      "
    >
      {/* ================= NAV CONTAINER ================= */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800 transition-all">

        {/* ========== Logo ========== */}
        <Link to="/">
          <img
            src="/logo.svg"
            alt="Resume Builder Logo"
            className="w-9 h-auto"     // <-- smaller (w-11 → w-9)
          />
        </Link>

        {/* ========== Right Section ========== */}
        <div className="flex items-center gap-4 text-sm">

          {/* 💚 Person Icon + Name */}
          <div className="hidden sm:flex items-center gap-1.5 text-green-700 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21c1-4 4-6 6.5-6s5.5 2 6.5 6" />
            </svg>
            <p>Hi, {user?.name}</p>
          </div>

          {/* ========== Logout Button ========== */}
          <button
            onClick={logoutUser}
            className="
              bg-white
              hover:bg-green-50
              border border-green-300
              px-7 py-1.5 rounded-full
              active:scale-95 transition-all
              shadow-sm
            "
          >
            Logout
          </button>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
