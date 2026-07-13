import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { submitQuery } from "../lib/api";

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
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      await submitQuery(form);
      setStatus("success");
      setFeedback("Thanks. Your query has been received and our team will contact you soon.");
      setForm({ fullName: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your query.");
    }
  };

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
          <h2 className="section-title mt-4 text-3xl md:text-4xl">
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
  className="soft-card rounded-3xl p-8"
>
  <div className="space-y-8">
    {contactItems.map((item, index) => (
      <div
        key={item.title}
        className={`flex gap-5 ${
          index !== contactItems.length - 1
            ? "border-b border-gray-200 pb-8"
            : ""
        }`}
      >
        <div className="icon-tile shrink-0">{item.icon}</div>

        <div>
          <h3 className="text-xl font-black text-[#182033]">
            {item.title}
          </h3>
          <p className="section-copy mt-2 break-words">
            {item.value}
          </p>
        </div>
      </div>
    ))}
  </div>
</motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="soft-card rounded-3xl p-6 sm:p-8"
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="field"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="field"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="field"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
              />
              <textarea
                rows={6}
                placeholder="Write your message..."
                className="field resize-none"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
              />
              {feedback && (
                <p
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                    status === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {feedback}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="brand-button w-full px-8 py-4 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
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
