import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";
import heroImage from "../assets/heowbg.png";

const trustPoints = ["Product strategy", "UX-first delivery", "Cloud ready"];
const stats = [
  ["100+", "projects shipped"],
  ["50+", "clients supported"],
  ["24/7", "launch assistance"],
];

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fffaf7_0%,#ffffff_42%,#fff0eb_100%)]" />
      <div className="absolute left-0 top-24 -z-10 h-64 w-64 rounded-full bg-[#FF4D37]/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#FFC44D]/10 blur-3xl" />

      <div className="container-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow rounded-full border border-[#ffd8ce] bg-white/70 px-4 py-2 shadow-sm">
              <Sparkles size={15} />
              Digital products that feel effortless
            </span>

            <h1 className="section-title mt-7 text-4xl sm:text-5xl lg:text-6xl">
              We design and build
              <span className="block text-[#FF4D37]">software people trust</span>
            </h1>

            <p className="section-copy mt-7 max-w-xl text-lg">
              TechEllixir helps ambitious teams turn ideas into polished web apps,
              mobile experiences, AI workflows, and cloud platforms that are fast,
              scalable, and easy to use.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a href="/contact" className="brand-button px-8 py-4">
                Start a Project
                <ArrowRight size={20} />
              </a>
              <a href="/services" className="ghost-button px-8 py-4">
                <PlayCircle size={22} />
                Explore Services
              </a>
            </div>

            <div className="mt-9 grid gap-3 text-sm font-semibold text-gray-700 sm:grid-cols-3">
              {trustPoints.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#FF4D37]" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="glass-card rounded-[1.75rem] p-4 sm:p-6">
              <div className="rounded-[1.35rem] bg-gradient-to-br from-[#fff4ef] to-white p-4">
                <img
                  src={heroImage}
                  alt="Digital product dashboard illustration"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="soft-card absolute -left-3 top-8 rounded-2xl p-4 sm:-left-8 sm:p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Delivered
              </p>
              <h3 className="mt-1 text-2xl font-black text-[#FF4D37]">100+</h3>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="soft-card absolute -right-2 bottom-8 rounded-2xl p-4 sm:-right-8 sm:p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Satisfaction
              </p>
              <h3 className="mt-1 text-2xl font-black text-[#FF4D37]">98%</h3>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 rounded-3xl border border-[#efe6df] bg-white/70 p-4 shadow-sm backdrop-blur md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-black text-[#FF4D37]">{value}</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-widest text-gray-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
