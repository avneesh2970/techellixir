import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Rahul Sharma",
    company: "ABC Technologies",
    review:
      "TechEllixir delivered an outstanding website that exceeded our expectations.",
  },
  {
    name: "Priya Verma",
    company: "Innovate Solutions",
    review:
      "The team was responsive, creative, and delivered our mobile application on time.",
  },
  {
    name: "David Wilson",
    company: "Global IT",
    review:
      "Excellent support and high-quality software development. Highly recommended.",
  },
  {
    name: "Anjali Gupta",
    company: "NextGen",
    review:
      "Professional team with excellent communication and beautiful UI designs.",
  },
  {
    name: "Amit Kumar",
    company: "Digital World",
    review:
      "Outstanding service from planning to deployment. Great experience.",
  },
  {
    name: "Sneha Patel",
    company: "TechHub",
    review:
      "Amazing developers and excellent post-launch support.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-shell bg-white">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="eyebrow justify-center">Testimonials</p>
          <h2 className="section-title mt-4 text-4xl md:text-5xl">
            Teams trust us with meaningful products
          </h2>
          <p className="section-copy mt-5">
            Clients choose TechEllixir for thoughtful execution, steady
            communication, and software that keeps working after launch.
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            720: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="soft-card flex min-h-[330px] flex-col justify-between rounded-3xl p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={17}
                          className="fill-[#FFC44D] text-[#FFC44D]"
                        />
                      ))}
                    </div>
                    <Quote size={38} className="text-[#FF4D37]/20" />
                  </div>
                  <p className="section-copy mt-7 text-lg">"{item.review}"</p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4D37] to-[#FF8A3D] text-xl font-black text-white shadow-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#182033]">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.company}</p>
                  </div>
                </div>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
