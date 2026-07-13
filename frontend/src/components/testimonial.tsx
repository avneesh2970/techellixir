import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Autoplay,  Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Rahul Sharma",
    company: "ABC Technologies",
    review:
      "TechEllixir delivered an outstanding website that exceeded our expectations. Their team was professional, responsive and delivered everything on time.",
  },
  {
    name: "Priya Verma",
    company: "Innovate Solutions",
    review:
      "The team was responsive, creative, and delivered our mobile application on time. The experience was smooth from start to finish.",
  },
  {
    name: "David Wilson",
    company: "Global IT",
    review:
      "Excellent support and high-quality software development. Highly recommended for startups and enterprises.",
  },
  {
    name: "Anjali Gupta",
    company: "NextGen",
    review:
      "Professional team with excellent communication and beautiful UI designs. We loved working with them.",
  },
  {
    name: "Amit Kumar",
    company: "Digital World",
    review:
      "Outstanding service from planning to deployment. Great experience and excellent technical support.",
  },
  {
    name: "Sneha Patel",
    company: "TechHub",
    review:
      "Amazing developers and excellent post-launch support. We will definitely work together again.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-shell bg-[#f8fafc]">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="eyebrow justify-center">Testimonials</p>

          <h2 className="section-title mt-4 text-3xl md:text-4xl">
            What Our Clients Say
          </h2>

          <p className="section-copy mt-5">
            We build long-term relationships by delivering quality software and
            exceptional customer service.
          </p>
        </motion.div>

        <Swiper
          modules={[ Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name}>
              <motion.div
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="rounded-lg border border-gray-200 bg-white p-7 shadow-md hover:shadow-xl"
              >
                {/* Top */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-gray-300 bg-gradient-to-br from-[#FF4D37] to-[#FF8A3D] text-2xl font-bold text-white">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#182033]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.company}
                    </p>

                    <div className="mt-2 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-[#ff5b3d] text-[#ff5b3d]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review */}
                <p className="mt-6 text-[15px] leading-8 text-gray-600 line-clamp-3">
                  {item.review}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}