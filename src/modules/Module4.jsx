import { useState } from "react";
import LessonFeedback from "../components/LessonFeedback";
import "./Module4.css";

const STEPS = [
  "intro",
  "what-is-inflation",
  "basket",
  "percentage",
  "simulator",
  "quiz1",
  "what-it-means",
  "quiz2",
  "complete",
];

export default function Module4({ onComplete, session, onHome }) {
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
        <div className="module-label">Lesson 4 · Inflation</div>
        <div className="step-count">{stepIndex + 1}/{STEPS.length}</div>
        <button className="home-btn" onClick={onHome}>⌂</button>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="module-body">
        {step === "intro" && <StepIntro onNext={next} />}
        {step === "what-is-inflation" && <StepWhatIsInflation onNext={next} />}
        {step === "basket" && <StepBasket onNext={next} />}
        {step === "percentage" && <StepPercentage onNext={next} />}
        {step === "simulator" && <StepSimulator onNext={next} />}
        {step === "quiz1" && <StepQuiz1 onNext={next} />}
        {step === "what-it-means" && <StepWhatItMeans onNext={next} />}
        {step === "quiz2" && <StepQuiz2 onNext={next} />}
        {step === "complete" && <StepComplete onComplete={onComplete} session={session} />}
      </div>
    </div>
  );
}

function StepIntro({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">📊</div>
      <h2>Your money is losing value. Slowly — but it is.</h2>
      <p className="step-lead">
        Even if you save perfectly and don't spend a single coin, the money you have today will buy slightly less in a year from now. This isn't a mistake or a scam — it's just how economies work.
      </p>
      <p className="step-body">
        It's called <strong>inflation</strong>. Understanding it is one of the most useful things you can know about money.
      </p>
      <div className="highlight-box">
        <p>The good news: once you understand it, you can do something about it. That's what this lesson covers.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Let's understand it →</button>
    </div>
  );
}

function StepWhatIsInflation({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🛒</div>
      <h2>What is inflation?</h2>
      <p className="step-body">
        Inflation is the gradual rise in the price of things over time. You've probably noticed it — something that cost a certain amount a few years ago costs more now.
      </p>
      <p className="step-body">
        It happens because of a combination of things: more money in circulation, higher costs for businesses, more demand for goods. The details are complex — but the effect is simple.
      </p>
      <div className="inflation-example">
        <div className="ie-year">
          <div className="ie-label">A few years ago</div>
          <div className="ie-items">
            <div className="ie-item">🥤 Drink</div>
            <div className="ie-item">🍫 Snack</div>
            <div className="ie-item">🚌 Bus ride</div>
          </div>
          <div className="ie-total old">= 5 moneys</div>
        </div>
        <div className="ie-arrow">→</div>
        <div className="ie-year">
          <div className="ie-label">Today</div>
          <div className="ie-items">
            <div className="ie-item">🥤 Drink</div>
            <div className="ie-item">🍫 Snack</div>
            <div className="ie-item">🚌 Bus ride</div>
          </div>
          <div className="ie-total new">= 5.5 moneys</div>
        </div>
      </div>
      <p className="step-body">Same things. Same amount. But they cost more. That's inflation in action.</p>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepBasket({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">🧺</div>
      <h2>How inflation is measured</h2>
      <p className="step-body">
        Economists measure inflation by tracking the price of a "basket" of goods — a collection of everyday things people typically buy. Things like food, transport, clothing, and energy.
      </p>
      <p className="step-body">
        They check the price of this basket regularly and compare it to what it cost before. If the basket costs more, prices have gone up — that's inflation.
      </p>
      <div className="basket-visual">
        <div className="basket-items">
          <span>🍞</span><span>🥛</span><span>🚌</span>
          <span>💡</span><span>👕</span><span>🍎</span>
        </div>
        <div className="basket-label">The basket of everyday goods</div>
        <div className="basket-arrows">
          <div className="basket-year">
            <span className="basket-price old">100 moneys</span>
            <span className="basket-date">Year 1</span>
          </div>
          <div className="basket-trend">↗</div>
          <div className="basket-year">
            <span className="basket-price new">104 moneys</span>
            <span className="basket-date">Year 2</span>
          </div>
        </div>
        <div className="basket-caption">4% inflation — the basket costs 4% more</div>
      </div>
      <div className="highlight-box">
        <p>Different countries measure this differently, but the idea is the same everywhere. The number they publish is what we call the <strong>inflation rate</strong>.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}

function StepPercentage({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">%</div>
      <h2>What does the percentage actually mean?</h2>
      <p className="step-body">
        Inflation is expressed as a percentage — usually per year. It tells you how much more expensive things have become compared to a year ago.
      </p>
      <div className="percent-cards">
        <div className="percent-card">
          <div className="percent-num low">2%</div>
          <div className="percent-desc">
            <strong>Low inflation</strong>
            <p>100 moneys buys goods worth 98 moneys a year later. Prices are rising slowly — this is considered normal and healthy.</p>
          </div>
        </div>
        <div className="percent-card">
          <div className="percent-num mid">6%</div>
          <div className="percent-desc">
            <strong>Higher inflation</strong>
            <p>100 moneys buys goods worth 94 moneys a year later. You notice it — things feel more expensive than they used to be.</p>
          </div>
        </div>
        <div className="percent-card">
          <div className="percent-num high">20%+</div>
          <div className="percent-desc">
            <strong>Very high inflation</strong>
            <p>This is serious. Some countries have experienced this and it can be very damaging — savings lose value fast and people struggle to plan ahead.</p>
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <p><strong>Simple rule:</strong> if inflation is 4%, then something that cost 100 moneys at the start of the year will cost 104 moneys at the end. Your 100 moneys now buys less than it did.</p>
      </div>
      <button className="btn-primary" onClick={onNext}>See it in action →</button>
    </div>
  );
}

function StepSimulator({ onNext }) {
  const [amount, setAmount] = useState("100");
  const [inflation, setInflation] = useState(4);
  const [years, setYears] = useState(1);

  const amountNum = parseFloat(amount) || 100;

  return (
    <div className="step fade-in">
      <div className="step-emoji">🔭</div>
      <h2>See what inflation does to your money</h2>
      <p className="step-body">
        Adjust the sliders to see how inflation affects the buying power of your money over time.
      </p>
      <div className="simulator-card">
        <div className="sim-field">
          <label>Amount saved</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            className="sim-input"
          />
        </div>
        <div className="sim-field">
          <label>Inflation rate: <strong>{inflation}%</strong></label>
          <input
            type="range"
            min="1"
            max="20"
            value={inflation}
            onChange={(e) => setInflation(Number(e.target.value))}
            className="sim-slider"
          />
          <div className="sim-range-labels">
            <span>1% (low)</span>
            <span>20% (very high)</span>
          </div>
        </div>
        <div className="sim-field">
          <label>Years: <strong>{years}</strong></label>
          <input
            type="range"
            min="1"
            max="10"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="sim-slider"
          />
          <div className="sim-range-labels">
            <span>1 year</span>
            <span>10 years</span>
          </div>
        </div>
      </div>
      <div className="sim-result">
        <div className="sim-result-row">
          <span className="sim-result-label">Your money today</span>
          <span className="sim-result-value">{amountNum} moneys</span>
        </div>
        <div className="sim-result-row">
          <span className="sim-result-label">What it buys in {years} year{years > 1 ? "s" : ""}</span>
          <span className="sim-result-value warn">{(amountNum * Math.pow(1 - inflation/100, years)).toFixed(1)} moneys worth</span>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Next →</button>
    </div>
  );
}
function StepQuiz1({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 1;
  const options = [
    "Prices going down over time",
    "Prices gradually rising over time, so money buys less",
    "The government printing too much money",
    "Prices staying the same for a long time",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>What is inflation?</h2>
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
            <div className="feedback correct">✓ Exactly. Prices rise gradually, so the same amount of money buys less over time.</div>
          ) : (
            <div className="feedback wrong">Not quite. Inflation means prices gradually rise over time — so your money buys less than it did before.</div>
          )}
          <button className="btn-primary" style={{ marginTop: "20px" }} onClick={onNext}>Next →</button>
        </>
      )}
    </div>
  );
}

function StepWhatItMeans({ onNext }) {
  return (
    <div className="step fade-in">
      <div className="step-emoji">💡</div>
      <h2>What this means for your savings</h2>
      <p className="step-body">
        If you save money and leave it somewhere that earns nothing — under your mattress, in a jar, in a basic account — inflation slowly eats away at its value. You still have the same number of coins, but they buy less.
      </p>
      <div className="highlight-box">
        <p>
          <strong>Example:</strong> you save 100 moneys. Inflation is 4% per year. After one year, your 100 moneys can only buy what 96 moneys could buy before. After 5 years, it's more like 82 moneys worth of buying power.
        </p>
      </div>
      <p className="step-body">
        This doesn't mean saving is bad — saving is still essential. But it does mean there's a risk to just leaving money sitting still.
      </p>
      <div className="tips-list">
        <div className="tip-card">
          <div className="tip-icon">🏦</div>
          <div className="tip-content">
            <h3>One solution: put your money to work</h3>
            <p>If your savings earn interest — even a small amount — that can offset inflation or even beat it. We'll cover interest in Lesson 7.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">⏱️</div>
          <div className="tip-content">
            <h3>For short-term saving, inflation matters less</h3>
            <p>If you're saving for something you'll buy in a few weeks or months, inflation won't make a meaningful difference. It matters more for longer-term savings.</p>
          </div>
        </div>
        <div className="tip-card">
          <div className="tip-icon">📰</div>
          <div className="tip-content">
            <h3>It's worth knowing your country's inflation rate</h3>
            <p>It changes over time and varies by country. Knowing the current rate helps you understand what's happening to prices around you — and whether your savings are keeping up.</p>
          </div>
        </div>
      </div>
      <button className="btn-primary" onClick={onNext}>Almost there →</button>
    </div>
  );
}

function StepQuiz2({ onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = 2;
  const options = [
    "Nothing — money in a jar is always safe",
    "The jar might get lost or stolen, but the money itself doesn't change",
    "Over time, you'll almost certainly be able to buy a little less with the same amount",
    "Inflation only affects bank accounts, not cash",
  ];
  return (
    <div className="step fade-in">
      <div className="quiz-badge">Quick check ✓</div>
      <h2>If you leave money in a jar for a long time, what happens?</h2>
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
            <div className="feedback correct">✓ Exactly. The coins are still there — but inflation means they'll almost certainly buy a little less than they used to.</div>
          ) : (
            <div className="feedback wrong">Not quite. Because of inflation, money that just sits there will almost certainly buy a little less over time — even if the amount looks the same.</div>
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
      <h2>Lesson 4 done!</h2>
      <p className="step-lead">You now understand one of the most important forces in personal finance.</p>
      <div className="summary-box">
        <p className="summary-title">What you learned:</p>
        <ul>
          <li>✓ What inflation is and why it happens</li>
          <li>✓ How it's measured using a basket of goods</li>
          <li>✓ What an inflation percentage actually means</li>
          <li>✓ Why savings left earning nothing slowly lose value</li>
          <li>✓ What you can do about it (more in Lesson 7)</li>
        </ul>
      </div>
      <LessonFeedback
        lessonNumber={4}
        session={session}
        onComplete={() => setFeedbackDone(true)}
      />
      {feedbackDone && (
        <>
          <p className="step-body">
            Next up: cash or card — and why the difference matters more than you think.
          </p>
          <button className="btn-green" onClick={onComplete}>
            Continue to Lesson 5 →
          </button>
        </>
      )}
    </div>
  );
}