// src/components/Projects.jsx
import React from "react";
import "./Projects.scss";
import moodsync from "../assets/img/moodsync.png";
import invest from "../assets/img/invest.jpg";
import house from "../assets/img/houseprices.jpg";
import diabetes from "../assets/img/diabetes.png";
import blended from "../assets/img/blended.png";
import satisfaction from "../assets/img/satisfaction.png";
import sportiq from "../assets/img/SportiQ.png";
import ragenius from "../assets/img/ragenius.png";
const projects = [
  {
    title: "MoodSync – AI for Psychologists",
    description:
      "Built a real-time assistant for psychologists with emotion detection, smart note-taking, and LED mood lighting. Winner of Hack for Good.",
    image: moodsync,
  },
  {
    title: "Startup Investment Program",
    description:
      "Used NLP & Word2Vec to help investors identify high-potential startups based on startup metadata and team data.",
    image: invest,
  },
  {
    title: "House Price Prediction",
    description:
      "Built XGBoost regression model with advanced feature engineering for Kaggle housing competition.",
    image: house,
  },
  {
    title: "Diabetes Prediction System",
    description:
      "Created an ML model with Logistic Regression, SVM, and Decision Trees to predict diabetes risk.",
    image: diabetes,
  },
  {
    title: "Blended Learning Platform",
    description:
      "A web app to facilitate online/offline training sessions, built with React and Firebase.",
    image: blended,
  },
  {
    title: "Career Satisfaction Analysis",
    description:
      "Used PCA to explore correlation between education, job roles, and career satisfaction.",
    image: satisfaction,
  },
  {
    title: "SportIQ – AI Tennis Performance Analyzer",
    description:
      "Developed a real-time video analysis tool for athletes that extracts frames, performs pose estimation, emotion recognition, and NLP-based coaching feedback. Provides detailed metrics and visualizations to improve form and mental focus.",
    image: sportiq,
  },
  {
    title: "RAGenius – AI-Powered CSV & PDF Assistant",
    description:
      "Developed a multi-modal AI assistant that analyzes CSV datasets and PDF documents using Retrieval-Augmented Generation (RAG). Enables users to upload multiple files, get automatic summaries, and ask intelligent questions that combine data insights and document knowledge. Built with LangChain, FAISS, and local LLMs via Ollama. Features a clean Streamlit dashboard for interactive exploration.",
    image: ragenius,
  },
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <svg
        className="projects-blob-bg"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="projectGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c7a97733" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path fill="url(#projectGradient)">
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
        M421.5,306.5Q429,363,379,389.5Q329,416,285,378Q241,340,196,298.5Q151,257,182,194Q213,131,277.5,117Q342,103,381,153Q420,203,421.5,256.5Q423,310,421.5,306.5Z;
        M402,310.5Q421,371,375.5,397.5Q330,424,284,387Q238,350,193,301Q148,252,186.5,193Q225,134,283.5,128Q342,122,384,168.5Q426,215,408.5,264Q391,313,402,310.5Z;
        M421.5,306.5Q429,363,379,389.5Q329,416,285,378Q241,340,196,298.5Q151,257,182,194Q213,131,277.5,117Q342,103,381,153Q420,203,421.5,256.5Q423,310,421.5,306.5Z
      "
          />
        </path>
      </svg>

      <h2>Selected Work</h2>
      <div className="project-grid">
        {projects.map((proj, index) => (
          <div className="project-card" key={index}>
            <img src={proj.image} alt={proj.title} />
            <div className="project-info">
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
