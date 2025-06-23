import React from "react";
import "./Skills.scss";

const CogBackground = () => {
  const cogs = Array.from({ length: 8 }).map((_, i) => {
    const size = Math.floor(Math.random() * 80) + 40;
    const top = Math.random() * 100 + "%";
    const left = Math.random() * 100 + "%";
    const duration = Math.random() * 15 + 10;
    const direction = Math.random() > 0.5 ? "normal" : "reverse";

    return (
      <svg
        key={i}
        className="cog"
        style={{
          top,
          left,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDirection: direction,
        }}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="30" stroke="#deb88744" strokeWidth="8" />
        <g stroke="#deb88744" strokeWidth="6">
          {[...Array(8)].map((_, j) => {
            const angle = (360 / 8) * j;
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 38;
            const y1 = 50 + Math.sin(rad) * 38;
            const x2 = 50 + Math.cos(rad) * 48;
            const y2 = 50 + Math.sin(rad) * 48;
            return <line key={j} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      </svg>
    );
  });

  return <>{cogs}</>;
};

const skills = {
  languages: [
    /* your skills list stays the same */
  ],
  frameworks: [
    /* your frameworks list stays the same */
  ],
  tools: [
    /* your tools list stays the same */
  ],
};

const Skills = () => {
  const renderCategory = (title, items) => (
    <>
      <h3>{title}</h3>
      <div className="skills-grid">
        {items.map((item, idx) => (
          <div className="skill-card" key={idx}>
            <img src={item.icon} alt={item.name} />
            <span className="tooltip">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
  const skills = {
    languages: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "C",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      },
      {
        name: "R",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
    ],
    frameworks: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Django REST",
        icon: "https://img.icons8.com/?size=100&id=qV-JzWYl9dzP&format=png&color=000000",
      },
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "Pandas",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      },
      {
        name: "NumPy",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
      },
    ],
    tools: [
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Jupyter",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Scikit-learn",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
      },
    ],
  };

  return (
    <section className="skills" id="skills">
      <CogBackground />
      <h2>My Skills</h2>
      {renderCategory("Programming Languages", skills.languages)}
      {renderCategory("Frameworks & Libraries", skills.frameworks)}
      {renderCategory("Data Science & Tools", skills.tools)}
    </section>
  );
};

export default Skills;
