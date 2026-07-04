import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Globe,
  Palette,
  Shield,
  Smartphone,
} from "lucide-react";

const domains = [
  {
    title: "Frontend Development",
    icon: <Globe size={30} />,
    description:
      "Learn React, HTML, CSS, Tailwind CSS, TypeScript, and modern frontend development.",
  },
  {
    title: "Backend Development",
    icon: <Database size={30} />,
    description:
      "Build scalable APIs using Node.js, Express, MongoDB, and REST architecture.",
  },
  {
    title: "Full Stack Development",
    icon: <Code2 size={30} />,
    description:
      "Work across frontend and backend systems while understanding real product delivery.",
  },
  {
    title: "Mobile App Development",
    icon: <Smartphone size={30} />,
    description:
      "Develop Android and iOS applications using Flutter and React Native.",
  },
  {
    title: "Artificial Intelligence",
    icon: <BrainCircuit size={30} />,
    description:
      "Explore machine learning, generative AI, prompt engineering, and automation.",
  },
  {
    title: "UI / UX Design",
    icon: <Palette size={30} />,
    description:
      "Design user-friendly interfaces with Figma, prototypes, and product design principles.",
  },
  {
    title: "Cloud Computing",
    icon: <Cloud size={30} />,
    description:
      "Work with AWS, Azure, Docker, Kubernetes, and practical deployment workflows.",
  },
  {
    title: "Cyber Security",
    icon: <Shield size={30} />,
    description:
      "Learn ethical hacking, network security, and secure application development.",
  },
];

export default function Career() {
  return (
    <main className="bg-[#fffaf7]">
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fffaf7,#ffffff_48%,#fff0eb)]" />
        <div className="container-shell text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow justify-center"
          >
            Internship Program
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title mx-auto mt-5 max-w-4xl text-4xl sm:text-5xl md:text-6xl"
          >
            Start your career with practical project experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-copy mx-auto mt-7 max-w-3xl text-lg"
          >
            Gain hands-on experience, learn modern technologies, and grow under
            mentors who help you understand how real products are planned,
            designed, built, and launched.
          </motion.p>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="container-shell">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="eyebrow justify-center">Internship Domains</p>
            <h2 className="section-title mt-3 text-4xl">
              Choose your area of interest
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {domains.map((domain, index) => (
              <motion.article
                key={domain.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -7 }}
                className="soft-card rounded-3xl p-7 transition"
              >
                <div className="icon-tile">{domain.icon}</div>
                <h3 className="mt-6 text-xl font-black text-[#182033]">
                  {domain.title}
                </h3>
                <p className="section-copy mt-3 text-sm">{domain.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-shell">
          <div className="glass-card mx-auto max-w-4xl rounded-3xl p-8 text-center sm:p-12">
            <h2 className="section-title text-3xl sm:text-4xl">
              Ready to join our internship program?
            </h2>
            <p className="section-copy mx-auto mt-5 max-w-2xl">
              Complete your registration and we will review your application.
              Shortlisted candidates will be contacted with the next steps.
            </p>
            <a
              href="https://forms.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="brand-button mt-9 px-9 py-4"
            >
              Register Now
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
