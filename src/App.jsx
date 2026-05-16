import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Consent from "./components/Consent";
import Home from "./components/Home";
import Module1 from "./modules/Module1";
import Module2 from "./modules/Module2";
import Module3 from "./modules/Module3";
import Module4 from "./modules/Module4";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [session, setSession] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem("completedLessons");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lesson = params.get("lesson");
    if (lesson === "2") setScreen("module2");
    if (lesson === "3") setScreen("module3");
    if (lesson === "4") setScreen("module4");
  }, []);

  const handleConsent = (sessionData) => {
    setSession(sessionData);
    setScreen("home");
  };

 const completeLesson = (lessonNumber) => {
    setCompletedLessons((prev) => {
      const updated = prev.includes(lessonNumber) ? prev : [...prev, lessonNumber];
      localStorage.setItem("completedLessons", JSON.stringify(updated));
      return updated;
    });
    setScreen("home");
  };

  const goHome = () => setScreen("home");

  return (
    <div className="app">
      {screen === "welcome" && <Welcome onStart={() => setScreen("consent")} />}
      {screen === "consent" && <Consent onComplete={handleConsent} />}
      {screen === "home" && (
        <Home
          completedLessons={completedLessons}
          onSelectLesson={(s) => setScreen(s)}
        />
      )}
      {screen === "module1" && (
        <Module1 session={session} onHome={goHome} onComplete={() => completeLesson(1)} />
      )}
      {screen === "module2" && (
        <Module2 session={session} onHome={goHome} onComplete={() => completeLesson(2)} />
      )}
      {screen === "module3" && (
        <Module3 session={session} onHome={goHome} onComplete={() => completeLesson(3)} />
      )}
      {screen === "module4" && (
        <Module4 session={session} onHome={goHome} onComplete={() => completeLesson(4)} />
      )}
    </div>
  );
}