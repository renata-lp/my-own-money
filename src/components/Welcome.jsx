import { useState, useEffect } from "react";
import "./Welcome.css";

export default function Welcome({ onStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className={`welcome ${visible ? "visible" : ""}`}>
      <div className="welcome-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="welcome-content">
        <div className="coin-animation">
          <div className="coin">
            <span>$</span>
          </div>
          <div className="coin-shadow" />
        </div>

        <div className="welcome-text">
          <p className="welcome-eyebrow">Welcome to</p>
          <h1 className="welcome-title">
            Your Own<br />Money
          </h1>
          <p className="welcome-subtitle">
            Are you ready?
          </p>
        </div>

        <div className="welcome-intro card">
          <p>
            So you're getting some money of your own. Maybe pocket money every week,
            maybe a gift. Either way — <strong>it's yours.</strong>
          </p>
          <p style={{ marginTop: "12px" }}>
            What you do with it matters more than how much it is.
            This is where you learn how to make it work for you.
          </p>
        </div>

        <div className="welcome-meta">
          <div className="meta-pill">📖 8 lessons</div>
          <div className="meta-pill">🎮 Quizzes & games</div>
          <div className="meta-pill">⏱ ~10 min each</div>
        </div>

        <button className="btn-primary welcome-cta" onClick={onStart}>
          Let's start →
        </button>

        <p className="welcome-note">
          No account needed. No personal information required.
        </p>

        <div className="welcome-footer">
          <a href="https://learnmoney.eu" target="_blank" rel="noopener noreferrer" className="learnmoney-link">
            A LearnMoney initiative
          </a>
          <span className="footer-divider">·</span>
          <span className="copyright">© 2025 LearnMoney. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}