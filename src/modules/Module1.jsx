import { useState } from "react";
import "./Module1.css";import LessonFeedback from "../components/LessonFeedback";

const STEPS = [
  "intro",
  "needs-wants",
  "sort",
  "joy-test",
  "quiz1",
  "impulse",
  "quiz2",
  "complete",
];

const SORT_ITEMS = [
  { id: 1, label: "🍕 Pizza with friends", category: "want" },
  { id: 2, label: "🏠 A place to live", category: "need" },
  { id: 3, label: "🎮 New video game", category: "want" },
  { id: 4, label: "🥤 Water to drink", category: "need" },
  { id: 5, label: "👟 Trainers (you already have shoes)", category: "want" },
  { id: 6, label: "🧥 A coat in winter", category: "need" },
];

export default function Module1({ onComplete, session }) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const progress = (stepIndex / (STEPS.length - 1)) * 100;

  const next = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="module">
      <div className="module-header">
        <button className="back-btn" onClick={prev} disabled={stepIndex === 0}>
          ← Back
        </button>
        <div className="module-label">Lesson 1 · Spending decisions</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "needs-wants" && <StepNeedsWants onNext={next} />}
        {step === "sort" && <StepSort onNext={next} />}
        {step === "joy-test" && <StepJoyTest onNext={next} />}
        {step === "quiz1" && <StepQuiz1 onNext={next} />}
        {step === "impulse" && <StepImpulse onNext={next} />}
        {step === "quiz2" && <StepQuiz2 onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">💸</div>
      <h2>So you've got some money.</h2>
      <p className="step-lead">
        Maybe it's pocket money. Maybe it's a birthday gift. Either way,
        it's yours — and that means you get to decide what to do with it.
      </p>
      <p className="step-body">
        Before we talk about saving and growing money (that comes later),
        let's start with the most basic question:
      </p>
      <div className="highlight-box">
        <p><strong>What should you spend it on?</strong></p>
        <p style={{ marginTop: "8px" }}>Not all spending is the same. Some things you buy will make you happy for years. Others you'll forget about in a week.</p>
      </div>
      <p className="step-body">
        The good news: there's a simple way to figure out which is which.
      </p>
      <button className="btn-primary" onClick={onNext}>Let's find out →</button>
    </div>
  );
}

function StepNeedsWants({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🤔</div>
      <h2>Needs vs Wants</h2>
      <p className="step-body">
        First, a distinction that matters. Not everything you spend money on is
        the same type of thing.
      </p>
      <div className="two-col">
        <div className="concept-card need">
          <div className="concept-icon">🏠</div>
          <h3>Needs</h3>
          <p>Things you genuinely can't do without. Food, shelter, clothes for the season, transport to school.</p>
          <p className="concept-note">Your parents probably cover these for you right now.</p>
        </div>
        <div className="concept-card want">
          <div className="concept-icon">🎮</div>
          <h3>Wants</h3>
          <p>Things that would be nice to have, but life goes on without them. Games, snacks, new shoes when your old ones still work.</p>
          <p className="concept-note">This is mostly what your pocket money is for.</p>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>Here's the important part:</strong> wanting something isn't bad.
          Spending on things you enjoy is perfectly fine. The skill is knowing
          <em> which</em> wants are worth your money.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Try sorting some →</button>
    </div>
  );
}

function StepSort({ onNext }) {
  const [placements, setPlacements] = useState({});
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});

  const unplaced = SORT_ITEMS.filter((item) => !placements[item.id]);
  const needs = SORT_ITEMS.filter((item) => placements[item.id] === "need");
  const wants = SORT_ITEMS.filter((item) => placements[item.id] === "want");
  const allPlaced = unplaced.length === 0;

  const handleChipTap = (item) => {
    if (checked && results[item.id] === true) return;
    setSelected((prev) => (prev === item.id ? null : item.id));
  };

  const handleZoneTap = (zone) => {
    if (!selected || checked) return;
    setPlacements((prev) => ({ ...prev, [selected]: zone }));
    setSelected(null);
    setChecked(false);
    setResults({});
  };

  const handleCheck = () => {
    const res = {};
    SORT_ITEMS.forEach((item) => {
      if (placements[item.id]) {
        res[item.id] = placements[item.id] === item.category;
      }
    });
    setResults(res);
    setChecked(true);
  };

  const allCorrect =
    checked &&
    Object.keys(results).length === SORT_ITEMS.length &&
    Object.values(results).every(Boolean);

  const getChipClass = (item) => {
    let cls = "sort-chip";
    if (selected === item.id) cls += " selected";
    if (checked && results[item.id] === true) cls += " chip-correct";
    if (checked && results[item.id] === false) cls += " chip-wrong";
    return cls;
  };

  return (
    <div className="step fade-in">
      <div className="step-emoji">🗂️</div>
      <h2>Sort these out</h2>
      <p className="step-body">
        <strong>Tap an item</strong> to select it, then <strong>tap a box</strong> to place it there.
      </p>
      {unplaced.length > 0 && (
        <div className="sort-bank">
          {unplaced.map((item) => (
            <button key={item.id} className={getChipClass(item)} onClick={() => handleChipTap(item)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
      {selected && <p className="sort-hint">Now tap a box below ↓</p>}
      <div className="drop-zones">
        <SortZone label="Needs 🏠" zone="need" items={needs} results={results} checked={checked} active={!!selected && !checked} onTap={() => handleZoneTap("need")} onChipTap={handleChipTap} selected={selected} />
        <SortZone label="Wants 🎮" zone="want" items={wants} results={results} checked={checked} active={!!selected && !checked} onTap={() => handleZoneTap("want")} onChipTap={handleChipTap} selected={selected} />
      </div>
      {allPlaced && !checked && (
        <button className="btn-primary" onClick={handleCheck}>Check my answers</button>
      )}
      {checked && !allCorrect && (
        <div className="feedback wrong">Not quite — tap the highlighted ones to move them to the right box.</div>
      )}
      {allCorrect && (
        <>
          <div className="feedback correct">✓ Perfect! You've got it.</div>
          <button className="btn-primary" style={{ marginTop: "16px" }} onClick={onNext}>Next →</button>
        </>
      )}
    </div>
  );
}

function SortZone({ label, items, results, checked, active, onTap, onChipTap, selected }) {
  return (
    <div className={`drop-zone ${active ? "over" : ""}`} onClick={onTap}>
      <div className="drop-zone-label">{label}</div>
      <div className="drop-zone-items">
        {items.map((item) => {
          let cls = "sort-chip placed";
          if (selected === item.id) cls += " selected";
          if (checked && results[item.id] === true) cls += " chip-correct";
          if (checked && results[item.id] === false) cls += " chip-wrong";
          return (
            <button key={item.id} className={cls} onClick={(e) => { e.stopPropagation(); onChipTap(item); }}>
              {item.label}
            </button>
          );
        })}
        {items.length === 0 && <span className="drop-hint">{active ? "Tap to place here" : "Empty"}</span>}
      </div>
    </div>
  );
}function StepJoyTest({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">✨</div>
      <h2>The two questions to ask before you buy anything</h2>
      <p className="step-body">
        When you're thinking about spending your money on something,
        run it through these two questions first.
      </p>
      <div className="test-cards">
        <div className="test-card">
          <div className="test-num">1</div>
          <div className="test-content">
            <h3>Will this bring me real joy or satisfaction?</h3>
            <p>Not just "it looks cool right now." Think about what it actually feels like to use it, eat it, do it. Is it an experience you'll remember? Something that helps you do something you love?</p>
          </div>
        </div>
        <div className="test-card">
          <div className="test-num">2</div>
          <div className="test-content">
            <h3>If it's a thing — will I still want it in 3 months?</h3>
            <p>Experiences (like ice cream with friends, or a trip) don't need this test. But if it's an object — a gadget, clothing, sports gear — honestly ask: will I still be using this in three months?</p>
          </div>
        </div>
      </div>
      <div className="example-box">
        <p className="example-label">Some examples</p>
        <div className="example-row">
          <span className="example-icon">✅</span>
          <p><strong>Saving up for a camera to make videos</strong> — passes both tests. You'll use it, it helps you do something you love, and it's still useful in six months.</p>
        </div>
        <div className="example-row">
          <span className="example-icon">✅</span>
          <p><strong>Buying proper football boots or a tennis racket</strong> — if you play regularly, this passes too. Good gear for something you genuinely do is a solid use of money.</p>
        </div>
        <div className="example-row">
          <span className="example-icon">⚠️</span>
          <p><strong>Buying the fourth version of something you barely used the first three times</strong> — worth pausing. The excitement is real, but so is the pattern.</p>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Got it →</button>
    </div>
  );
}

function StepQuiz1({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Buy it straight away — if you want it, get it",
    "Only buy things your parents approve of",
    "Ask yourself if it'll bring real joy and if you'll still want it in 3 months",
    "Never spend money on things you want — only needs",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What's the smart thing to do before buying something?</h2>
      <div className="quiz-options">
        {options.map((opt, i) => {
          let cls = "quiz-option";
          if (selected !== null) {
            if (i === correct) cls += " correct";
            else if (selected === i) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => setSelected(i)} disabled={selected !== null}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <>
          {selected === correct ? (
            <div className="feedback correct">✓ Exactly right. Two simple questions can save you a lot of regret.</div>
          ) : (
            <div className="feedback wrong">Not quite. The answer is: ask yourself if it'll bring real joy and if you'll still want it in 3 months.</div>
          )}
          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onNext}>Next →</button>
        </>
      )}
    </div>
  );
}

function StepImpulse({ onNext }) {
  const [timerDone, setTimerDone] = useState(false);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(0);
  const WAIT = 5;

  const startTimer = () => {
    setCounting(true);
    let c = 0;
    const interval = setInterval(() => {
      c++;
      setCount(c);
      if (c >= WAIT) {
        clearInterval(interval);
        setTimerDone(true);
        setCounting(false);
      }
    }, 1000);
  };

  return (
    <div className="step fade-in">
      <div className="step-emoji">⏱️</div>
      <h2>The pause that saves money</h2>
      <p className="step-body">
        One of the most useful things you can do before any purchase — especially
        bigger ones — is simply wait. Not forever. Just a little.
      </p>
      <div className="highlight-box">
        <p>
          <strong>Impulse buying</strong> is when you buy something because you feel
          excited right now, without thinking it through. That feeling fades.
          The thing you bought, and the empty wallet, stay.
        </p>
      </div>
      <p className="step-body">
        For small things, sleep on it one night. For bigger things, wait a week.
        You'll be surprised how often you change your mind.
      </p>
      <div className="timer-demo">
        <p className="timer-label">Try it — see what 5 seconds of thinking feels like:</p>
        {!counting && !timerDone && (
          <button className="btn-secondary" onClick={startTimer}>Start the pause</button>
        )}
        {counting && (
          <div className="timer-circle"><span>{WAIT - count}</span></div>
        )}
        {timerDone && (
          <div className="timer-done"><span>✓</span> That's it. That pause? It gets easier the more you do it.</div>
        )}
      </div>
      {timerDone && (
        <button className="btn-primary" onClick={onNext}>Makes sense →</button>
      )}
    </div>
  );
}

function StepQuiz2({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 1;
  const options = [
    "You should never buy things on impulse — wait at least a month",
    "Impulse buying means buying when you're excited without really thinking it through",
    "Impulse buying is fine as long as you have enough money",
    "Impulse buying only applies to expensive things",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What is impulse buying?</h2>
      <div className="quiz-options">
        {options.map((opt, i) => {
          let cls = "quiz-option";
          if (selected !== null) {
            if (i === correct) cls += " correct";
            else if (selected === i) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => setSelected(i)} disabled={selected !== null}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <>
          {selected === correct ? (
            <div className="feedback correct">✓ That's it. The key word is "without thinking." The pause is what makes the difference.</div>
          ) : (
            <div className="feedback wrong">Not quite. Impulse buying means buying when you're excited, without thinking it through — not just about the price.</div>
          )}
          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onNext}>Finish lesson →</button>
        </>
      )}
    </div>
  );
}

function StepComplete({ onComplete, session }) {
  const [feedbackDone, setFeedbackDone] = useState(false);

  return (
    <div className="step fade-in complete-step">
      <div className="complete-badge">🏅</div>
      <h2>Lesson 1 done!</h2>
      <p className="step-lead">You now know how to think before you spend.</p>

      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ The difference between needs and wants</li>
          <li>✓ Two questions to ask before any purchase</li>
          <li>✓ Why impulse buying costs more than you think</li>
          <li>✓ The pause — your most underrated money skill</li>
        </ul>
      </div>

      <LessonFeedback
        lessonNumber={1}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />

      {feedbackDone && (
        <>
          <p className="step-body">
            Next up: what to do when something costs more than you have right now.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 2 →
          </button>
        </>
      )}
    </div>
  );
}