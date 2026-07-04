import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const quickLinks = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Career", "/career"],
  ["Contact", "/contact"],
];

const services = [
  "Web Development",
  "Mobile App Development",
  "UI / UX Design",
  "Cloud Solutions",
  "AI & Automation",
];

const socialLinks = [
  ["Facebook", <FaFacebookF size={18} />],
  ["LinkedIn", <FaLinkedinIn size={18} />],
  ["Instagram", <FaInstagram size={18} />],
  ["X", <FaXTwitter size={18} />],
];

const Footer = () => {
  return (
    <footer className="bg-[#141A27] text-white">
      <div className="container-shell py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.85fr_1fr]">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              <span className="text-[#FF4D37]">Tech</span>Ellixir
            </h2>
            <p className="mt-6 max-w-sm leading-8 text-gray-300">
              Innovative software, web applications, mobile apps, AI solutions,
              and cloud services for businesses ready to move with confidence.
            </p>
            <div className="mt-8 flex gap-3">
              {socialLinks.map(([label, icon]) => (
                <a
                  key={label as string}
                  href="#"
                  aria-label={label as string}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-white transition hover:bg-[#FF4D37]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-black">Quick Links</h3>
            <ul className="space-y-4 text-gray-300">
              {quickLinks.map(([label, path]) => (
                <li key={path}>
                  <NavLink to={path} className="transition hover:text-[#FF7A45]">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-black">Services</h3>
            <ul className="space-y-4 text-gray-300">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-black">Contact</h3>
            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-1 flex-none text-[#FF7A45]" size={20} />
                <span className="text-gray-300">Hyderabad, Telangana, India</span>
              </div>
              <div className="flex gap-3">
                <Phone className="flex-none text-[#FF7A45]" size={20} />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex gap-3">
                <Mail className="flex-none text-[#FF7A45]" size={20} />
                <span className="text-gray-300">info@techellixir.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            Copyright {new Date().getFullYear()} TechEllixir. All Rights Reserved.
          </p>
          <p className="text-center text-sm text-gray-500">
            Built for reliable, human-centered digital products.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
