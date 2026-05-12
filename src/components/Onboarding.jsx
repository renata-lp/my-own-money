import { useState } from "react";
import "./Onboarding.css";

const COUNTRIES = [
  "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Canada",
  "Chile", "Colombia", "Denmark", "Finland", "France", "Germany",
  "Greece", "India", "Ireland", "Italy", "Japan", "Mexico",
  "Netherlands", "New Zealand", "Norway", "Peru", "Poland", "Portugal",
  "South Africa", "Spain", "Sweden", "Switzerland", "United Kingdom",
  "United States", "Other"
];

const ENGLISH_OPTIONS = [
  "English is their first language",
  "English is their second language and they're comfortable with it",
  "English is their second language and some parts were hard to follow",
  "They needed help from me or someone else to follow along",
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    ageRange: null,
    country: "",
    englishLevel: null,
  });
  const [countryInput, setCountryInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = COUNTRIES.filter((c) =>
    c.toLowerCase().startsWith(countryInput.toLowerCase()) && countryInput.length > 0
  );

  const selectCountry = (country) => {
    setCountryInput(country);
    setAnswers((a) => ({ ...a, country }));
    setShowSuggestions(false);
  };

  const handleNext = () => {
    if (step < 2) setStep((s) => s + 1);
    else onComplete(answers);
  };

  const canNext = [
    !!answers.ageRange,
    !!answers.country,
    !!answers.englishLevel,
  ][step];

  return (
    <div className="onboarding">
      <div className="onboarding-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <div className="onboarding-content">
        <div className="onboarding-progress">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`ob-dot ${i <= step ? "active" : ""}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="ob-step fade-in">
            <div className="ob-emoji">👋</div>
            <h2>Before you start — 3 quick questions</h2>
            <p className="ob-body">
              This helps us understand who's using Your Own Money and make it better. No personal details needed.
            </p>
            <p className="ob-label">How old is your child?</p>
            <div className="ob-options">
              {["8–10", "11–13", "14–16", "17 or older"].map((age) => (
                <button
                  key={age}
                  className={`ob-option ${answers.ageRange === age ? "selected" : ""}`}
                  onClick={() => setAnswers((a) => ({ ...a, ageRange: age }))}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="ob-step fade-in">
            <div className="ob-emoji">🌍</div>
            <h2>Which country are you based in?</h2>
            <p className="ob-body">Start typing and we'll find it.</p>
            <div className="country-input-wrap">
              <input
                type="text"
                className="country-input"
                placeholder="e.g. Netherlands, Brazil..."
                value={countryInput}
                onChange={(e) => {
                  setCountryInput(e.target.value);
                  setAnswers((a) => ({ ...a, country: "" }));
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="country-suggestions">
                  {suggestions.map((c) => (
                    <button
                      key={c}
                      className="country-suggestion"
                      onClick={() => selectCountry(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {answers.country && (
              <p className="country-confirmed">✓ {answers.country}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="ob-step fade-in">
            <div className="ob-emoji">💬</div>
            <h2>English and your child</h2>
            <p className="ob-body">
              This helps us get the language level right.
            </p>
            <div className="ob-options">
              {ENGLISH_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`ob-option ${answers.englishLevel === opt ? "selected" : ""}`}
                  onClick={() => setAnswers((a) => ({ ...a, englishLevel: opt }))}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="ob-footer">
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!canNext}
            style={{ opacity: canNext ? 1 : 0.4 }}
          >
            {step < 2 ? "Next →" : "Let's start →"}
          </button>
          {step > 0 && (
            <button className="btn-secondary" onClick={() => setStep((s) => s - 1)}>
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}