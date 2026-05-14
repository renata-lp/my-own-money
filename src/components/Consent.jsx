import { useState } from "react";
import { supabase } from "../supabase";
import "./Consent.css";

const AGE_OPTIONS = ["8–10", "11–13", "14–16", "17 or older"];

export default function Consent({ onComplete }) {
  const [path, setPath] = useState(null);
  const [ageRange, setAgeRange] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canStart = agreed && path && ageRange;

  const handleStart = async () => {
    if (!canStart) return;
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("sessions")
      .insert([{ path, age_range: ageRange }])
      .select()
      .single();

    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    onComplete({ sessionId: data.id, path, ageRange });
  };

  return (
    <div className="consent">
      <div className="consent-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <div className="consent-content">
        <div className="consent-card">
          <div className="consent-emoji">🙋</div>
          <h2>A moment for a grown-up</h2>
          <p className="consent-body">
            Hey! Before the lessons start — can you get a parent, guardian, or trusted adult to check this?
          </p>
          <div className="consent-divider" />
          <p className="consent-body">
            <strong>Hi there.</strong> Your Own Money stores a small amount of anonymous data to help us improve the tool — things like which lessons were completed and how easy they were to follow. No names, no personal details, no accounts.
          </p>

          <p className="consent-label">Who is starting this session?</p>
          <div className="consent-options">
            <button
              className={`consent-option ${path === "parent" ? "selected" : ""}`}
              onClick={() => setPath("parent")}
            >
              👨‍👩‍👧 I'm a parent or guardian
            </button>
            <button
              className={`consent-option ${path === "independent" ? "selected" : ""}`}
              onClick={() => setPath("independent")}
            >
              🙋 I'm doing this on my own
            </button>
          </div>

          <p className="consent-label">How old is the child doing this?</p>
          <div className="consent-options">
            {AGE_OPTIONS.map((age) => (
              <button
                key={age}
                className={`consent-option ${ageRange === age ? "selected" : ""}`}
                onClick={() => setAgeRange(age)}
              >
                {age}
              </button>
            ))}
          </div>

          <label className="consent-checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>I understand that anonymous session data will be stored to improve this tool.</span>
          </label>

          {error && <p className="consent-error">{error}</p>}

          <button
            className="btn-primary"
            onClick={handleStart}
            disabled={!canStart || loading}
            style={{ opacity: canStart ? 1 : 0.4 }}
          >
            {loading ? "Starting..." : "Hand back to your child →"}
          </button>
        </div>
      </div>
    </div>
  );
}