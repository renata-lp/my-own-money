import { useState } from "react";
import "./Module1.css";

const STEPS = [
  "intro",
  "needs-wants",
  "drag-drop",
  "joy-test",
  "quiz1",
  "impulse",
  "quiz2",
  "complete",
];

const DRAG_ITEMS = [
  { id: 1, label: "🍕 Pizza with friends", category: "want" },
  { id: 2, label: "🏠 A place to live", category: "need" },
  { id: 3, label: "🎮 New video game", category: "want" },
  { id: 4, label: "🥤 Water to drink", category: "need" },
  { id: 5, label: "👟 Trainers (you already have shoes)", category: "want" },
  { id: 6, label: "🧥 Winter coat in December", category: "need" },
];

export default function Module1({ onComplete }) {
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
        {step === "drag-drop" && <StepDragDrop onNext={next} />}
        {step === "joy-test" && <StepJoyTest onNext={next} />}
        {step === "quiz1" && <StepQuiz1 onNext={next} />}
        {step === "impulse" && <StepImpulse onNext={next} />}
        {step === "quiz2" && <StepQuiz2 onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} />}
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
        <p style={{marginTop: "8px"}}>Not all spending is the same. Some things you buy will make you happy for years. Others you'll forget about in a week.</p>
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

function StepDragDrop({ onNext }) {
  const [bank, setBank] = useState(DRAG_ITEMS);
  const [needs, setNeeds] = useState([]);
  const [wants, setWants] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [overZone, setOverZone] = useState(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});

  const allPlaced = bank.length === 0;

  const handleDragStart = (item) => setDragging(item);
  const handleDragEnd = () => { setDragging(null); setOverZone(null); };

  const handleDrop = (zone) => {
    if (!dragging) return;
    setBank((b) => b.filter((i) => i.id !== dragging.id));
    setNeeds((b) => b.filter((i) => i.id !== dragging.id));
    setWants((b) => b.filter((i) => i.id !== dragging.id));
    if (zone === "need") setNeeds((b) => [...b, dragging]);
    if (zone === "want") setWants((b) => [...b, dragging]);
    setOverZone(null);
    setDragging(null);
    setChecked(false);
    setResults({});
  };

  const handleCheck = () => {
    const res = {};
    [...needs, ...wants].forEach((item) => {
      const zone = needs.find(i => i.id === item.id) ? "need" : "want";
      res[item.id] = zone === item.category;
    });
    setResults(res);
    setChecked(true);
  };

  const allCorrect = checked && Object.values(results).every(Boolean) && Object.keys(results).length === DRAG_ITEMS.length;

  return (
    <div className="step fade-in">
      <div className="step-emoji">🗂️</div>
      <h2>Sort these out</h2>
      <p className="step-body">
        Drag each item into the right box. Some might surprise you.
      </p>

      {bank.length > 0 && (
        <div className="drag-bank">
          {bank.map((item) => (
            <DragChip
              key={item.id}
              item={item}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragging={dragging?.id === item.id}
            />
          ))}
        </div>
      )}

      <div className="drop-zones">
        <DropZone
          label="Needs 🏠"
          items={needs}
          zone="need"
          over={overZone === "need"}
          results={results}
          onDragOver={() => setOverZone("need")}
          onDragLeave={() => setOverZone(null)}
          onDrop={() => handleDrop("need")}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
        <DropZone
          label="Wants 🎮"
          items={wants}
          zone="want"
          over={overZone === "want"}
          results={results}
          onDragOver={() => setOverZone("want")}
          onDragLeave={() => setOverZone(null)}
          onDrop={() => handleDrop("want")}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </div>

      {allPlaced && !checked && (
        <button className="btn-primary" onClick={handleCheck}>Check my answers</button>
      )}

      {checked && !allCorrect && (
        <div className="feedback wrong">
          Not quite — look at the highlighted ones and try moving them.
        </div>
      )}

      {allCorrect && (
        <>
          <div className="feedback correct">✓ Perfect! You've got it.</div>
          <button className="btn-primary" style={{marginTop: "16px"}} onClick={onNext}>Next →</button>
        </>
      )}
    </div>
  );
}

function DragChip({ item, onDragStart, onDragEnd, dragging, correct }) {
  let chipClass = "drag-chip";
  if (dragging) chipClass += " dragging";
  if (correct === true) chipClass += " chip-correct";
  if (correct === false) chipClass += " chip-wrong";

  return (
    <div
      className={chipClass}
      draggable
      onDragStart={() => onDragStart(item)}
      onDragEnd={onDragEnd}
    >
      {item.label}
    </div>
  );
}

function DropZone({ label, items, zone, over, results, onDragOver, onDragLeave, onDrop, onDragStart, onDragEnd }) {
  return (
    <div
      className={`drop-zone ${over ? "over" : ""}`}
      onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="drop-zone-label">{label}</div>
      <div className="drop-zone-items">
        {items.map((item) => (
          <DragChip
            key={item.id}
            item={item}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            correct={results[item.id] !== undefined ? results[item.id] : undefined}
          />
        ))}
        {items.length === 0 && <span className="drop-hint">Drop here</span>}
      </div>
    </div>
  );
}

function StepJoyTest({ onNext }) {
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
            <p>Experiences (like ice cream with friends, or a trip) don't need this test. But if it's an object — a gadget, a toy, clothing — honestly ask: will I still be using this in three months?</p>
          </div>
        </div>
      </div>

      <div className="example-box">
        <p className="example-label">Two examples</p>
        <div className="example-row">
          <span className="example-icon">✅</span>
          <p><strong>Saving up for a decent camera to make videos</strong> — passes both tests. You'll use it, it helps you do something you love, and it's still useful in six months.</p>
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
            <button
              key={i}
              className={cls}
              onClick={() => setSelected(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <>
          {selected === correct ? (
            <div className="feedback correct">
              ✓ Exactly right. Two simple questions can save you a lot of regret.
            </div>
          ) : (
            <div className="feedback wrong">
              Not quite. The answer is: ask yourself if it'll bring real joy and if you'll still want it in 3 months.
            </div>
          )}
          <button className="btn-primary" style={{marginTop: "20px"}} onClick={onNext}>
            Next →
          </button>
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
        <p className="timer-label">
          Try it — see what 5 seconds of thinking feels like:
        </p>
        {!counting && !timerDone && (
          <button className="btn-secondary" onClick={startTimer}>
            Start the pause
          </button>
        )}
        {counting && (
          <div className="timer-circle">
            <span>{WAIT - count}</span>
          </div>
        )}
        {timerDone && (
          <div className="timer-done">
            <span>✓</span> That's it. That pause? It gets easier the more you do it.
          </div>
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
            <button
              key={i}
              className={cls}
              onClick={() => setSelected(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <>
          {selected === correct ? (
            <div className="feedback correct">
              ✓ That's it. The key word is "without thinking." The pause is what makes the difference.
            </div>
          ) : (
            <div className="feedback wrong">
              Not quite. Impulse buying means buying when you're excited, without thinking it through — not just about the price.
            </div>
          )}
          <button className="btn-primary" style={{marginTop: "20px"}} onClick={onNext}>
            Finish lesson →
          </button>
        </>
      )}
    </div>
  );
}

function StepComplete({ onComplete }) {
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

      <p className="step-body">
        Next up: what to do when something costs more than you have right now.
      </p>

      <button className="btn-green" onClick={onComplete}>
        Continue to Lesson 2 →
      </button>
    </div>
  );
}