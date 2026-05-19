import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module3.css";

const STEPS = [
  "intro",
  "earn-more",
  "sell-smart",
  "allowance-convo",
  "quiz1",
  "track-it",
  "quiz2",
  "complete",
];

export default function Module3({ onComplete, session, onHome }) {
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
        <div className="module-label">Lesson 3 · Growing your money pile</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
        <button className="home-btn" onClick={onHome}>⌂</button>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "earn-more" && <StepEarnMore onNext={next} />}
        {step === "sell-smart" && <StepSellSmart onNext={next} />}
        {step === "allowance-convo" && <StepAllowanceConvo onNext={next} />}
        {step === "quiz1" && <StepQuiz1 onNext={next} />}
        {step === "track-it" && <StepTrackIt onNext={next} />}
        {step === "quiz2" && <StepQuiz2 onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📈</div>
      <h2>More money in, more options.</h2>
      <p className="step-lead">
        Saving is powerful — but it works faster when there's more to save from. This lesson is about growing the pile, not just protecting it.
      </p>
      <p className="step-body">
        There are three ways to have more money available for your goals:
      </p>
      <div className="three-ways">
        <div className="way-card">
          <div className="way-icon">💪</div>
          <h3>Earn more</h3>
          <p>Find ways to bring in money beyond what you already receive.</p>
        </div>
        <div className="way-card">
          <div className="way-icon">📦</div>
          <h3>Sell smart</h3>
          <p>Turn things you no longer need into money for things you actually want.</p>
        </div>
        <div className="way-card">
          <div className="way-icon">🗣️</div>
          <h3>Have the conversation</h3>
          <p>Talk to your parents about a regular allowance — even if they don't think it's the right time, it will be helpful to understand each others' expectations and concerns.</p>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Let's look at each →</button>
    </div>
  );
}

function StepEarnMore({ onNext }) {
  const [revealed, setRevealed] = useState([]);

  const ideas = [
    {
      id: 1,
      emoji: "🏡",
      title: "Help at home",
      body: "Extra chores beyond your usual ones — washing the car, cleaning out the garden, organising a room. Make it clear these are extras, not the things you're expected to do anyway.",
    },
    {
      id: 2,
      emoji: "🐕",
      title: "Help neighbours",
      body: "Walking a dog, watering plants while someone's away, carrying shopping. Neighbours often need small help and are happy to pay a fair amount for it.",
    },
    {
      id: 3,
      emoji: "👶",
      title: "Help with younger kids",
      body: "If you're old enough, helping look after a younger sibling or a neighbour's child for an hour. Responsible, useful, and well-paid relative to other options.",
    },
    {
      id: 4,
      emoji: "🎨",
      title: "Use a skill you have",
      body: "Can you draw, make things, bake, code, or play an instrument? Skills can become small services — making cards, teaching a younger child something, creating things to sell.",
    },
    {
      id: 5,
      emoji: "♻️",
      title: "Collect and return",
      body: "In some countries you can return bottles and cans for a small deposit. It adds up, especially if you collect from family and neighbours too.",
    },
  ];

  const toggle = (id) => {
    setRevealed((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="step fade-in">
      <div className="step-emoji">💪</div>
      <h2>Ways to earn more</h2>
      <p className="step-body">
        These are realistic options — not get-rich-quick schemes. Tap each one to read more.
      </p>
      <div className="idea-list">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`idea-card ${revealed.includes(idea.id) ? "open" : ""}`}
            onClick={() => toggle(idea.id)}
          >
            <div className="idea-top">
              <span className="idea-emoji">{idea.emoji}</span>
              <span className="idea-title">{idea.title}</span>
              <span className="idea-arrow">{revealed.includes(idea.id) ? "▲" : "▼"}</span>
            </div>
            {revealed.includes(idea.id) && (
              <p className="idea-body">{idea.body}</p>
            )}
          </div>
        ))}
      </div>
      <div className="highlight-box">
        <p>
          <strong>One rule for all of these:</strong> be reliable. If you say you'll do something, do it well and on time. A reputation for being dependable is worth more than any single job.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepSellSmart({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📦</div>
      <h2>Sell things you no longer need</h2>
      <p className="step-body">
        Most of us have things we've grown out of, got bored of, or simply don't use. Someone else probably wants them — and will pay for them.
      </p>
      <div className="tips-list">
        <div className="tip-card">
          <div className="tip-icon">👀</div>
          <div className="tip-content">
            <h3>What's worth selling?</h3>
            <p>Games, books, clothes that still fit someone younger, toys in good condition, sports equipment you've outgrown. If it's clean, complete, and works — it has value.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">📱</div>
          <div className="tip-content">
            <h3>Where to sell</h3>
            <p>With a parent's help: Vinted for clothes, Facebook Marketplace or local apps for other things, school notice boards for books and games. Local markets and car boot sales work well too.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">💶</div>
          <div className="tip-content">
            <h3>Price it right</h3>
            <p>Check what similar things sell for before setting your price. Too high and it won't sell. Too low and you're leaving money on the table. About half the original price is a good starting point for good-condition items.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">🤝</div>
          <div className="tip-content">
            <h3>Be honest about condition</h3>
            <p>If something has a scratch or a missing piece, say so. Buyers appreciate honesty and you avoid awkward situations later. Your reputation matters even in small transactions.</p>
          </div>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}
function StepAllowanceConvo({ onNext }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      emoji: "🗣️",
      title: "The allowance conversation",
      body: "If you don't have a regular allowance, asking for one is a completely reasonable thing to do — and how you ask matters.",
      note: "An allowance isn't just money. It's a tool for learning to plan, save, and make decisions. Most parents will respond well to that framing.",
    },
    {
      emoji: "📋",
      title: "How to have the conversation",
      body: "Pick a calm moment — not when your parent is stressed or busy. Say something like: \"I've been learning about saving and planning with money, and I think a regular allowance would help me practise. Could we talk about it?\"",
      note: "You don't need to have all the answers ready. Just opening the conversation is the first step.",
    },
    {
      emoji: "💡",
      title: "What to think about beforehand",
      body: "It helps to have a rough idea of what amount you'd suggest and what you'd use it for. Not because you need permission for every purchase — but because it shows you've thought it through.",
      note: "Parents are much more likely to say yes when they can see you're approaching it seriously.",
    },
    {
      emoji: "🔄",
      title: "If the answer is no — or not yet",
      body: "That's okay. It might be about timing, budget, or something else entirely. Ask if there's anything you could do differently, or when might be a better time to revisit it.",
      note: "The conversation itself is valuable — it shows maturity and initiative, even if the answer isn't immediate.",
    },
  ];

  const current = steps[step];

  return (
    <div className="step fade-in">
      <div className="step-emoji">{current.emoji}</div>
      <h2>{current.title}</h2>
      <p className="step-body">{current.body}</p>
      <div className="highlight-box">
        <p>{current.note}</p>
      </div>
      <div className="convo-progress">
        {steps.map((_, i) => (
          <div key={i} className={`convo-dot ${i <= step ? "active" : ""}`} />
        ))}
      </div>
      {step < steps.length - 1 ? (
        <button className="btn-primary" onClick={() => setStep((s) => s + 1)}>Next →</button>
      ) : (
        <button className="btn-primary" onClick={onNext}>Got it →</button>
      )}
    </div>
  );
}

function StepQuiz1({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Ask for money whenever you need it",
    "Wait until you're older to think about earning",
    "Be reliable, use skills you have, and look for ways to help others",
    "Only focus on saving, not earning",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What's the key to earning more as a young person?</h2>
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
            <div className="feedback correct">✓ Exactly. Reliability and usefulness are the foundation — the money follows.</div>
          ) : (
            <div className="feedback wrong">
              {selected === 0 && "Not quite. Asking for money whenever you need it isn't earning — it's depending. The answer is being reliable, using skills you have, and finding ways to help others."}
              {selected === 1 && "Not quite. You don't need to wait — there are real ways to earn at any age. Reliability, skills, and helping others are the foundation."}
              {selected === 3 && "Not quite. Saving is important, but it works faster when combined with earning. Being reliable and useful is the key to earning more."}
            </div>
          )}
          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onNext}>Next →</button>
        </>
      )}
    </div>
  );
}
function StepTrackIt({ onNext }) {
  const [selected, setSelected] = useState([]);

  const actions = [
    { id: 1, emoji: "🗣️", text: "Have the allowance conversation with my parents" },
    { id: 2, emoji: "📦", text: "Look for things I could sell" },
    { id: 3, emoji: "🏡", text: "Ask about extra jobs I could do at home" },
    { id: 4, emoji: "🐕", text: "See if I can help neighbours" },
    { id: 5, emoji: "🎨", text: "Think of a skill I could offer" },
    { id: 6, emoji: "♻️", text: "Check if bottle returns work where I live" },
  ];

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="step fade-in">
      <div className="step-emoji">🚀</div>
      <h2>What sounds like something you could actually do?</h2>
      <p className="step-body">
        The real learning from this lesson happens in real life — not here. Pick one or more things below that sound doable for you. No right or wrong answer.
      </p>

      <div className="action-list">
        {actions.map((action) => (
          <button
            key={action.id}
            className={`action-item ${selected.includes(action.id) ? "checked" : ""}`}
            onClick={() => toggle(action.id)}
          >
            <span className="action-emoji">{action.emoji}</span>
            <span className="action-text">{action.text}</span>
            <span className="action-tick">{selected.includes(action.id) ? "✓" : ""}</span>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="highlight-box">
          <p>
            Good choice{selected.length > 1 ? "s" : ""}. None of these need money to start — just a bit of initiative.
          </p>
        </div>
      )}

      <button
        className="btn-primary"
        onClick={onNext}
        disabled={selected.length === 0}
        style={{ opacity: selected.length > 0 ? 1 : 0.4 }}
      >
        Next →
      </button>
    </div>
  );
}
function StepQuiz2({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 1;
  const options = [
    "Focus only on cutting expenses",
    "Know what's coming in, what's going out, and look for ways to increase the gap",
    "Save every single penny and never spend on yourself",
    "Only think about money when you have a specific goal",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What's the best way to grow your money pile?</h2>
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
            <div className="feedback correct">✓ Exactly. It's not just about cutting back — it's about understanding the full picture and widening the gap between in and out.</div>
          ) : (
           <div className="feedback wrong">
              {selected === 0 && "Not quite. Cutting expenses alone isn't enough — earning more matters too. The best approach is understanding both sides: what's coming in and what's going out."}
              {selected === 2 && "Not quite. Never spending on yourself isn't the goal. Save consistently first, then enjoy what's left — that's the balance."}
              {selected === 3 && "Not quite. Thinking about money only when you have a goal misses the habit. Knowing your numbers regularly — in and out — is what makes the difference."}
            </div>
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
      <h2>Lesson 3 done!</h2>
      <p className="step-lead">You now have a full toolkit for growing your money pile.</p>
      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ Practical ways to earn more at any age</li>
          <li>✓ How to sell things you no longer need</li>
          <li>✓ How to have the allowance conversation with your parents</li>
          <li>✓ How to track what's coming in and going out</li>
        </ul>
      </div>
      <LessonFeedback
        lessonNumber={3}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />
      {feedbackDone && (
        <>
          <p className="step-body">
            Next up: inflation — why waiting has a cost, and what you can do about it.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 4 →
          </button>
        </>
      )}
    </div>
  );
}