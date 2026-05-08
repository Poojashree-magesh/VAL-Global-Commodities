import "./assets/styles/main.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Products from "./components/Products";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Founder from "./components/Founder";
import GlobalReach from "./components/GlobalReach";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Products />
        <WhyUs />
        <Process />
        <Founder />
        <GlobalReach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
