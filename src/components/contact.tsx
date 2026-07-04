import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const contactItems = [
  {
    icon: <MapPin size={28} />,
    title: "Office Address",
    value: "15th Floor, The Iconic Corenthum, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301",
  },
  {
    icon: <Phone size={28} />,
    title: "Call Us",
    value: "+91 99175 29504",
  },
  {
    icon: <Mail size={28} />,
    title: "Email Address",
    value: "info@techellixir.com",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-shell bg-[#fffaf7]">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="eyebrow justify-center">Contact Us</p>
          <h2 className="section-title mt-4 text-4xl md:text-5xl">
            Tell us what you want to build
          </h2>
          <p className="section-copy mt-5">
            Share your idea, timeline, or current challenge. We will help you
            shape the next step with clarity.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {contactItems.map((item) => (
              <div key={item.title} className="soft-card flex gap-5 rounded-3xl p-6">
                <div className="icon-tile">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-black text-[#182033]">{item.title}</h3>
                  <p className="section-copy mt-2">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="soft-card rounded-3xl p-6 sm:p-8"
          >
            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input type="text" placeholder="Full Name" className="field" />
                <input type="email" placeholder="Email Address" className="field" />
              </div>
              <input type="text" placeholder="Subject" className="field" />
              <textarea
                rows={6}
                placeholder="Write your message..."
                className="field resize-none"
              />
              <button type="submit" className="brand-button w-full px-8 py-4">
                Send Message
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
