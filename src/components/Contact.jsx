import React from "react";
import "./Contact.scss";
import ramyImg from "../assets/img/meee.png";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2>Contact Me</h2>

      <div className="contact-content">
        {/* Image on the left */}
        <div className="contact-image">
          <img src={ramyImg} alt="Ramy Lazghab" />
        </div>

        {/* Contact info on the right */}
        <div className="contact-info">
          <p className="email">
            <a href="mailto:ramy.lazghab@dauphine.tn">
              ramy.lazghab@dauphine.eu
            </a>
          </p>

          <div className="social-links">
            {/* GitHub */}
            <a
              href="https://github.com/Rblaze23"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="icon"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="28"
                height="28"
              >
                <path d="M12 .5A12 12 0 0 0 0 12.3c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.6-3.9-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.9-.8 2.3-1.4.1-.7.4-1.1.7-1.4-2.5-.3-5.2-1.3-5.2-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.8-.4.9 0 1.9.1 2.8.4 2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.7-2.7 5.6-5.3 5.9.4.3.8 1 .8 2v3c0 .3.2.6.8.5A11.98 11.98 0 0 0 24 12.3 12 12 0 0 0 12 .5z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/NightOwlx23"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="icon"
            >
              <svg
                viewBox="0 0 448 512"
                fill="currentColor"
                width="28"
                height="28"
              >
                <path d="M396.3 32H50.67A50.75 50.75 0 0 0 0 82.67v346.66A50.75 50.75 0 0 0 50.67 480h345.63A50.75 50.75 0 0 0 448 429.33V82.67A50.75 50.75 0 0 0 396.3 32zM317.5 356.4 221.9 262.5 126.3 356.4H65.67l132.4-138.2L65.67 80h60.63l95.6 91.94L317.5 80h60.63l-132.4 138.2 132.4 138.2z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ramy-lazghab-1464a8201/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon"
            >
              <svg
                viewBox="0 0 448 512"
                fill="currentColor"
                width="28"
                height="28"
              >
                <path d="M100.28 448H7.4V148.9h92.88zm-46.44-338C24.34 110 0 85.66 0 56.72S24.34 3.44 53.28 3.44 106.56 27.78 106.56 56.72 82.22 110 53.28 110zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.6V448H158.5V148.9h89v40.8h1.3c12.4-23.5 42.5-48.3 87.5-48.3 93.6 0 110.8 61.6 110.8 141.6V448z" />
              </svg>
            </a>
          </div>

          <div className="resume-wrapper">
            <a
              href="/assets/Resume.pdf"
              download="Ramy_Lazghab_Resume.pdf"
              className="resume-button"
            >
              Download My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
