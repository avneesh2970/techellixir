import { motion } from "framer-motion";
import { ArrowRight, Layers3, Target, Users } from "lucide-react";

const metrics = [
  ["100+", "Projects Delivered"],
  ["50+", "Happy Clients"],
  ["10+", "Years Experience"],
  ["24/7", "Customer Support"],
];

const principles = [
  {
    icon: <Target size={22} />,
    title: "Outcome led",
    copy: "We start with business goals, then choose the right product and technical path.",
  },
  {
    icon: <Layers3 size={22} />,
    title: "Built to scale",
    copy: "Clean architecture, maintainable code, and cloud-ready foundations come standard.",
  },
  {
    icon: <Users size={22} />,
    title: "Human centered",
    copy: "Every interface is shaped around the people who will use it every day.",
  },
];

const About = () => {
  return (
    <section className="section-shell bg-white">
      <div className="container-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">About Us</span>
            <h2 className="section-title mt-4 text-4xl lg:text-5xl">
              Technology that fits the way your business moves
            </h2>
            <p className="section-copy mt-6 text-lg">
              TechEllixir is a product and engineering partner for teams that
              need dependable software, thoughtful design, and practical technical
              guidance from idea to launch.
            </p>
            <p className="section-copy mt-4">
              We help startups, businesses, and enterprises transform early ideas
              into scalable digital products with modern stacks, user-focused
              design, and reliable delivery habits.
            </p>
            <a href="/about" className="brand-button mt-8 px-8 py-4">
              Learn More
              <ArrowRight size={19} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {metrics.map(([value, label]) => (
                <div key={label} className="soft-card rounded-3xl p-6 text-center">
                  <h3 className="text-3xl font-black text-[#FF4D37] sm:text-4xl">
                    {value}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-gray-600">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {principles.map((item) => (
                <div key={item.title} className="soft-card flex gap-4 rounded-3xl p-5">
                  <div className="icon-tile !h-12 !w-12 !rounded-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-black text-[#182033]">{item.title}</h3>
                    <p className="section-copy mt-1 text-sm">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
