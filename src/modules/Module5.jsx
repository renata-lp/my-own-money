import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module5.css";

const STEPS = [
  "intro",
  "what-is-cash",
  "what-is-card",
  "how-it-works",
  "myth-busting",
  "quiz",
  "complete",
];

export default function Module5({ onComplete, session, onHome }) {
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
        <div className="module-label">Lesson 5 · Cash or card?</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
        <button className="home-btn" onClick={onHome}>⌂</button>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "what-is-cash" && <StepWhatIsCash onNext={next} />}
        {step === "what-is-card" && <StepWhatIsCard onNext={next} />}
        {step === "how-it-works" && <StepHowItWorks onNext={next} />}
        {step === "myth-busting" && <StepMythBusting onNext={next} />}
        {step === "quiz" && <StepQuiz onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">💳</div>
      <h2>Cash or card?</h2>
      <p className="step-lead">
        You've heard it at checkouts. Maybe you've wondered what's actually different — beyond one being paper and one being plastic.
      </p>
      <p className="step-body">
        Both are ways of paying, but they work differently, feel different, and come with different advantages. This lesson unpacks what's actually going on.
      </p>
      <div className="highlight-box">
        <p>
          There's no single right answer to "cash or card?" — it depends on what you have, where you are, and what you're buying. What matters is understanding both.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Let's look at both →</button>
    </div>
  );
}

function StepWhatIsCash({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">💵</div>
      <h2>Cash</h2>
      <p className="step-body">
        Cash is physical money — banknotes and coins. It's issued by a country's central bank and is what's called <strong>legal tender</strong>, meaning businesses are generally obliged to accept it.
      </p>
      <div className="two-col">
        <div className="concept-card need">
          <div className="concept-icon">✅</div>
          <h3>Advantages</h3>
          <p>You always know exactly how much you have. It's tangible — spending it feels real, which often helps people spend less. No technology needed. Works everywhere.</p>
        </div>
        <div className="concept-card want">
          <div className="concept-icon">⚠️</div>
          <h3>Disadvantages</h3>
          <p>If you lose it, it's gone. You have to deal with change. It can be inconvenient for larger amounts. Some places no longer accept it.</p>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>Something interesting:</strong> research shows people tend to spend less when paying with cash. Handing over physical notes feels more "real" than tapping a card — so the spending feels more significant.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepWhatIsCard({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">💳</div>
      <h2>Cards</h2>
      <p className="step-body">
        A payment card lets you pay without using physical money. There are two main types you'll come across:
      </p>
      <div className="card-types">
        <div className="card-type">
          <div className="ct-icon">🟡</div>
          <div className="ct-content">
            <h3>Prepaid card</h3>
            <p>You load a set amount of money onto the card in advance. When it runs out, it stops working — you can only spend what's on it. No bank account needed.</p>
            <p className="ct-note">Good for: children learning to manage money, travel, budgeting</p>
          </div>
        </div>
        <div className="card-type">
          <div className="ct-icon">🔵</div>
          <div className="ct-content">
            <h3>Debit card</h3>
            <p>Linked directly to a bank account. When you pay, the money comes straight out of your account. You can only spend what's in it.</p>
            <p className="ct-note">More on bank accounts in the next lesson</p>
          </div>
        </div>
      </div>
      <div className="two-col" style={{ marginTop: "4px" }}>
        <div className="concept-card need">
          <div className="concept-icon">✅</div>
          <h3>Advantages</h3>
          <p>Safer if lost — you can cancel it quickly. Accepted almost everywhere. No change to deal with. Easy to track spending.</p>
        </div>
        <div className="concept-card want">
          <div className="concept-icon">⚠️</div>
          <h3>Disadvantages</h3>
          <p>Spending can feel less "real", which may lead to spending more. Needs technology to work. Some small places don't accept cards.</p>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepHowItWorks({ onNext }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="step fade-in">
      <div className="step-emoji">⚡</div>
      <h2>What actually happens when you tap a card?</h2>
      <p className="step-body">
        It looks instant — but there's a lot happening in that fraction of a second. Here's what goes on behind the scenes.
      </p>
      <div className="flow-steps">
        <div className="flow-step">
          <div className="flow-num">1</div>
          <div className="flow-content">
            <h3>You tap your card</h3>
            <p>Your card sends a signal to the payment terminal — either via a chip, a magnetic stripe, or contactless (NFC) technology.</p>
          </div>
        </div>
        <div className="flow-arrow">↓</div>
        <div className="flow-step">
          <div className="flow-num">2</div>
          <div className="flow-content">
            <h3>The terminal talks to your bank</h3>
            <p>The shop's payment system sends a request to your bank asking: "Does this person have enough money? Is the card valid?"</p>
          </div>
        </div>
        <div className="flow-arrow">↓</div>
        <div className="flow-step">
          <div className="flow-num">3</div>
          <div className="flow-content">
            <h3>Your bank approves or declines</h3>
            <p>Your bank checks your balance and card details, then sends back an approval or decline — all in under a second.</p>
          </div>
        </div>
        <div className="flow-arrow">↓</div>
        <div className="flow-step">
          <div className="flow-num">4</div>
          <div className="flow-content">
            <h3>Money moves</h3>
            <p>If approved, the amount is reserved from your account and eventually transferred to the shop — sometimes instantly, sometimes within a day or two.</p>
          </div>
        </div>
      </div>
      {!revealed && (
        <button className="btn-secondary" onClick={() => setRevealed(true)}>
          Wait — what if my card gets stolen? →
        </button>
      )}
      {revealed && (
        <div className="highlight-box fade-in">
          <p>
            <strong>If your card is lost or stolen:</strong> call your bank immediately and they cancel it. Any payments made after you report it are usually covered. This is one of the biggest advantages of cards over cash — lost cash is almost always gone for good.
          </p>
        </div>
      )}
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}function StepMythBusting({ onNext }) {
  const myths = [
    {
      id: 1,
      statement: "If you lose cash, you can always get it back.",
      verdict: false,
      explanation: "Lost or stolen cash is almost always gone for good. There's no way to trace it or cancel it. This is one of the biggest risks of carrying a lot of cash.",
    },
    {
      id: 2,
      statement: "If your card gets stolen, someone can spend all your money before you notice.",
      verdict: false,
      explanation: "You can cancel your card within minutes of realising it's gone. Banks also monitor for unusual activity and most will refund you for fraudulent payments made after you report the card stolen.",
    },
    {
      id: 3,
      statement: "Paying with cash means you'll always spend less.",
      verdict: "tricky",
      explanation: "Research does show that people often spend less with cash — handing over physical notes feels more real than tapping a card. But it's not guaranteed. Aware spenders can control card spending just as well.",
    },
    {
      id: 4,
      statement: "Cash is always safer than a card.",
      verdict: false,
      explanation: "Not quite. A lost card can be cancelled within minutes. Lost cash cannot. Cards also come with fraud protection that cash doesn't have.",
    },
    {
      id: 5,
      statement: "You need a bank account to pay by card.",
      verdict: false,
      explanation: "Prepaid cards work without a bank account — you just load money onto them in advance. They're a common option for younger people and for travel.",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const handleAnswer = (id, answer) => {
    if (answers[id] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    setTimeout(() => setRevealed((prev) => ({ ...prev, [id]: true })), 400);
  };

  const allAnswered = Object.keys(answers).length === myths.length;

  const getResult = (myth) => {
    const answer = answers[myth.id];
    if (answer === undefined) return null;
    if (myth.verdict === "tricky") return "tricky";
    return answer === myth.verdict ? "correct" : "wrong";
  };

  return (
    <div className="step fade-in">
      <div className="step-emoji">🕵️</div>
      <h2>True or false?</h2>
      <p className="step-body">
        Some of these are things most people believe. Think carefully before you tap — a couple are designed to catch you out.
      </p>
      <div className="myth-list">
        {myths.map((myth) => {
          const result = getResult(myth);
          const isAnswered = answers[myth.id] !== undefined;
          return (
            <div key={myth.id} className={`myth-card ${result || ""}`}>
              <p className="myth-statement">"{myth.statement}"</p>
              {!isAnswered && (
                <div className="myth-buttons">
                  <button className="myth-btn true" onClick={() => handleAnswer(myth.id, true)}>True</button>
                  <button className="myth-btn false" onClick={() => handleAnswer(myth.id, false)}>False</button>
                </div>
              )}
              {isAnswered && (
                <div className={`myth-verdict ${result}`}>
                  {result === "correct" && "✓ Correct"}
                  {result === "wrong" && "✗ Not quite"}
                  {result === "tricky" && "🤔 It's complicated"}
                </div>
              )}
              {revealed[myth.id] && (
                <p className="myth-explanation fade-in">{myth.explanation}</p>
              )}
            </div>
          );
        })}
      </div>
      {allAnswered && (
        <button className="btn-primary" onClick={onNext}>Next →</button>
      )}
    </div>
  );
}

function StepQuiz({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 3;
  const options = [
    "People always spend less with cash than with a card",
    "Cash and card spending feel exactly the same psychologically",
    "Cards make spending feel more real because you can see your balance go down",
    "Handing over physical notes tends to make spending feel more significant than tapping a card",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What does research show about how cash affects spending?</h2>
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
            <div className="feedback correct">✓ Exactly. Physical money feels more real to part with — which is why people often spend a little more carefully with cash.</div>
          ) : (
            <div className="feedback wrong">Not quite. Research shows that handing over physical notes tends to feel more significant than tapping a card — which often leads to slightly more careful spending.</div>
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
      <h2>Lesson 5 done!</h2>
      <p className="step-lead">You now know what's really going on when money changes hands.</p>
      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ The difference between cash and cards</li>
          <li>✓ What prepaid and debit cards are</li>
          <li>✓ What happens in the second you tap a card</li>
          <li>✓ The psychology of cash vs card spending</li>
          <li>✓ Common myths — busted</li>
        </ul>
      </div>
      <LessonFeedback
        lessonNumber={5}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />
      {feedbackDone && (
        <>
          <p className="step-body">
            Next up: what actually happens to your money when you put it in a bank.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 6 →
          </button>
        </>
      )}
    </div>
  );
}