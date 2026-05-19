import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module6.css";

const STEPS = [
  "intro",
  "how-banks-work",
  "the-pool",
  "bank-runs",
  "regulation",
  "banking-apps",
  "quiz",
  "complete",
];

export default function Module6({ onComplete, session, onHome }) {
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
        <div className="module-label">Lesson 6 · What is a bank account?</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
        <button className="home-btn" onClick={onHome}>⌂</button>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "how-banks-work" && <StepHowBanksWork onNext={next} />}
        {step === "the-pool" && <StepThePool onNext={next} />}
        {step === "bank-runs" && <StepBankRuns onNext={next} />}
        {step === "regulation" && <StepRegulation onNext={next} />}
        {step === "banking-apps" && <StepBankingApps onNext={next} />}
        {step === "quiz" && <StepQuiz onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🏦</div>
      <h2>Your money isn't sitting in a vault with your name on it.</h2>
      <p className="step-lead">
        When you deposit money in a bank, it doesn't go into a little box labelled with your name. Understanding what actually happens — and why it's still safe — is what this lesson is about.
      </p>
      <p className="step-body">
        Banks are one of the most important institutions in any economy. They've existed for centuries, and the way they work is genuinely interesting once you see behind the curtain.
      </p>
      <div className="highlight-box">
        <p>By the end of this lesson you'll understand something most adults couldn't explain clearly — how banks actually work.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Let's look behind the curtain →</button>
    </div>
  );
}

function StepHowBanksWork({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🔄</div>
      <h2>What banks actually do</h2>
      <p className="step-body">A bank does two main things at the same time:</p>
      <div className="bank-roles">
        <div className="bank-role deposit">
          <div className="br-icon">📥</div>
          <div className="br-content">
            <h3>Keeps your money safe</h3>
            <p>People and businesses deposit money in the bank. The bank keeps precise records of exactly how much each person has — like a very careful scoreboard.</p>
          </div>
        </div>
        <div className="bank-role lend">
          <div className="br-icon">📤</div>
          <div className="br-content">
            <h3>Lends money to others</h3>
            <p>The bank lends money to people who need it — to buy a house, start a business, or cover costs. Those borrowers repay the money over time.</p>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          All of this happens at the same time, constantly. People are depositing, borrowing, and repaying every single day. The bank keeps score of all of it — so it always knows exactly what it owes each depositor.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepThePool({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🏊</div>
      <h2>The common pool</h2>
      <p className="step-body">
        Because so many people deposit money in the bank — and they don't all need it back at the same time — all deposits go into a common pool. The bank uses that pool to make loans, and repayments flow back in.
      </p>
      <p className="step-body">
        When you want your money back, the bank pays you from the pool. Not from a box with your name on it — but the records mean it always knows exactly what you're owed.
      </p>

      <div className="pool-diagram">
        <div className="pd-column">
          <div className="pd-col-label">Depositors</div>
          <div className="pd-people">
            <div className="pd-person">👤 You</div>
            <div className="pd-person">👤 Others</div>
            <div className="pd-person">👤 Others</div>
          </div>
        </div>
        <div className="pd-arrows-left">
          <div className="pd-arrow-row">
            <div className="pd-arrow in">→</div>
            <div className="pd-arrow-label">deposit</div>
          </div>
          <div className="pd-arrow-row">
            <div className="pd-arrow out">←</div>
            <div className="pd-arrow-label">withdraw</div>
          </div>
        </div>
        <div className="pd-pool">
          <div className="pd-pool-box">
            <div className="pd-pool-icon">🏦</div>
            <div className="pd-pool-label">Common<br/>pool</div>
          </div>
        </div>
        <div className="pd-arrows-right">
          <div className="pd-arrow-row">
            <div className="pd-arrow out">→</div>
            <div className="pd-arrow-label">lend</div>
          </div>
          <div className="pd-arrow-row">
            <div className="pd-arrow in">←</div>
            <div className="pd-arrow-label">repay</div>
          </div>
        </div>
       <div className="pd-column">
          <div className="pd-col-label">Borrowers</div>
          <div className="pd-people">
            <div className="pd-person">🏠 Homebuyers</div>
            <div className="pd-person">🏪 Businesses</div>
            <div className="pd-person">🛍️ Consumers</div>
            <div className="pd-person">👤 Others</div>
          </div>
        </div> 
          
      </div>

      <div className="highlight-box">
        <p>
          <strong>The key insight:</strong> your money isn't sitting idle. It's part of a system that keeps money flowing. And the bank's records mean your balance is always protected — even if your specific coins are elsewhere.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepBankRuns({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">😰</div>
      <h2>What if everyone wants their money at once?</h2>
      <p className="step-body">
        Because the bank has lent out most of the pool, it doesn't have enough cash on hand to pay everyone back at exactly the same time.
      </p>
      <p className="step-body">
        This is normally fine — in practice, not everyone withdraws at once. But sometimes, if people get scared that a bank is in trouble, they all rush to withdraw at the same time. This is called a <strong>bank run</strong>.
      </p>
      <div className="bankrun-visual">
        <div className="br-scenario">
          <div className="br-icons">😰😰😰😰😰</div>
          <div className="br-arrow">↓</div>
          <div className="br-bank">🏦</div>
          <div className="br-result empty">Not enough cash for everyone at once</div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>Bank runs have happened in history</strong> — including in recent decades. The fear becomes self-fulfilling: the more people withdraw, the more others panic and withdraw too.
        </p>
      </div>
      <p className="step-body">This sounds alarming. But there's a reason it's rare — and why your money is protected even if it does happen.</p>
      <button className="btn-primary" onClick={onNext}>What protects me? →</button>
    </div>
  );
}function StepRegulation({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🛡️</div>
      <h2>Why your money is (mostly) safe</h2>
      <p className="step-body">
        Banks don't operate without rules. In most countries, they're <strong>regulated</strong> — supervised by a government authority and required to follow strict rules about how they manage money and risk.
      </p>
      <div className="protection-steps">
        <div className="ps-card">
          <div className="ps-icon">🏛️</div>
          <div className="ps-content">
            <h3>Central banks as a backstop</h3>
            <p>If a regulated bank gets into trouble, the country's central bank can step in with emergency support. This is one reason bank runs rarely spiral out of control in regulated systems.</p>
          </div>
        </div>
        <div className="ps-card">
          <div className="ps-icon">🔒</div>
          <div className="ps-content">
            <h3>Deposit protection schemes</h3>
            <p>Most countries guarantee depositors up to a limit — typically around €100,000 (or the equivalent in local currency). If a bank fails, the government makes sure you get that amount back.</p>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p><strong>Two practical things worth knowing:</strong></p>
        <ol className="protection-rules">
          <li>Check that your bank is regulated by your country's financial authority — not all financial institutions are.</li>
          <li>Know the deposit protection limit in your country. It's very high, but good to be aware of.</li>
        </ol>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepBankingApps({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📱</div>
      <h2>Banking today — more than just a safe place</h2>
      <p className="step-body">
        Most banks now have apps that show you exactly where your money goes. This is one of the most useful tools for anyone trying to manage money well.
      </p>
      <div className="app-features">
        <div className="app-feature">
          <div className="af-icon">📊</div>
          <div className="af-content">
            <h3>Spending categories</h3>
            <p>Transactions are automatically sorted — food, transport, entertainment, subscriptions. You can see at a glance where your money goes each month.</p>
          </div>
        </div>
        <div className="app-feature">
          <div className="af-icon">🎯</div>
          <div className="af-content">
            <h3>Budgets</h3>
            <p>Set a monthly limit for each category. The app warns you when you're getting close — before you overspend, not after.</p>
          </div>
        </div>
        <div className="app-feature">
          <div className="af-icon">💰</div>
          <div className="af-content">
            <h3>Savings pots</h3>
            <p>Create separate pots for different goals — a trip, a device, an emergency fund. Same account, but mentally and visually separated.</p>
          </div>
        </div>
        <div className="app-feature">
          <div className="af-icon">🔔</div>
          <div className="af-content">
            <h3>Instant notifications</h3>
            <p>Every transaction triggers a notification. Nothing goes unnoticed — including anything suspicious.</p>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>Kid-friendly options:</strong> some banks are built specifically for younger people — like Revolut Junior, Greenlight, or Step (depending on your country). They include parental controls, shared visibility, and financial education tools built in. Worth exploring with a parent.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Almost there →</button>
    </div>
  );
}

function StepQuiz({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Your money sits in a box with your name on it",
    "Banks keep all deposits in cash at all times",
    "Banks lend most deposits out and keep precise records of what each person is owed",
    "Your money is unprotected if a bank gets into trouble",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What actually happens to your money when you deposit it?</h2>
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
            <div className="feedback correct">✓ Exactly. The bank lends most of it out, but keeps meticulous records — so it always knows what it owes you.</div>
          ) : (
           <div className="feedback wrong">
              {selected === 0 && "Not quite. Your money doesn't sit in a named box — it joins a common pool. But the bank keeps precise records so it always knows what it owes you."}
              {selected === 1 && "Not quite. If banks kept all deposits in cash at all times, they couldn't lend — which is one of their main functions. They lend most deposits out and keep records of what each person is owed."}
              {selected === 3 && "Not quite. Deposit protection schemes in most countries protect your money up to a significant limit if a bank fails. You're not unprotected — but knowing the limit is worth understanding."}
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
      <h2>Lesson 6 done!</h2>
      <p className="step-lead">You now understand something most adults couldn't explain clearly.</p>
      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ What banks actually do with your money</li>
          <li>✓ How the common pool works</li>
          <li>✓ What a bank run is — and why it's rare</li>
          <li>✓ How regulation and deposit protection keep your money safe</li>
          <li>✓ What modern banking apps can do for you</li>
        </ul>
      </div>
      <LessonFeedback
        lessonNumber={6}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />
      {feedbackDone && (
        <>
          <p className="step-body">
            Next up: interest — how to make your money grow while you sleep.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 7 →
          </button>
        </>
      )}
    </div>
  );
}