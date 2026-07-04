import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock3,
  Headphones,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <BadgeCheck size={30} />,
    title: "Quality Assurance",
    description:
      "Testing and review are part of the work, not a rushed final step.",
  },
  {
    icon: <Users size={30} />,
    title: "Experienced Team",
    description:
      "Designers, developers, and consultants collaborate around one shared product goal.",
  },
  {
    icon: <Clock3 size={30} />,
    title: "On-Time Delivery",
    description:
      "Clear milestones and agile execution help keep scope, budget, and timelines visible.",
  },
  {
    icon: <ShieldCheck size={30} />,
    title: "Secure Solutions",
    description:
      "Security-minded architecture protects data, users, and business continuity.",
  },
  {
    icon: <Headphones size={30} />,
    title: "Dedicated Support",
    description:
      "We stay close after launch with maintenance, guidance, and product improvements.",
  },
  {
    icon: <Lightbulb size={30} />,
    title: "Modern Technology",
    description:
      "AI, cloud, automation, and modern frameworks are used where they create real leverage.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-shell bg-[#fffaf7]">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow justify-center">Why Choose Us</p>
          <h2 className="section-title mt-4 text-4xl md:text-5xl">
            A technology partner that stays accountable
          </h2>
          <p className="section-copy mt-5">
            We combine thoughtful planning, careful execution, and honest
            communication so every product decision has a reason behind it.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -7 }}
              className="soft-card rounded-3xl p-7 transition"
            >
              <div className="icon-tile">{feature.icon}</div>
              <h3 className="mt-6 text-xl font-black text-[#182033]">
                {feature.title}
              </h3>
              <p className="section-copy mt-3 text-sm">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
