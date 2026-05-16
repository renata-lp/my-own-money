import "./Home.css";

const LESSONS = [
  {
    number: 1,
    title: "Spending decisions",
    description: "Needs vs wants, the joy test, and the pause that saves money.",
    emoji: "💸",
    screen: "module1",
  },
  {
    number: 2,
    title: "Saving for something bigger",
    description: "How to set a goal, save consistently, and make it happen.",
    emoji: "🎯",
    screen: "module2",
  },
  {
    number: 3,
    title: "Growing your money pile",
    description: "Earning more, selling smart, and topping up your savings.",
    emoji: "📈",
    screen: "module3",
  },
  {
    number: 4,
    title: "Inflation",
    description: "Why waiting has a cost — and what it means for your money.",
    emoji: "📊",
    screen: "module4",
  },
  {
    number: 5,
    title: "Cash or card?",
    description: "The difference, the advantages, and when each makes sense.",
    emoji: "💳",
    screen: "module5",
    comingSoon: true,
  },
  {
    number: 6,
    title: "What is a bank account?",
    description: "How banks work, what they do with your money, and how safe it is.",
    emoji: "🏦",
    screen: "module6",
    comingSoon: true,
  },
  {
    number: 7,
    title: "Interest",
    description: "Making your money work for you while you sleep.",
    emoji: "💰",
    screen: "module7",
    comingSoon: true,
  },
  {
    number: 8,
    title: "Debit or credit?",
    description: "Spending your own money vs borrowing — and why it matters.",
    emoji: "🤝",
    screen: "module8",
    comingSoon: true,
  },
];

export default function Home({ completedLessons, onSelectLesson }) {
  const completedCount = completedLessons.length;
  const progress = (completedCount / LESSONS.length) * 100;

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-title-wrap">
          <div className="home-coin">$</div>
          <div>
            <h1 className="home-title">Your Own Money</h1>
            <p className="home-subtitle">Are you ready?</p>
          </div>
        </div>

        {completedCount > 0 && (
          <div className="home-progress">
            <div className="home-progress-label">
              {completedCount} of {LESSONS.length} lessons done
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="lessons-grid">
        {LESSONS.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.number);
          const isNext = !isCompleted && lesson.number === Math.min(
            ...LESSONS.filter(l => !completedLessons.includes(l.number)).map(l => l.number)
          );
          const isLocked = !isCompleted && !isNext;
          const isAvailable = isCompleted || isNext;

          return (
            <div
              key={lesson.number}
              className={`lesson-card ${isCompleted ? "completed" : ""} ${isNext ? "next" : ""} ${isLocked ? "locked" : ""}`}
              onClick={() => isAvailable && !lesson.comingSoon && onSelectLesson(lesson.screen)}
            >
              <div className="lesson-card-top">
                <div className="lesson-emoji">
                  {isLocked ? "🔒" : lesson.emoji}
                </div>
                <div className="lesson-number">Lesson {lesson.number}</div>
                {isCompleted && <div className="lesson-tick">✓</div>}
                {lesson.comingSoon && !isLocked && (
                  <div className="lesson-soon">Soon</div>
                )}
              </div>
              <h3 className="lesson-title">{lesson.title}</h3>
              <p className="lesson-desc">{lesson.description}</p>
              {isNext && !lesson.comingSoon && (
                <div className="lesson-cta">Start →</div>
              )}
              {isCompleted && (
                <div className="lesson-revisit">Tap to revisit</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="home-footer">
        <a href="https://learnmoney.eu" target="_blank" rel="noopener noreferrer" className="learnmoney-link">
          A LearnMoney initiative
        </a>
        <span className="footer-divider">·</span>
        <span className="copyright">© 2025 LearnMoney. All rights reserved.</span>
      </div>
    </div>
  );
}