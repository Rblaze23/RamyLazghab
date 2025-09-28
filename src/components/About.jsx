import React from "react";
import "./About.scss";
import aboutPic from "../assets/img/aboutmee.jpg";

// Generate multiple sparkles
const SparkleField = ({ count = 12 }) => {
  const sparkles = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 12 + 8; // 8px to 20px
    const top = Math.random() * 90 + "%";
    const left = Math.random() * 90 + "%";
    const delay = Math.random() * 6 + "s";
    return (
      <svg
        key={i}
        className="sparkle"
        style={{
          top,
          left,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: delay,
        }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L13.09 8.26L18 12L13.09 15.74L12 22L10.91 15.74L6 12L10.91 8.26L12 2Z"
          fill="#fff8dc"
        />
      </svg>
    );
  });

  return <>{sparkles}</>;
};

const About = () => {
  return (
    <section className="about" id="about">
      {/* Background blob animation */}
      <svg
        className="about-blob-bg"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c7a97733" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path>
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M421.5,308Q427,366,383,417Q339,468,275.5,442Q212,416,193,360Q174,304,174,250Q174,196,221,161.5Q268,127,319.5,129.5Q371,132,397,179.5Q423,227,421.5,308Z;

              M447.5,327.5Q460,405,389,433.5Q318,462,258,434Q198,406,168.5,358Q139,310,143,254.5Q147,199,200,175.5Q253,152,311.5,129Q370,106,402,161.5Q434,217,447.5,327.5Z;

              M421.5,308Q427,366,383,417Q339,468,275.5,442Q212,416,193,360Q174,304,174,250Q174,196,221,161.5Q268,127,319.5,129.5Q371,132,397,179.5Q423,227,421.5,308Z
            "
          />
        </path>
      </svg>

      {/* Sparkles */}
      <SparkleField count={15} />

      <div className="about-container">
        <div className="about-text">
          <h2>About Me</h2>
            <p>
              I’m <strong>Ramy Lazghab</strong>, a Master’s student at <strong>Dauphine Paris University</strong>, specializing in <strong>Big Data & Artificial Intelligence</strong>. My expertise is twofold: building robust <strong>Deep Learning (DL)</strong> and <strong>Machine Learning (ML)</strong> solutions, and specializing in scalable <strong>Generative AI</strong> systems.
              <br /><br />
              With a background in Computer Engineering, I possess strong foundational competency in various ML tasks, including <strong>advanced classification, regression, and time-series analysis</strong>. I excel in the production pipeline, focusing on <strong>LLM Orchestration</strong> and deploying solutions using <strong>Python, Docker, and MLOps principles</strong>.
              <br /><br />
              My portfolio showcases this full-stack capability:
              <ul>
                <li><strong>DL & Core ML:</strong> My <strong>MoodSync</strong> project utilized <strong>deep neural networks for real-time speech-emotion classification</strong> (DL) and I've applied models like <strong>XGBoost and SVM</strong> for clinical and regression tasks, achieving quantifiable results (e.g., high <strong>AUC/F1 scores</strong>).</li>
                <li><strong>Generative AI & Orchestration:</strong> I designed <strong>RAGenius</strong>, a modern LLM project demonstrating expertise in <strong>Retrieval-Augmented Generation (RAG)</strong>, vector indexing, and LangChain orchestration for grounded, scalable outputs.</li>
              </ul>
              <br />
              I am seeking an AI Engineer internship to leverage this blend of foundational DL mastery and cutting-edge GenAI orchestration in a dynamic international setting.
            </p>
        </div>
        <div className="about-image">
          <div className="image-wrapper">
            <img src={aboutPic} alt="About Ramy Lazghab" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
