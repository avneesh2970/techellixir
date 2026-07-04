import { motion } from "framer-motion";
import { Code2, PenTool, Rocket, Search } from "lucide-react";

const process = [
  {
    id: "01",
    icon: <Search size={30} />,
    title: "Discovery",
    description:
      "We clarify goals, users, workflows, constraints, and the first version that will create real value.",
  },
  {
    id: "02",
    icon: <PenTool size={30} />,
    title: "Design",
    description:
      "We create product flows, interface systems, and prototypes that make decisions visible early.",
  },
  {
    id: "03",
    icon: <Code2 size={30} />,
    title: "Development",
    description:
      "We build secure, scalable applications with clean handoffs, reviews, and steady progress updates.",
  },
  {
    id: "04",
    icon: <Rocket size={30} />,
    title: "Launch & Support",
    description:
      "We test, deploy, monitor, and keep improving the product after it reaches real users.",
  },
];

const Process = () => {
  return (
    <section className="section-shell bg-white">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow justify-center">Our Process</p>
          <h2 className="section-title mt-3 text-4xl md:text-5xl">
            A calmer path from idea to launch
          </h2>
          <p className="section-copy mt-5">
            Our process keeps strategy, design, engineering, and delivery in the
            same conversation, so projects move quickly without losing clarity.
          </p>
        </motion.div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -7 }}
              className="soft-card relative rounded-3xl p-7 transition"
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="icon-tile">{item.icon}</div>
                <span className="text-4xl font-black text-[#FF4D37]/18">
                  {item.id}
                </span>
              </div>
              <h3 className="text-xl font-black text-[#182033]">{item.title}</h3>
              <p className="section-copy mt-3 text-sm">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
