import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Consent from "./components/Consent";
import Home from "./components/Home";
import Module1 from "./modules/Module1";
import Module2 from "./modules/Module2";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [session, setSession] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [suggested, setSuggested] = useState({ amount: "", frequency: "week" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lesson = params.get("lesson");
    if (lesson === "2") setScreen("module2");
    if (lesson === "done") setScreen("done");
  }, []);

  const handleConsent = (sessionData) => {
    setSession(sessionData);
    setScreen("home");
  };

  const completeLesson = (lessonNumber) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonNumber) ? prev : [...prev, lessonNumber]
    );
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
        <Module1
          session={session}
          onHome={goHome}
          onComplete={() => completeLesson(1)}
        />
      )}
      {screen === "module2" && (
        <Module2
          session={session}
          onHome={goHome}
          onComplete={() => completeLesson(2)}
        />
      )}
    </div>
  );
}