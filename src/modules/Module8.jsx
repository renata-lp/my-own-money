import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module8.css";

const STEPS = [
  "intro",
  "debit",
  "credit",
  "the-difference",
  "credit-cost",
  "debt-spiral",
  "when-credit-makes-sense",
  "other-debt",
  "quiz",
  "complete",
];

export default function Module8({ onComplete, session, onHome }) {
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
        <div className="module-label">Lesson 8 · Debit or credit?</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
        <button className="home-btn" onClick={onHome}>⌂</button>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "debit" && <StepDebit onNext={next} />}
        {step === "credit" && <StepCredit onNext={next} />}
        {step === "the-difference" && <StepTheDifference onNext={next} />}
        {step === "credit-cost" && <StepCreditCost onNext={next} />}
        {step === "debt-spiral" && <StepDebtSpiral onNext={next} />}
        {step === "when-credit-makes-sense" && <StepWhenCreditMakesSense onNext={next} />}
        {step === "other-debt" && <StepOtherDebt onNext={next} />}
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
      <h2>Two cards. Very different consequences.</h2>
      <p className="step-lead">
        A debit card and a credit card can look identical. They're both plastic, both tap the same terminals, both show up on the same payment machines. But what's happening behind the scenes is completely different.
      </p>
      <p className="step-body">
        Understanding that difference — now, before you have access to either — means you'll be better prepared than most people who get their first credit card with no idea how it actually works.
      </p>
      <div className="highlight-box">
        <p>This lesson is about understanding how credit works in the world. You won't have access to a credit card for some years — but what you learn here will matter when you do.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Let's look at both →</button>
    </div>
  );
}

function StepDebit({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🟦</div>
      <h2>Debit — spending your own money</h2>
      <p className="step-body">
        A debit card is linked to a bank account. When you pay with it, the money comes directly out of your account — immediately, or within a day or two.
      </p>
      <div className="card-demo debit">
        <div className="cd-card">
          <div className="cd-chip">▪</div>
          <div className="cd-label">DEBIT</div>
          <div className="cd-number">•••• •••• •••• 1234</div>
        </div>
        <div className="cd-flow">
          <div className="cd-step">You tap the card</div>
          <div className="cd-arrow">↓</div>
          <div className="cd-step">Bank checks your balance</div>
          <div className="cd-arrow">↓</div>
          <div className="cd-step highlight-green">Money leaves your account</div>
        </div>
      </div>
      <div className="two-col">
        <div className="concept-card need">
          <div className="concept-icon">✅</div>
          <h3>Advantages</h3>
          <p>You can only spend what you have. No debt, no interest. Simple and predictable.</p>
        </div>
        <div className="concept-card want">
          <div className="concept-icon">⚠️</div>
          <h3>Limitations</h3>
          <p>If your account is empty, the card declines. And if you pay the wrong person or get scammed, debit payments are harder to challenge or reverse than credit payments.</p>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepCredit({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🟥</div>
      <h2>Credit — borrowing to spend</h2>
      <p className="step-body">
        A credit card works differently. When you pay with it, you're not spending your own money — you're borrowing from the credit card company. They pay the shop on your behalf, and you owe them the money.
      </p>
      <div className="card-demo credit">
        <div className="cd-card red">
          <div className="cd-chip">▪</div>
          <div className="cd-label">CREDIT</div>
          <div className="cd-number">•••• •••• •••• 5678</div>
        </div>
        <div className="cd-flow">
          <div className="cd-step">You tap the card</div>
          <div className="cd-arrow">↓</div>
          <div className="cd-step">Card company pays the shop</div>
          <div className="cd-arrow">↓</div>
          <div className="cd-step highlight-orange">You now owe the card company</div>
        </div>
      </div>
      <p className="step-body">
        At the end of the month, you receive a bill. If you pay the full amount by the due date — no interest charged. But if you only pay part of it, interest is charged on the rest. And credit card interest rates are often very high.
      </p>
      <div className="highlight-box">
        <p><strong>Credit limits:</strong> credit card companies set a maximum amount you can borrow — called a credit limit. Going over it has penalties. Staying well under it is good practice.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepTheDifference({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">⚖️</div>
      <h2>The key difference</h2>
      <p className="step-body">Both cards look the same at the checkout. But the financial reality is completely different.</p>
      <div className="diff-table">
        <div className="dt-header">
          <span></span>
          <span className="dt-debit">Debit</span>
          <span className="dt-credit">Credit</span>
        </div>
        {[
          { label: "Whose money?", debit: "Yours", credit: "Borrowed" },
          { label: "Pay interest?", debit: "Never", credit: "If not paid in full" },
          { label: "Spend limit", debit: "Your balance", credit: "Credit limit" },
          { label: "Risk of debt?", debit: "No", credit: "Yes, if not managed" },
          { label: "Builds credit history?", debit: "No", credit: "Yes" },
        ].map((row, i) => (
          <div key={i} className="dt-row">
            <span className="dt-label">{row.label}</span>
            <span className="dt-debit-val">{row.debit}</span>
            <span className="dt-credit-val">{row.credit}</span>
          </div>
        ))}
      </div>
      <div className="highlight-box">
        <p><strong>Credit history</strong> is a record of how reliably someone repays what they borrow. Banks and lenders check it before offering loans or mortgages. Using credit responsibly — and paying on time — builds a good record. Missing payments damages it.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepCreditCost({ onNext }) {
  const [balance, setBalance] = useState("500");
  const rate = 20;
  const balanceNum = parseFloat(balance) || 500;
  const monthlyInterest = (balanceNum * rate / 100 / 12).toFixed(2);
  const yearlyInterest = (balanceNum * rate / 100).toFixed(2);

  return (
    <div className="step fade-in">
      <div className="step-emoji">📈</div>
      <h2>What credit actually costs</h2>
      <p className="step-body">
        Credit cards often charge 20% interest per year — or more. If someone has an unpaid balance and pays only the minimum each month, here's what the interest looks like:
      </p>
      <div className="compound-controls">
        <div className="sim-field">
          <label>Unpaid balance</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            min="1"
            className="sim-input"
          />
        </div>
      </div>
      <div className="cost-result">
        <div className="cr-row">
          <span>Interest rate</span>
          <span className="cr-val warn">{rate}% per year</span>
        </div>
        <div className="cr-row">
          <span>Interest added each month</span>
          <span className="cr-val warn">+{monthlyInterest} euros</span>
        </div>
        <div className="cr-row big">
          <span>Interest added in one year</span>
          <span className="cr-val warn">+{yearlyInterest} euros</span>
        </div>
        <div className="cr-note">That's money paid for the privilege of owing — without reducing the original balance at all.</div>
      </div>
      <div className="highlight-box">
        <p><strong>The golden rule of credit cards:</strong> pay the full balance every month. Used this way, a credit card costs nothing in interest and can even offer benefits. The problem only starts when balances are carried over.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}function StepDebtSpiral({ onNext }) {
  const [step, setStep] = useState(0);

  const spiralSteps = [
    {
      emoji: "💳",
      title: "Month 1",
      desc: "Someone spends 500 euros on a credit card. They can only afford to pay 50 euros. The remaining 450 carries over.",
      balance: 450,
      interest: 7.5,
    },
    {
      emoji: "📈",
      title: "Month 2",
      desc: "Interest is added to the 450. The balance is now 457.50. They pay 50 again. Balance: 407.50.",
      balance: 407,
      interest: 6.8,
    },
    {
      emoji: "😟",
      title: "Month 6",
      desc: "Despite paying 50 every month, the balance has barely moved — because interest keeps adding. They've paid 300 euros and still owe nearly 400.",
      balance: 398,
      interest: 6.6,
    },
    {
      emoji: "⚠️",
      title: "The lesson",
      desc: "Minimum payments on high-interest debt can trap people for years. The debt doesn't shrink fast enough because interest keeps growing the balance. This is why understanding credit before you use it matters.",
      balance: null,
      interest: null,
    },
  ];

  const current = spiralSteps[step];

  return (
    <div className="step fade-in">
      <div className="step-emoji">🌀</div>
      <h2>How debt can spiral</h2>
      <p className="step-body">
        Credit card debt is one of the most common financial traps for adults. Remember the snowball effect from Lesson 7? Compound interest works the same way in reverse — except here it's working against you, growing your debt instead of your savings. Here's how it happens — step by step.
      </p>
      <div className="spiral-card">
        <div className="sc-emoji">{current.emoji}</div>
        <h3>{current.title}</h3>
        <p>{current.desc}</p>
        {current.balance && (
          <div className="sc-numbers">
            <div className="sc-num">
              <span>Balance owed</span>
              <span className="sc-val warn">{current.balance} euros</span>
            </div>
            <div className="sc-num">
              <span>Interest this month</span>
              <span className="sc-val warn">+{current.interest} euros</span>
            </div>
          </div>
        )}
        <div className="convo-progress" style={{ marginTop: "12px" }}>
          {spiralSteps.map((_, i) => (
            <div key={i} className={`convo-dot ${i <= step ? "active" : ""}`} />
          ))}
        </div>
        {step < spiralSteps.length - 1 ? (
          <button className="btn-secondary" style={{ marginTop: "12px" }} onClick={() => setStep((s) => s + 1)}>
            Next →
          </button>
        ) : (
          <button className="btn-primary" style={{ marginTop: "12px" }} onClick={onNext}>
            Got it →
          </button>
        )}
      </div>
    </div>
  );
}

function StepWhenCreditMakesSense({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🤝</div>
      <h2>When credit actually makes sense</h2>
      <p className="step-body">
        Credit gets a bad reputation — and unmanaged debt deserves it. But used carefully, credit is a genuinely useful tool. The key is timing.
      </p>
      <div className="tips-list">
        <div className="tip-card">
          <div className="tip-icon">🎸</div>
          <div className="tip-content">
            <h3>Timing mismatches</h3>
            <p>Sometimes something happens right before your income arrives — your favourite band announces a concert, your bike breaks down, a limited opportunity appears. You know the money is coming, but it's not here yet. Credit can bridge that gap, as long as you pay it back as soon as you can.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">🛡️</div>
          <div className="tip-content">
            <h3>Purchase protection — a bonus</h3>
            <p>Many credit cards offer protection if something goes wrong with a purchase — a faulty product, a company that closes, a delivery that never arrives. Paying by credit card can give you an extra layer of security for bigger purchases. This is a useful benefit, not a reason to use credit — but worth knowing about.</p>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>The key question before using credit:</strong> do I know when I'll be able to repay this, and am I confident I will? If the answer is yes — credit is a tool. If the answer is uncertain — it's a risk.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Other forms of debt →</button>
    </div>
  );
}

function StepOtherDebt({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📦</div>
      <h2>Other forms of debt — and what to do instead</h2>
      <p className="step-body">
        Credit cards aren't the only way to borrow. Here are some others you'll come across — and what to know about each.
      </p>
      <div className="tips-list">
        <div className="tip-card">
          <div className="tip-icon">🛒</div>
          <div className="tip-content">
            <h3>Buy Now Pay Later (BNPL)</h3>
            <p>Services like Klarna or Afterpay let people split purchases into instalments. It looks free — but late payments often trigger fees or interest, and it's easy to lose track of what you owe across multiple purchases. Not available to minors, but worth understanding how it works.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">💸</div>
          <div className="tip-content">
            <h3>Personal loans</h3>
            <p>Borrowed from a bank for a fixed amount and repaid over time with interest. More structured than credit cards but same principle — borrowed money costs money. Not accessible until you're an adult with a credit history.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">👨‍👩‍👧</div>
          <div className="tip-content">
            <h3>The age-appropriate version: ask a parent</h3>
            <p>If you genuinely need money before you have it — and you know when you'll be able to repay — asking a parent for an advance is the honest equivalent of short-term credit. Be specific: "Can I borrow €20 from next week's allowance?" Treat it like a real loan. Repay it when you said you would.</p>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p><strong>The common thread:</strong> all debt is borrowed money that must be repaid — usually with a cost attached. Understanding that before you have access to it puts you in a much stronger position than most adults were when they started.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Almost there →</button>
    </div>
  );
}

function StepQuiz({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Debit and credit cards work the same way — the difference is just the name",
    "Credit cards are always better because they offer more protection",
    "With a debit card you spend your own money; with a credit card you borrow and must repay — with interest if not paid in full",
    "Credit cards charge interest immediately on every purchase",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What is the key difference between a debit and a credit card?</h2>
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
            <div className="feedback correct">✓ Exactly. Debit = your money. Credit = borrowed money that must be repaid, with interest if you carry a balance.</div>
          ) : (
            <div className="feedback wrong">Not quite. The key difference: debit spends your own money immediately, credit borrows money you must repay — and charges interest if you don't pay in full each month.</div>
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
      <h2>Lesson 8 done!</h2>
      <p className="step-lead">You now understand something that catches many adults off guard.</p>
      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ How debit cards work — spending your own money</li>
          <li>✓ How credit cards work — borrowing to spend</li>
          <li>✓ The real cost of carrying a credit card balance</li>
          <li>✓ How debt can spiral when only minimum payments are made</li>
          <li>✓ When credit makes sense — and the key question to ask</li>
          <li>✓ The golden rule: pay the full balance every month</li>
        </ul>
      </div>
      <LessonFeedback
        lessonNumber={8}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />
      {feedbackDone && (
        <>
          <p className="step-body">
            One more lesson to go — making money grow, and the risks involved.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 9 →
          </button>
        </>
      )}
    </div>
  );
}