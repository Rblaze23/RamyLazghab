// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import "./Hero.scss";
import ramyImg1 from "../assets/img/metoo.jpg";
import ramyImg2 from "../assets/img/sleek.png";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// Floating crown SVG
const CrownSVG = ({ style, delay }) => (
  <motion.svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="floating-crown"
    style={style}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 0.12, y: [10, -10, 10] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
      delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M12 44L8 16L24 32L32 12L40 32L56 16L52 44H12Z"
      fill="#c7a977"
      stroke="#f5deb3"
      strokeWidth="2"
    />
  </motion.svg>
);

const Hero = () => {
  const images = [ramyImg2, ramyImg1];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Animated Crowns */}
      <CrownSVG style={{ top: "20%", left: "10%" }} delay={0} />
      <CrownSVG style={{ top: "40%", left: "80%", width: "40px" }} delay={1} />
      <CrownSVG style={{ top: "70%", left: "25%", width: "30px" }} delay={2} />
      <CrownSVG style={{ top: "60%", left: "60%", width: "35px" }} delay={3} />
      <CrownSVG style={{ top: "50%", left: "30%", width: "30px" }} delay={4} />

      <div className="hero-container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Hi, I’m <span className="highlight">Ramy Lazghab</span>
          </h1>
          <p>
            <Typewriter
              words={[
                "AI Engineer",
                "MLOps Specialist",
                "LLM Orchestrator",
                "Generative AI Developer",
                "Data Scientist",
              ]} 
              loop
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </p>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="image-wrapper">
            {images.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt="Ramy Lazghab"
                className="hero-image-fade"
                initial={false}
                animate={{ opacity: index === i ? 1 : 0 }}
                transition={{ duration: 1.5 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <span></span>
      </div>

      <motion.div
        className="hero-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </section>
  );
};

export default Hero;
