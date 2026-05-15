import { useState } from "react";
import { supabase } from "../supabase";
import "./LessonFeedback.css";

const EASE_OPTIONS = [
  "Very easy",
  "Mostly easy",
  "Some parts were hard",
  "Much of it was hard",
];

const TRICKY_OPTIONS = {
  1: [
    "The needs vs wants explanation",
    "The sorting activity",
    "The joy test questions",
    "The impulse buying concept",
    "The quizzes",
    "Nothing was tricky",
  ],
  2: [
    "Understanding why saving is hard",
    "Using the savings calculator",
    "The tips for saving faster",
    "The save first rule",
    "The quizzes",
    "Nothing was tricky",
  ],
  3: [
    "The earning ideas",
    "The selling tips",
    "The allowance conversation section",
    "The 'what to do next' activity",
    "The quizzes",
    "Nothing was tricky",
  ],
};
export default function LessonFeedback({ lessonNumber, session, onComplete }) {
  const [ease, setEase] = useState(null);
  const [tricky, setTricky] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = ease && tricky;

const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);

    await supabase.from("lesson_feedback").insert([{
      session_id: session?.sessionId || null,
      lesson_number: lessonNumber,
      ease,
      tricky,
    }]);

    setSubmitted(true);
    setLoading(false);
    onComplete();
  };

  if (submitted) {
    return (
      <div className="lf-submitted fade-in">
        <span>✓</span> Thanks for the feedback.
      </div>
    );
  }

  return (
    <div className="lf-wrap fade-in">
      <div className="lf-header">
        <span className="lf-badge">Quick feedback</span>
        <p className="lf-intro">Two questions — takes 10 seconds.</p>
      </div>

      <div className="lf-question">
        <p className="lf-label">How easy was this lesson to follow?</p>
        <div className="lf-options">
          {EASE_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`lf-option ${ease === opt ? "selected" : ""}`}
              onClick={() => setEase(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="lf-question">
        <p className="lf-label">If anything was tricky, what was it?</p>
        <div className="lf-options">
          {(TRICKY_OPTIONS[lessonNumber] || []).map((opt) => (
            <button
              key={opt}
              className={`lf-option ${tricky === opt ? "selected" : ""}`}
              onClick={() => setTricky(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={!canSubmit || loading}
        style={{ opacity: canSubmit ? 1 : 0.4 }}
      >
        {loading ? "Saving..." : "Submit feedback"}
      </button>
    </div>
  );
}