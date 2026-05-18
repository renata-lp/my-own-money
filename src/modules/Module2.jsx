import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module2.css";

const STEPS = [
  "intro",
  "why-save",
  "money-in",
  "goal-setter",
  "quiz1",
  "how-to-save",
  "quiz2",
  "complete",
];

export default function Module2({ onComplete, session, onHome }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [suggested, setSuggested] = useState({ amount: "", frequency: "week" });
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
        <div className="module-label">Lesson 2 · Saving for something bigger</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "why-save" && <StepWhySave onNext={next} />}
        {step === "money-in" && <StepMoneyIn onNext={next} onSuggestion={(s) => setSuggested(s)} />}
        {step === "goal-setter" && <StepGoalSetter onNext={next} suggested={suggested} />}
        {step === "quiz1" && <StepQuiz1 onNext={next} />}
        {step === "how-to-save" && <StepHowToSave onNext={next} />}
        {step === "quiz2" && <StepQuiz2 onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🎯</div>
      <h2>What if it costs more than you have?</h2>
      <p className="step-lead">
        Sometimes the thing you really want costs more than your pocket money for the week. That's completely normal — and there's a straightforward way to deal with it.
      </p>
      <div className="highlight-box">
        <p>
          <strong>Saving</strong> means setting aside some of your money regularly, so that it adds up over time into something bigger.
        </p>
      </div>
      <p className="step-body">
        Now, some bigger things — a new device, an expensive game — will probably be covered by parents or grandparents for birthdays or holidays. That's fine. But plenty of things fall in the middle: not cheap enough to buy straight away, not expensive enough to wait for a special occasion.
      </p>
      <p className="step-body">
        That's exactly where saving comes in. And the habit you build saving for smaller things will serve you well for much bigger ones later.
      </p>
      <button className="btn-primary" onClick={onNext}>Let's go →</button>
    </div>
  );
}

function StepWhySave({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🧠</div>
      <h2>Why saving is harder than it sounds</h2>
      <p className="step-body">
        Your brain is wired to prefer things <em>now</em> over things <em>later</em>. A smaller reward today feels more real than a bigger reward in three months. This isn't a flaw — it's just how human brains work.
      </p>
      <p className="step-body">
        But here's the thing: the people who learn to wait for bigger rewards tend to end up with more of what they actually want. The trick is making the future feel real.
      </p>
      <div className="two-col">
        <div className="concept-card need">
          <div className="concept-icon">⚡</div>
          <h3>Spending now</h3>
          <p>Feels good immediately. But you might end up with things you don't care about in a month — and nothing left for what you really wanted.</p>
        </div>
        <div className="concept-card want">
          <div className="concept-icon">🏆</div>
          <h3>Saving for a goal</h3>
          <p>Takes patience. But when you get there, it feels like a real achievement — not just something you bought without thinking.</p>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>The key:</strong> have a specific goal in mind. "Save money" is vague and easy to give up on. "Save €30 for headphones by next month" is concrete — and much easier to stick to.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Set a goal →</button>
    </div>
  );
}
function StepMoneyIn({ onNext, onSuggestion }) {
  const [frequency, setFrequency] = useState(null);
  const [bracket, setBracket] = useState(null);
  const [noMoneyYet, setNoMoneyYet] = useState(false);

  const frequencies = [
    { id: "weekly", label: "Weekly pocket money" },
    { id: "monthly", label: "Monthly pocket money" },
    { id: "occasional", label: "Birthdays and holidays mainly" },
    { id: "mix", label: "A mix of regular and occasional" },
    { id: "none", label: "I don't get money regularly yet" },
  ];

  const brackets = {
    weekly: [
      { label: "Less than €5 a week", weekly: 2 },
      { label: "€5–10 a week", weekly: 5 },
      { label: "€10–20 a week", weekly: 10 },
      { label: "More than €20 a week", weekly: 15 },
    ],
    monthly: [
      { label: "Less than €20 a month", weekly: 3 },
      { label: "€20–50 a month", weekly: 8 },
      { label: "€50–100 a month", weekly: 15 },
      { label: "More than €100 a month", weekly: 20 },
    ],
    occasional: [
      { label: "Less than €50 a year", lump: 15 },
      { label: "€50–150 a year", lump: 40 },
      { label: "€150–300 a year", lump: 80 },
      { label: "More than €300 a year", lump: 150 },
    ],
    mix: [
      { label: "Less than €50 a year total", lump: 15 },
      { label: "€50–150 a year total", lump: 40 },
      { label: "€150–300 a year total", lump: 80 },
      { label: "More than €300 a year total", lump: 150 },
    ],
    none: [
      { label: "A small amount — say €2–5 a week", weekly: 2 },
      { label: "A medium amount — say €5–10 a week", weekly: 5 },
      { label: "A larger amount — say €10–20 a week", weekly: 10 },
    ],
  };

  const handleFrequency = (id) => {
    setFrequency(id);
    setBracket(null);
    setNoMoneyYet(id === "none");
  };

  const handleBracket = (b) => {
    setBracket(b);
    if (b.lump) {
      onSuggestion({ amount: String(Math.round(b.lump * 0.4)), frequency: "lump", lump: b.lump });
    } else {
      const suggested = Math.max(1, Math.round(b.weekly * 0.3));
      onSuggestion({ amount: String(suggested), frequency: "week", weekly: b.weekly });
    }
  };

  const canNext = frequency && bracket;

  return (
    <div className="step fade-in">
      <div className="step-emoji">💰</div>
      <h2>First — what money do you have coming in?</h2>
      <p className="step-body">
        Before we work out how to save, let's think about what you're working with.
      </p>

      {noMoneyYet && (
        <div className="highlight-box">
          <p>That's fine — lots of people start here. For this exercise, we'll imagine you get a small amount regularly. Pick one below and use it to practise the calculation — it's a useful skill even before the money arrives.</p>
        </div>
      )}

      <p className="ob-label">How do you usually get money?</p>
      <div className="ob-options">
        {frequencies.map((f) => (
          <button
            key={f.id}
            className={`ob-option ${frequency === f.id ? "selected" : ""}`}
            onClick={() => handleFrequency(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {frequency && (
        <>
          <p className="ob-label" style={{ marginTop: "8px" }}>
            {frequency === "occasional" || frequency === "mix"
              ? "Roughly how much do you receive in a typical year?"
              : frequency === "none"
              ? "Suppose your family decided to give you a regular amount — what would feel realistic?"
              : "Roughly how much do you get?"}
          </p>
          <div className="ob-options">
            {brackets[frequency].map((b, i) => (
              <button
                key={i}
                className={`ob-option ${bracket === b ? "selected" : ""}`}
                onClick={() => handleBracket(b)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </>
      )}

      {canNext && (
        <button className="btn-primary" onClick={onNext}>
          Now let's set a goal →
        </button>
      )}
    </div>
  );
}
function StepGoalSetter({ onNext, suggested }) {
  const [goal, setGoal] = useState("");
  const [cost, setCost] = useState("");
  const [weekly, setWeekly] = useState(suggested?.amount || "");
  const [submitted, setSubmitted] = useState(false);

  const isLump = suggested?.frequency === "lump";
  const costNum = parseFloat(cost) || 0;
  const weeklyNum = parseFloat(weekly) || 0;
  const weeks = weeklyNum > 0 ? Math.ceil(costNum / weeklyNum) : null;
  const months = weeks ? (weeks / 4.33).toFixed(1) : null;
  const occasions = isLump && weeklyNum > 0 ? Math.ceil(costNum / weeklyNum) : null;
  const canSubmit = goal.trim() && costNum > 0 && weeklyNum > 0;

  return (
    <div className="step fade-in">
      <div className="step-emoji">🧮</div>
      <h2>Let's work out your goal</h2>
      <p className="step-body">
        Think of something you genuinely want that costs more than you have right now. Fill in the boxes below.
      </p>
      <p className="step-body">
        Tip: if you still want it after saving for a few weeks, you probably actually want it.
      </p>

      {suggested?.amount && (
        <div className="highlight-box">
          <p>
            {isLump
              ? `💡 Based on what you told us, we've suggested an amount you could set aside next time you receive money. Feel free to change it.`
              : suggested?.frequency === "week" && suggested?.weekly
              ? `💡 Suppose your family gave you €${suggested.weekly} a week — we've suggested setting aside €${suggested.amount} of that for your goal. Feel free to change it.`
              : `💡 Based on what you told us, we've suggested a saving amount below. Feel free to change it.`}
          </p>
        </div>
      )}

      <div className="goal-form">
        <div className="goal-field">
          <label>What are you saving for?</label>
          <input
            type="text"
            placeholder="e.g. a book, headphones, art supplies..."
            value={goal}
            onChange={(e) => { setGoal(e.target.value); setSubmitted(false); }}
          />
        </div>
        <div className="goal-field">
          <label>How much does it cost?</label>
          <input
            type="number"
            placeholder="e.g. 25"
            value={cost}
            onChange={(e) => { setCost(e.target.value); setSubmitted(false); }}
            min="0"
          />
        </div>
        <div className="goal-field">
          <label>
            {isLump
              ? "How much could you set aside next time you receive money?"
              : "How much can you save each week?"}
          </label>
          <input
            type="number"
            placeholder="e.g. 3"
            value={weekly}
            onChange={(e) => { setWeekly(e.target.value); setSubmitted(false); }}
            min="0"
          />
        </div>
        <button
          className="btn-primary"
          onClick={() => setSubmitted(true)}
          disabled={!canSubmit}
          style={{ opacity: canSubmit ? 1 : 0.5 }}
        >
          Calculate →
        </button>
      </div>

      {submitted && (weeks || occasions) && (
        <div className="goal-result">
          <div className="result-headline">
            <span className="result-emoji">📅</span>
            <p>
              {isLump ? (
                <>
                  If you set aside <strong>€{weekly}</strong> each time you receive money, you'll reach your goal for <strong>{goal}</strong> after <strong>{occasions} {occasions === 1 ? "occasion" : "occasions"}</strong>.
                </>
              ) : (
                <>
                  If you save <strong>€{weekly}</strong> per week, you'll have enough for <strong>{goal}</strong> in <strong>{weeks} weeks</strong>
                  {months > 0 && <span> (about {months} months)</span>}.
                </>
              )}
            </p>
          </div>
          {!isLump && weeks <= 4 && <p className="result-note green">That's less than a month — very doable!</p>}
          {!isLump && weeks > 4 && weeks <= 12 && <p className="result-note yellow">That's a few months of patience — but totally achievable.</p>}
          {!isLump && weeks > 12 && <p className="result-note orange">That's a longer wait. Could you save a bit more each week, or find other ways to top up?</p>}
          {isLump && occasions === 1 && <p className="result-note green">Just one occasion — you could have it very soon!</p>}
          {isLump && occasions === 2 && <p className="result-note yellow">Two occasions — birthday and one more, and you're there.</p>}
         {isLump && occasions > 2 && <p className="result-note orange">That's a few occasions away. Could you set aside a bit more each time you get money?</p>}
          <button className="btn-primary" style={{ marginTop: "16px" }} onClick={onNext}>Next →</button>
        </div>
      )}
    </div>
  );
}
function StepQuiz1({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Spend as little as possible on everything",
    "Wait until you have a lot of money before starting to save",
    "Set a specific goal and put aside a fixed amount regularly",
    "Only save if your parents tell you to",
  ];
  const feedback = [
    "Not quite. Spending as little as possible on everything isn't sustainable and isn't the point. The answer is a specific goal with a regular saving habit.",
    "Not quite. Waiting until you have a lot of money usually means never starting. A small amount saved regularly from the start works much better.",
    "✓ Exactly. A specific goal and a regular habit — that's the whole formula.",
    "Not quite. Saving because you're told to rarely lasts. The answer is your own specific goal and a regular habit — that's what actually works.",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What makes saving actually work?</h2>
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
          <div className={`feedback ${selected === correct ? "correct" : "wrong"}`}>
            {feedback[selected]}
          </div>
          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onNext}>Next →</button>
        </>
      )}
    </div>
  );
}
function StepQuiz2({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 0;
  const options = [
    "Save first, then spend what's left",
    "Spend first, then save whatever is left over",
    "Only save when you feel like it",
    "Save everything and never spend",
  ];

  const feedback = [
    "✓ Save first, spend what's left. Simple — and it actually works.",
    "Not quite. If you spend first, there's usually nothing left to save. The order matters — save first, then enjoy what remains.",
    "Not quite. Saving only when you feel like it means it almost never happens. A fixed habit — save first, every time — is what actually works.",
    "Not quite. The goal isn't to save everything — it's to save consistently before spending. You're allowed to enjoy what's left after saving.",
  ];

  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What's the golden rule of saving?</h2>
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
          <div className={`feedback ${selected === correct ? "correct" : "wrong"}`}>
            {feedback[selected]}
          </div>
          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onNext}>
            Finish lesson →
          </button>
        </>
      )}
    </div>
  );
}
function StepHowToSave({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">💡</div>
      <h2>Ways to make saving easier — and faster</h2>
      <p className="step-body">
        Saving from pocket money alone can take a while. Here are some legitimate ways to speed things up.
      </p>
      <div className="tips-list">
        <div className="tip-card">
          <div className="tip-icon">🎂</div>
          <div className="tip-content">
            <h3>Birthday and holiday gifts</h3>
            <p>If family ask what you want, tell them you're saving for something specific and you'd love cash or a contribution. Most adults will respect that — and some will be impressed.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">📦</div>
          <div className="tip-content">
            <h3>Sell things you no longer use</h3>
            <p>Old games, books, clothes that don't fit, toys you've grown out of. If it's in good condition, someone else will want it. With a parent's help, platforms like Vinted or local markets work well.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">🛠️</div>
          <div className="tip-content">
            <h3>Small jobs and favours</h3>
            <p>Helping a neighbour, doing extra chores at home, walking a dog, helping with a younger sibling. Small amounts add up — and you learn something along the way.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">✂️</div>
          <div className="tip-content">
            <h3>Spend a little less on the small stuff</h3>
            <p>You don't have to give up everything. But if you're buying a snack every day, what happens if you do it three times a week instead? That difference might be exactly what you need.</p>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>One rule that helps:</strong> when you get money, set aside your saving amount <em>first</em> — before you spend anything. What's left is yours to enjoy. If you do it the other way round, there's often nothing left to save.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Almost there →</button>
    </div>
  );
}


function StepComplete({ onComplete, session }) {
  const [feedbackDone, setFeedbackDone] = useState(false);

  return (
    <div className="step fade-in complete-step">
      <div className="complete-badge">🏅</div>
      <h2>Lesson 2 done!</h2>
      <p className="step-lead">You now know how to save with a purpose.</p>

      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ Why saving is harder than it sounds — and why that's normal</li>
          <li>✓ How to set a real, concrete savings goal</li>
          <li>✓ Ways to earn and save faster</li>
          <li>✓ The golden rule: save first, spend what's left</li>
        </ul>
      </div>

      <LessonFeedback
        lessonNumber={2}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />

      {feedbackDone && (
        <>
          <p className="step-body">
            Next up: other ways to grow your money pile — beyond just saving.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 3 →
          </button>
        </>
      )}
    </div>
  );
}