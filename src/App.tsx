import { Routes, Route } from "react-router-dom";

import Navbar from "./components/nav";
import Footer from "./components/footer";

import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Career from "./pages/career";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career/>}/>
  
      </Routes>

      <Footer />
    </>
  );
}

export default App;