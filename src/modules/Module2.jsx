import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module2.css";

const STEPS = [
  "intro",
  "why-save",
  "goal-setter",
  "quiz1",
  "how-to-save",
  "quiz2",
  "complete",
];

export default function Module2({ onComplete, session }) {
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
        <div className="module-label">Lesson 2 · Saving for something bigger</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "why-save" && <StepWhySave onNext={next} />}
        {step === "goal-setter" && <StepGoalSetter onNext={next} />}
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

function StepGoalSetter({ onNext }) {
  const [goal, setGoal] = useState("");
  const [cost, setCost] = useState("");
  const [weekly, setWeekly] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const costNum = parseFloat(cost) || 0;
  const weeklyNum = parseFloat(weekly) || 0;
  const weeks = weeklyNum > 0 ? Math.ceil(costNum / weeklyNum) : null;
  const months = weeks ? (weeks / 4.33).toFixed(1) : null;
  const canSubmit = goal.trim() && costNum > 0 && weeklyNum > 0;

  return (
    <div className="step fade-in">
      <div className="step-emoji">🧮</div>
      <h2>Let's work out your goal</h2>
      <p className="step-body">
        Think of something you genuinely want that costs more than you have right now — ideally something in the range of one to a few weeks of saving. Fill in the boxes below.
      </p>
      <p className="step-body">
        Tip: if you still want it after saving for a few weeks, you probably actually want it.
      </p>
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
          <label>How much can you save each week?</label>
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

      {submitted && weeks && (
        <div className="goal-result">
          <div className="result-headline">
            <span className="result-emoji">📅</span>
            <p>
              If you save <strong>{weekly}</strong> per week, you'll have enough for
              <strong> {goal}</strong> in <strong>{weeks} weeks</strong>
              {months > 0 && <span> (about {months} months)</span>}.
            </p>
          </div>
          {weeks <= 4 && <p className="result-note green">That's less than a month — very doable!</p>}
          {weeks > 4 && weeks <= 12 && <p className="result-note yellow">That's a few months of patience — but totally achievable.</p>}
          {weeks > 12 && <p className="result-note orange">That's a longer wait. Could you save a bit more each week, or find other ways to top up?</p>}
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
          {selected === correct ? (
            <div className="feedback correct">✓ Exactly. A specific goal and a regular habit — that's the whole formula.</div>
          ) : (
            <div className="feedback wrong">Not quite. The answer is: set a specific goal and put aside a fixed amount regularly. Vague intentions don't work — concrete plans do.</div>
          )}
          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onNext}>Next →</button>
        </>
      )}
    </div>
  );
}function StepHowToSave({ onNext }) {
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

function StepQuiz2({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 0;
  const options = [
    "Save first, then spend what's left",
    "Spend first, then save whatever is left over",
    "Only save when you feel like it",
    "Save everything and never spend",
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
          {selected === correct ? (
            <div className="feedback correct">✓ Save first, spend what's left. Simple — and it actually works.</div>
          ) : (
            <div className="feedback wrong">Not quite. If you spend first and save what's left, there's usually nothing left. Save first — always.</div>
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