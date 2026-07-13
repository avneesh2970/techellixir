import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "../assets/vite.svg";

const menuItems = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Career", path: "/career" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/92 shadow-[0_14px_34px_rgba(24,32,51,0.08)] backdrop-blur-xl py-3"
          : "bg-white/75 backdrop-blur-xl py-5"
      }`}
    >
      <div className="container-shell">

        <div className="flex items-center justify-between">

          <NavLink
  to="/"
  aria-label="TechEllixir home"
  className="group flex items-center gap-3"
>
  <img
    src={Logo}
    alt="TechEllixir Logo"
    className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
  />

  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
    <span className="text-[#FF4D37]">Tech</span>
    <span className="text-[#182033] group-hover:text-[#111827] transition">
      Ellixir
    </span>
  </h1>
</NavLink>

          <nav className="hidden lg:flex items-center gap-2 rounded-2xl border border-[#efe6df] bg-white/70 p-1 shadow-sm">

            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 text-sm font-bold transition duration-200 ${
                    isActive
                      ? "bg-[#FFF1EC] text-[#DF3420]"
                      : "text-gray-600 hover:bg-white hover:text-[#182033]"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}

          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <NavLink to="/contact">
              <span className="brand-button px-6 py-3">
                Get Started
                <ArrowRight size={18} />
              </span>
            </NavLink>
          </div>

          <button
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#efe6df] bg-white text-[#182033]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-[#efe6df] bg-white shadow-2xl">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-5 py-4 first:rounded-t-2xl last:rounded-b-2xl transition ${
                  isActive
                    ? "text-[#DF3420] bg-[#FFF3EF]"
                    : "text-gray-700 hover:bg-[#FFF8F5]"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}

        </div>

      </div>

    </header>
  );
};

export default Navbar;
