import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  FaCloud,
  FaLaptopCode,
  FaMobileAlt,
  FaPalette,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaLaptopCode size={34} />,
    title: "Web Development",
    description:
      "Responsive web platforms built with React, Node.js, and modern architecture that can scale with real traffic.",
  },
  {
    icon: <FaMobileAlt size={34} />,
    title: "Mobile App Development",
    description:
      "Cross-platform Android and iOS apps with clean interfaces, reliable performance, and practical release support.",
  },
  {
    icon: <FaCloud size={34} />,
    title: "Cloud Solutions",
    description:
      "Cloud deployment, DevOps workflows, Docker, Kubernetes, AWS, and Azure setups that keep products resilient.",
  },
  {
    icon: <FaRobot size={34} />,
    title: "AI Solutions",
    description:
      "AI assistants, workflow automation, model integrations, and intelligent tools designed around business outcomes.",
  },
  {
    icon: <FaPalette size={34} />,
    title: "UI/UX Design",
    description:
      "Human-centered product design, prototypes, and design systems that make complex products feel simple.",
  },
  {
    icon: <FaShieldAlt size={34} />,
    title: "Cyber Security",
    description:
      "Security reviews, hardening, audits, and safer development practices for teams handling sensitive systems.",
  },
];

const Services = () => {
  return (
    <section className="section-shell bg-[#fffaf7]">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow justify-center">Our Services</p>
          <h2 className="section-title mt-4 text-3xl md:text-4xl">
            Practical engineering for every stage of growth
          </h2>
          <p className="section-copy mt-6">
            From discovery to deployment, we shape reliable technology around
            your users, your workflows, and the way your business actually runs.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="soft-card group rounded-3xl p-8 transition-all duration-300 hover:border-[#ffd5ca]"
            >
              <div className="icon-tile">{service.icon}</div>
              <h3 className="mt-6 text-2xl font-black text-[#182033]">
                {service.title}
              </h3>
              <p className="section-copy mt-4">{service.description}</p>
              <a
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 font-bold text-[#DF3420]"
              >
                Plan this service
                <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
