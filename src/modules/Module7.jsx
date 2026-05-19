import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module7.css";

const STEPS = [
  "intro",
  "what-is-interest",
  "interest-you-pay",
  "interest-you-earn",
  "compound",
  "start-early",
  "quiz",
  "complete",
];

export default function Module7({ onComplete, session, onHome }) {
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
        <div className="module-label">Lesson 7 · Interest</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
        <button className="home-btn" onClick={onHome}>⌂</button>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "what-is-interest" && <StepWhatIsInterest onNext={next} />}
        {step === "interest-you-pay" && <StepInterestYouPay onNext={next} />}
        {step === "interest-you-earn" && <StepInterestYouEarn onNext={next} />}
        {step === "compound" && <StepCompound onNext={next} />}
        {step === "start-early" && <StepStartEarly onNext={next} />}
        {step === "quiz" && <StepQuiz onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">💰</div>
      <h2>Money can work for you — or against you.</h2>
      <p className="step-lead">
        This lesson is about one of the most powerful forces in personal finance. Understand it well and it works in your favour. Ignore it and it quietly works against you.
      </p>
      <p className="step-body">
        It's called <strong>interest</strong>. And once you see how it works, you'll understand why starting early matters so much.
      </p>
      <div className="highlight-box">
        <p>This is a longer lesson than the others — because the concepts here are worth taking time with. Work through it carefully.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Let's go →</button>
    </div>
  );
}

function StepWhatIsInterest({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🚗</div>
      <h2>Think of it like renting a car</h2>
      <p className="step-body">
        When you travel and rent a car, you use it for a while — then you return it at the end. And you pay for the time you used it. That payment is the rental fee.
      </p>
      <p className="step-body">
        Money works the same way. When someone borrows money, they use it — then they return it. And they pay for the time they used it. That payment is called <strong>interest</strong>.
      </p>
      <div className="analogy-cards">
        <div className="analogy-card">
          <div className="ac-icon">🚗</div>
          <div className="ac-content">
            <h3>Renting a car</h3>
            <div className="ac-row"><span>Use the car</span><span>→</span><span>Return the car</span></div>
            <div className="ac-row"><span>+</span><span></span><span>Pay the rental fee</span></div>
          </div>
        </div>
        <div className="analogy-card">
          <div className="ac-icon">💵</div>
          <div className="ac-content">
            <h3>Borrowing money</h3>
            <div className="ac-row"><span>Use the money</span><span>→</span><span>Return the money</span></div>
            <div className="ac-row"><span>+</span><span></span><span>Pay the interest</span></div>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          Like inflation, interest is expressed as a <strong>percentage per year</strong>. If someone borrows 100 euros at 5% interest for a year, they return 105 euros — 100 borrowed, plus 5 in interest.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepInterestYouPay({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📤</div>
      <h2>Interest on borrowing</h2>
      <p className="step-body">
        When people borrow money — from a bank, a credit company, or any lender — they don't just return what they borrowed. They also pay for the time they used it. That extra payment is interest.
      </p>
      <p className="step-body">
        The total cost of borrowing depends on two things: the interest rate and how long it takes to repay. A high rate, or a long repayment time, means paying back significantly more than was originally borrowed.
      </p>
      <div className="borrow-example">
        <div className="be-row">
          <span className="be-label">Borrowed</span>
          <span className="be-value">1,000 units of your currenc
          </span>
        </div>
        <div className="be-row">
          <span className="be-label">Interest rate</span>
          <span className="be-value">10% per year</span>
        </div>
        <div className="be-row">
          <span className="be-label">Repaid over</span>
          <span className="be-value">3 years</span>
        </div>
        <div className="be-divider" />
        <div className="be-row total">
          <span className="be-label">Total paid back</span>
          <span className="be-value warn">≈ 1,330 units of your currenc
          </span>
        </div>
        <div className="be-note">330 euros
          
   paid just in interest</div>
      </div>
      <div className="highlight-box">
        <p>
          When debt isn't managed carefully, the interest keeps adding up. This is why understanding interest matters — even before you're old enough to borrow. The next lesson covers this in more detail.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepInterestYouEarn({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📥</div>
      <h2>Interest you earn — savings accounts</h2>
      <p className="step-body">
        Not all bank accounts pay interest. A regular current account — the one used for day-to-day spending — typically pays little or nothing.
      </p>
      <p className="step-body">
        But banks also offer <strong>savings accounts</strong> — accounts specifically designed for money you want to set aside. In exchange for keeping your money there, the bank pays you interest. The longer you leave it, the more you earn.
      </p>
      <div className="earn-visual">
        <div className="ev-row">
          <div className="ev-you">👤 You</div>
          <div className="ev-arrow">
            <div className="ev-arrow-line">→ deposit into savings →</div>
            <div className="ev-arrow-line back">← original + interest ←</div>
          </div>
          <div className="ev-bank">🏦 Bank</div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>Example:</strong> you put 100 euros
          
   into a savings account at 3% interest per year. After one year, you have 103 euros
          
   — the bank paid you 3 euros
          
   for keeping your money there.
        </p>
      </div>
      <p className="step-body">
        Remember inflation from Lesson 4? If your savings account pays more interest than the inflation rate, your money is genuinely growing — not just keeping up. That's the goal.
      </p>
      <button className="btn-primary" onClick={onNext}>Now — the really interesting part →</button>
    </div>
  );
}function StepCompound({ onNext }) {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState(5);

  const amountNum = parseFloat(amount) || 100;
  const years = [1, 2, 3, 5, 10, 20];

  const simple = (y) => (amountNum + amountNum * (rate / 100) * y).toFixed(2);
  const compound = (y) => (amountNum * Math.pow(1 + rate / 100, y)).toFixed(2);
  const simpleGained = (y) => (amountNum * (rate / 100) * y).toFixed(2);
  const compoundGained = (y) => (amountNum * Math.pow(1 + rate / 100, y) - amountNum).toFixed(2);

  const ballSizes = [8, 10, 13, 16, 20, 24, 28, 32, 36, 40];

  return (
    <div className="step fade-in">
      <div className="step-emoji">⛄</div>
      <h2>Simple vs compound interest</h2>
      <p className="step-body">
        There are two ways interest can work. The difference looks small at first — but over time it becomes remarkable.
      </p>

      <div className="svc-explainers">
        <div className="svc-card simple">
          <h3>🎾 Simple interest</h3>
          <p>You earn interest only on your original amount. Same amount every year — like a tennis ball rolling down a slope. Always the same size.</p>
        </div>
        <div className="svc-card compound">
          <h3>⛄ Compound interest</h3>
          <p>You earn interest on your original amount <em>plus</em> all the interest already earned. The base grows — so the interest grows too. Like a snowball rolling downhill.</p>
        </div>
      </div>

      <div className="slope-visual">
        <div className="slope-side">
          <div className="slope-label">Simple interest</div>
          <svg viewBox="0 0 120 80" className="slope-svg">
            <line x1="10" y1="10" x2="110" y2="70" stroke="#D0CCE0" strokeWidth="2"/>
            {[0,1,2,3,4,5,6,7,8,9].map((i) => {
              const x = 10 + i * 10;
              const y = 10 + i * 6;
              return <circle key={i} cx={x} cy={y} r="5" fill="#3498DB" opacity="0.7"/>;
            })}
          </svg>
          <div className="slope-caption">Ball stays the same size</div>
        </div>
        <div className="slope-side">
          <div className="slope-label">Compound interest</div>
          <svg viewBox="0 0 120 80" className="slope-svg">
            <line x1="10" y1="10" x2="110" y2="70" stroke="#D0CCE0" strokeWidth="2"/>
            {[0,1,2,3,4,5,6,7,8,9].map((i) => {
              const x = 10 + i * 10;
              const y = 10 + i * 6;
              const r = 3 + i * 1.8;
              return <circle key={i} cx={x} cy={y} r={r} fill="#2ECC71" opacity="0.75"/>;
            })}
          </svg>
          <div className="slope-caption">Ball grows as it rolls</div>
        </div>
      </div>

      <p className="step-body">Now see it in numbers. Adjust the amount and rate:</p>

      <div className="compound-controls">
        <div className="sim-field">
          <label>Starting amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            className="sim-input"
          />
        </div>
        <div className="sim-field">
          <label>Interest rate per year: <strong>{rate}%</strong></label>
          <input
            type="range"
            min="1"
            max="15"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="sim-slider"
          />
          <div className="sim-range-labels">
            <span>1%</span>
            <span>15%</span>
          </div>
        </div>
      </div>

      <div className="svc-table">
        <div className="svc-header">
          <span>Year</span>
          <span>Simple</span>
          <span>Compound</span>
        </div>
        {years.map((y) => (
          <div key={y} className={`svc-row ${y === 10 ? "highlight" : ""} ${y === 20 ? "highlight-strong" : ""}`}>
            <span className="svc-year">{y}</span>
            <div className="svc-col simple">
              <span className="svc-balance">{simple(y)}</span>
              <span className="svc-gained">+{simpleGained(y)}</span>
            </div>
            <div className="svc-col compound">
              <span className="svc-balance">{compound(y)}</span>
              <span className="svc-gained">+{compoundGained(y)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="highlight-box">
        <p>
          Try setting the rate to 7% or higher and look at year 20. The gap between simple and compound becomes striking — that's the snowball effect in numbers.
        </p>
      </div>

      <button className="btn-primary" onClick={onNext}>Almost there →</button>
    </div>
  );
}
function StepStartEarly({ onNext }) {
  const scenarios = [
    { label: "Start at 10", startAge: 10, weekly: 2, years: 10, rate: 5 },
    { label: "Start at 15", startAge: 15, weekly: 2, years: 5, rate: 5 },
  ];

  const totalSaved = (weekly, years) => weekly * 52 * years;
  const compoundResult = (weekly, years, rate) => {
    let balance = 0;
    for (let y = 0; y < years; y++) {
      balance = (balance + weekly * 52) * (1 + rate / 100);
    }
    return balance.toFixed(2);
  };

  return (
    <div className="step fade-in">
      <div className="step-emoji">⏰</div>
      <h2>The earlier you start, the bigger the difference</h2>
      <p className="step-body">
        Compound interest rewards patience — but even more than that, it rewards <strong>starting early</strong>. A few extra years at the beginning can make a bigger difference than saving more later.
      </p>
      <p className="step-body">
        Same weekly amount. Same interest rate. Just a different starting point:
      </p>

      <div className="early-cards">
        <div className="early-card green">
          <div className="ec-label">Start saving at age 10</div>
          <div className="ec-detail">€2 a week for 10 years at 5%</div>
          <div className="ec-divider" />
          <div className="ec-row">
            <span>Total put in</span>
            <span>€{totalSaved(2, 10).toFixed(0)}</span>
          </div>
          <div className="ec-row big">
            <span>Balance at 20</span>
            <span className="ec-green">€{compoundResult(2, 10, 5)}</span>
          </div>
        </div>
        <div className="early-card orange">
          <div className="ec-label">Start saving at age 15</div>
          <div className="ec-detail">€2 a week for 5 years at 5%</div>
          <div className="ec-divider" />
          <div className="ec-row">
            <span>Total put in</span>
            <span>€{totalSaved(2, 5).toFixed(0)}</span>
          </div>
          <div className="ec-row big">
            <span>Balance at 20</span>
            <span className="ec-orange">€{compoundResult(2, 5, 5)}</span>
          </div>
        </div>
      </div>

      <div className="highlight-box">
        <p>
          Starting 5 years earlier — with the exact same weekly amount — results in significantly more money by age 20. And the gap keeps growing every year after that. This is why people who understand compound interest start as early as they can.
        </p>
      </div>

      <button className="btn-primary" onClick={onNext}>Final check →</button>
    </div>
  );
}
function StepQuiz({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Interest is a fixed fee you pay once when you borrow money",
    "Compound interest means you only earn interest on your original amount",
    "With compound interest, you earn interest on your interest — so your money grows faster over time",
    "Interest only applies to borrowing, not to saving",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What makes compound interest different from simple interest?</h2>
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
            <div className="feedback correct">✓ Exactly. You earn interest on your interest — which means the longer you leave it, the faster it grows.</div>
          ) : (
           <div className="feedback wrong">
              {selected === 0 && "Not quite. Interest isn't a one-off fee — it's charged as a percentage over time, as long as money is borrowed or saved."}
              {selected === 1 && "Not quite. That's simple interest — earning only on the original amount. Compound interest earns on the original plus all interest already accumulated."}
              {selected === 3 && "Not quite. Interest applies to saving too — banks pay you interest when you deposit into a savings account."}
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
      <h2>Lesson 7 done!</h2>
      <p className="step-lead">You now understand one of the most powerful forces in personal finance.</p>
      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ What interest is — the "rent" on money</li>
          <li>✓ How interest works when people borrow</li>
          <li>✓ How savings accounts pay you interest</li>
          <li>✓ The difference between simple and compound interest</li>
          <li>✓ Why starting early makes such a big difference</li>
        </ul>
      </div>
      <LessonFeedback
        lessonNumber={7}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />
      {feedbackDone && (
        <>
          <p className="step-body">
            Last lesson: debit or credit — and why the difference matters now that you understand how interest works.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 8 →
          </button>
        </>
      )}
    </div>
  );
}