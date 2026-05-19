import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module9.css";

const STEPS = [
  "intro",
  "what-is-investing",
  "lemonade-to-stocks",
  "risk-return",
  "diversification",
  "gambling-line",
  "quiz",
  "complete",
];

export default function Module9({ onComplete, session, onHome }) {
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
        <div className="module-label">Lesson 9 · Making money grow</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
        <button className="home-btn" onClick={onHome}>⌂</button>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "what-is-investing" && <StepWhatIsInvesting onNext={next} />}
        {step === "lemonade-to-stocks" && <StepLemonadeToStocks onNext={next} />}
        {step === "risk-return" && <StepRiskReturn onNext={next} />}
        {step === "diversification" && <StepDiversification onNext={next} />}
        {step === "gambling-line" && <StepGamblingLine onNext={next} />}
        {step === "quiz" && <StepQuiz onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🌱</div>
      <h2>Saving keeps money safe. But it won't make it grow much.</h2>
      <p className="step-lead">
        Saving is essential — we've covered that. A good savings account helps preserve your money's value against inflation. But if you want your money to buy significantly more over time — to genuinely grow — it needs to work harder.
      </p>
      <p className="step-body">
        That's what investing is about. This lesson explains what investing actually means, where the risks come from, and how to think about the line between investing and gambling — which isn't always as clear as it looks.
      </p>
      <div className="highlight-box">
        <p>Investment accounts aren't accessible to minors in most countries. But understanding how this works before you have access puts you well ahead of most people when the time comes.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Let's start →</button>
    </div>
  );
}

function StepWhatIsInvesting({ onNext }) {
  const [scene, setScene] = useState(0);

  const scenes = [
    {
      emoji: "🍋",
      title: "Your friend's idea",
      desc: "Your friend wants to set up a lemonade stall for the day. She needs €10 to buy lemons, cups and sugar. She doesn't have the money. You do.",
    },
    {
      emoji: "🤝",
      title: "You make a deal",
      desc: "You give her the €10 — but instead of expecting it back with interest, you agree to split whatever profit the stall makes. If she earns €20, you each get your €10 back plus €5 profit.",
    },
    {
      emoji: "☀️",
      title: "Good day",
      desc: "The sun shines. She sells 40 cups. Total revenue: €20. After paying you back your €10 and splitting the profit, you've turned €10 into €15. Your money worked.",
    },
    {
      emoji: "🌧️",
      title: "Bad day",
      desc: "It rains all day. Nobody buys lemonade. The lemons go sour. Your friend can't pay you back. You've lost your €10. The risk was real.",
    },
    {
      emoji: "💡",
      title: "That's investing",
      desc: "You put money into something productive — a business, an idea, an asset — in exchange for a share of the outcome. It might grow your money. It might not. The risk is genuine, and so is the potential reward.",
    },
  ];

  const current = scenes[scene];

  return (
    <div className="step fade-in">
      <div className="step-emoji">🍋</div>
      <h2>What is investing? Start with a lemonade stall.</h2>
      <p className="step-body">The concept is simple. The scale gets bigger. Tap through to see how it works.</p>
      <div className="lemonade-card">
        <div className="lc-emoji">{current.emoji}</div>
        <h3>{current.title}</h3>
        <p>{current.desc}</p>
        <div className="convo-progress">
          {scenes.map((_, i) => (
            <div key={i} className={`convo-dot ${i <= scene ? "active" : ""}`} />
          ))}
        </div>
        {scene < scenes.length - 1 ? (
          <button className="btn-secondary" onClick={() => setScene((s) => s + 1)}>Next →</button>
        ) : (
          <button className="btn-primary" onClick={onNext}>From lemonade to stocks →</button>
        )}
      </div>
    </div>
  );
}

function StepLemonadeToStocks({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📈</div>
      <h2>From a lemonade stall to Apple and Google</h2>
      <p className="step-body">
        The lemonade stall is a tiny version of exactly what happens when you buy a share in a company like Apple, Google, or any publicly listed business.
      </p>
      <div className="scale-cards">
        <div className="sc-card small">
          <div className="sc-icon">🍋</div>
          <div className="sc-content">
            <h3>Lemonade stall</h3>
            <p>You put in €10. Your friend uses it to produce something. You share the outcome — profit or loss.</p>
          </div>
        </div>
        <div className="sc-arrow">↓ same idea, much bigger scale ↓</div>
        <div className="sc-card big">
          <div className="sc-icon">🏢</div>
          <div className="sc-content">
            <h3>Buying a share in a company</h3>
            <p>You put in €100. Than is capital you are investing. The company uses capital from many investors to build products and sell them. If the company does well, your share grows in value. If it struggles, it falls.</p>
          </div>
        </div>
      </div>
      <p className="step-body">
        A <strong>share</strong> (also called a stock) is literally a small piece of ownership in a real company. When you buy one Apple share, you own a tiny fraction of Apple — its products, its profits, its future.
      </p>
      <div className="highlight-box">
        <p>The key thing that makes this investing: <strong>the value is connected to something real in the world</strong> — how well the company actually performs over time.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next — the trade-offs →</button>
    </div>
  );
}

function StepRiskReturn({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">⚖️</div>
      <h2>No free lunch — risk and return</h2>
      <p className="step-body">
        One rule in finance holds everywhere, always: <strong>higher potential return comes with higher risk</strong>. There are no exceptions. Anyone offering high returns with no risk is lying or running a scam.
      </p>
      <div className="risk-spectrum">
        <div className="rs-label top">← Lower risk / lower return</div>
        <div className="rs-items">
          <div className="rs-item low">
            <span className="rs-icon">🏦</span>
            <span>Savings account</span>
            <span className="rs-sub">Safe, low return</span>
          </div>
          <div className="rs-arrow">→</div>
          <div className="rs-item mid">
            <span className="rs-icon">📊</span>
            <span>Index fund</span>
            <span className="rs-sub">Moderate risk, historical growth</span>
          </div>
          <div className="rs-arrow">→</div>
          <div className="rs-item high">
            <span className="rs-icon">📈</span>
            <span>Single stock</span>
            <span className="rs-sub">Higher risk, higher potential</span>
          </div>
          <div className="rs-arrow">→</div>
          <div className="rs-item danger">
            <span className="rs-icon">🎲</span>
            <span>Gambling</span>
            <span className="rs-sub">Odds against you</span>
          </div>
        </div>
        <div className="rs-label bottom">Higher risk / higher potential return →</div>
      </div>
      <div className="tips-list">
        <div className="tip-card">
          <div className="tip-icon">📉</div>
          <div className="tip-content">
            <h3>Investments can fall — and that's normal</h3>
            <p>Markets go up and down. A good investment can lose 30% of its value in a bad year and recover fully over the next three. This is why time horizon matters: the longer you can leave money invested, the more likely you are to ride out the bad periods.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">💰</div>
          <div className="tip-content">
            <h3>Only invest what you can afford to leave alone</h3>
            <p>If you might need the money in a year, keep it in savings. Investing works best with money you can genuinely leave untouched for years — where time is on your side.</p>
          </div>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Next — spreading the risk →</button>
    </div>
  );
}function StepDiversification({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🧺</div>
      <h2>Don't put all your eggs in one basket</h2>
      <p className="step-body">
        If you put all your money in one company's shares and that company has a bad year, you could lose a lot. But if you drop the basket — you lose everything. Spread your eggs across many baskets, and dropping one only breaks one egg.
      </p>
      <p className="step-body">
        This is <strong>diversification</strong> — one of the most important ideas in investing.
      </p>
      <div className="egg-visual">
        <div className="ev-side bad">
          <div className="ev-label">All in one basket</div>
          <div className="ev-basket">
            <span style={{fontSize:"2rem"}}>🧺</span>
            <div className="ev-eggs">🥚🥚🥚🥚🥚</div>
          </div>
          <div className="ev-result bad">Basket drops = all eggs broken</div>
        </div>
        <div className="ev-side good">
          <div className="ev-label">Spread across many</div>
          <div className="ev-baskets">
            <div className="ev-mini-basket"><span>🧺</span><span>🥚</span></div>
            <div className="ev-mini-basket"><span>🧺</span><span>🥚</span></div>
            <div className="ev-mini-basket"><span>🧺</span><span>🥚</span></div>
            <div className="ev-mini-basket"><span>🧺</span><span>🥚</span></div>
            <div className="ev-mini-basket"><span>🧺</span><span>🥚</span></div>
          </div>
          <div className="ev-result good">One basket drops = one egg lost</div>
        </div>
      </div>
      <div className="highlight-box">
        <p>
          <strong>Index funds and ETFs</strong> make this practical. Instead of picking individual companies, you buy a small slice of a huge, pre-built basket of hundreds or thousands of companies across many industries and countries. One purchase, instant diversification, usually at low cost. This is how most long-term investors actually invest.
        </p>
      </div>
      <button className="btn-primary" onClick={onNext}>Now — where investing ends and gambling begins →</button>
    </div>
  );
}

function StepGamblingLine({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🎲</div>
      <h2>Where does investing end and gambling begin?</h2>
      <p className="step-body">
        The line isn't always obvious — and some products deliberately blur it. Here's the key distinction:
      </p>
      <div className="gambling-compare">
        <div className="gc-col invest">
          <h3>📈 Investing</h3>
          <ul>
            <li>The value is connected to something real in the world</li>
            <li>A piece of a company that makes actual products</li>
            <li>The odds are not designed against you</li>
            <li>Over long periods, the expected outcome is positive</li>
          </ul>
        </div>
        <div className="gc-col gamble">
          <h3>🎲 Gambling</h3>
          <ul>
            <li>You own nothing — just a bet on an outcome</li>
            <li>The odds are designed to favour the operator</li>
            <li>On average, you will always lose money over time</li>
            <li>The longer you play, the more you lose</li>
          </ul>
        </div>
      </div>

      <p className="step-body">
        You've probably already seen gambling — even if it wasn't called that. Here are the most common forms:
      </p>

      <div className="tips-list">
        <div className="tip-card">
          <div className="tip-icon">⚽</div>
          <div className="tip-content">
            <h3>Sports betting</h3>
            <p>Apps that let you bet on football, tennis, or any sport. The odds look attractive but are always set so the app makes money on average. Most people who bet regularly lose money over time — this is by design, not bad luck.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">🎰</div>
          <div className="tip-content">
            <h3>Slot machines and casino games</h3>
            <p>Every spin or bet has a built-in loss rate. A typical slot machine keeps about 8% of everything put in. The occasional big win is real — but it's paid for by the losses of everyone else playing.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">🎮</div>
          <div className="tip-content">
            <h3>Loot boxes and in-game prizes</h3>
            <p>Paying to open a random box in a game — not knowing what you'll get — is gambling. The "prizes" have no real-world value, and the randomness is designed to keep you spending.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">🎟️</div>
          <div className="tip-content">
            <h3>Lottery tickets</h3>
            <p>The most visible gambling of all. Lottery organisers keep roughly half of all the money spent on tickets — the rest is paid out in prizes, but most of it goes to a tiny number of winners. The jackpot is real, but the odds of winning it are extremely small, and most players lose more than they ever win back.</p>
          </div>
        </div>
      </div>

      <div className="highlight-box">
        <p>
          <strong>Warning signs that something might be gambling dressed up as investing:</strong> promised returns that sound too good, pressure to act quickly, no clear explanation of what your money is actually going into, and lots of exciting language about winning. If you see these — slow down.
        </p>
      </div>

      <div className="crypto-box">
        <div className="cb-header">
          <span className="cb-icon">₿</span>
          <h3>What about cryptocurrencies?</h3>
        </div>
        <p>This is genuinely complicated — and honest people disagree. Some cryptocurrencies have real uses behind them. Others are pure speculation with no real value. Many have been used in scams.</p>
        <p style={{marginTop:"8px"}}>The honest answer: most crypto sits in ambiguous territory. Apply the warning signs above: if someone is promising extraordinary returns and pressuring you to act fast, walk away.</p>
      </div>

      <button className="btn-primary" onClick={onNext}>Final check →</button>
    </div>
  );
}


function StepQuiz({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Investing and gambling are the same — both involve risk and uncertainty",
    "Saving is always better than investing because there is no risk of losing money",
    "Investing connects your money to something real in the world; gambling involves odds designed to favour the operator",
    "Diversification means finding the single best investment and putting everything there",
  ];

  const feedback = [
    "Not quite. Both involve uncertainty — but the key difference is what your money is connected to. Investing links your money to something real. Gambling involves odds deliberately set against you.",
    "Not quite. Saving is safer — but that comes at a cost. Over long periods, investing has historically grown money much more than saving. The trade-off is real risk. Neither is always better.",
    "✓ Exactly. Investing connects your money to something real in the world. Gambling uses odds designed to take your money over time.",
    "Not quite. Diversification means the opposite — spreading money across many different things so that one failure doesn't ruin everything.",
  ];

  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What is the key difference between investing and gambling?</h2>
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

function StepComplete({ onComplete, session }) {
  const [feedbackDone, setFeedbackDone] = useState(false);

  return (
    <div className="step fade-in complete-step">
      <div className="complete-badge">🎓</div>
      <h2>You've completed Your Own Money!</h2>
      <p className="step-lead">That's all nine lessons. You now know more about money than most adults did at your age.</p>
      <div className="summary-box">
        <p className="summary-title">What you covered:</p>
        <ul>
          <li>✓ How to make spending decisions</li>
          <li>✓ Saving with a goal — and the golden rule</li>
          <li>✓ Growing your money pile</li>
          <li>✓ Inflation and why it matters</li>
          <li>✓ Cash vs card — and the psychology behind both</li>
          <li>✓ How banks actually work</li>
          <li>✓ Interest — simple, compound, and why starting early matters</li>
          <li>✓ Debit vs credit — and how debt can spiral</li>
          <li>✓ Investing, risk, diversification — and where gambling begins</li>
        </ul>
      </div>
      <div className="whats-next">
        <p className="wn-title">What's next?</p>
        <p className="wn-body">
          These are the foundations. As you get older — and get access to bank accounts, savings products, and eventually investment accounts — you'll be ready to use them well.
        </p>
        <p className="wn-body">
          There's more to learn: tax, insurance, pensions, more advanced investing. A second course is coming. For now — you're well ahead.
        </p>
      </div>
      <LessonFeedback
        lessonNumber={9}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />
      {feedbackDone && (
        <button className="btn-green" onClick={onComplete}>
          Back to home →
        </button>
      )}
    </div>
  );
}