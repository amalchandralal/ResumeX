import React from "react";
import {
  Home,
  LifeBuoy,
  CreditCard,
  Users,
  Building2,
  BookOpen,
  MessageCircle,
  Briefcase,
  Info,
  Shield,
  FileText,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-green-200/60 to-white mt-40">
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10"></div>

        {/* Left Section */}
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <img
            src="./logo.svg"
            alt="Resume Builder Logo"
            className="h-11 w-auto hover:scale-105 transition-transform duration-300"
          />

          {/* Product */}
          <div>
            <p className="text-slate-800 font-semibold">Product</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <Home size={14} /> Home
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <LifeBuoy size={14} /> Support
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <CreditCard size={14} /> Pricing
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <Users size={14} /> Affiliate
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-slate-800 font-semibold">Resources</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <Building2 size={14} /> Company
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <BookOpen size={14} /> Blogs
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <MessageCircle size={14} /> Community
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <Briefcase size={14} /> Careers
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <Info size={14} /> About
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-slate-800 font-semibold">Legal</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <Shield size={14} /> Privacy
                </a>
              </li>
              <li>
                <a href="/" className="footer-link flex items-center gap-2">
                  <FileText size={14} /> Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-60 text-gray-600">
            Delivering a meaningful experience for every user, irrespective of
            audience scale.
          </p>

          <div className="flex items-center gap-4 mt-3">
            {/* Social icons unchanged */}
            <span className="social-icon">🌐</span>
            <span className="social-icon">💼</span>
            <span className="social-icon">🐦</span>
            <span className="social-icon">▶️</span>
          </div>

          <p className="mt-3 text-center text-gray-600">
            © {currentYear} Made By ❤️‍🔥 dev pulse
          </p>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        .footer-link {
          position: relative;
          transition: all 0.2s ease;
        }

        .footer-link:hover {
          color: #22c55e;
          transform: translateX(4px);
        }

        .social-icon {
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          filter: drop-shadow(0 0 6px rgba(34,197,94,0.4));
        }
      `}</style>
    </>
  );
};

export default Footer;
