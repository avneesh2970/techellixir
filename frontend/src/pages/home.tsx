

import Hero from "../components/hero";
import About from "../components/about";
import Services from "../components/services";
import Process from "../components/process";
import WhyChooseUs from "../components/whychoseus";
import Testimonials from "../components/testimonial";
import Contact from "../components/contact";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;