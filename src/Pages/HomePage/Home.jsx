import Hero from "./Hero";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Fasilitas from "./Fasilitas";
import VisMis from "./VisMis";
import Info1 from "./Info1";
import { useState } from "react";
import "./Home.css";

function Home() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Navbar setToggle={setToggle} toggle={toggle} />
      <Hero />
      <About />
      <VisMis/>
      <Info1 />
      <Fasilitas />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
