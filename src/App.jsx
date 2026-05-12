import { useState } from "react";
import Welcome from "./components/Welcome";
import Module1 from "./modules/Module1";
import Module2 from "./modules/Module2";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("welcome");

  return (
    <div className="app">
      {screen === "welcome" && <Welcome onStart={() => setScreen("module1")} />}
      {screen === "module1" && <Module1 onComplete={() => setScreen("module2")} />}
      {screen === "module2" && <Module2 onComplete={() => setScreen("done")} />}
      {screen === "done" && (
        <div className="done-screen">
          <div className="done-inner">
            <div className="done-emoji">🌟</div>
            <h1>Great work!</h1>
            <p>You've finished the first two lessons. More coming soon.</p>
            <button className="btn-primary" onClick={() => setScreen("welcome")}>
              Start again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}