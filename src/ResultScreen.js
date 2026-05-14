import { useEffect, useState } from "react";

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 600,
    color: ["#5c35d4", "#e040fb", "#FFD700", "#FF6B35", "#4CAF50"][
      Math.floor(Math.random() * 5)
    ],
    size: 6 + Math.random() * 6,
  }));

  return (
    <div className="confetti-wrapper">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}ms`,
            background: p.color,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

function ResultScreen({ score, best, onRestart, onBack }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  function getRank() {
    if (score >= 40) return { rank: "LEGEND", emoji: "👑", color: "#FFD700" };
    if (score >= 30) return { rank: "PRO", emoji: "🔥", color: "#FF6B35" };
    if (score >= 20) return { rank: "SKILLED", emoji: "⚡", color: "#7F77DD" };
    if (score >= 10) return { rank: "NOOB", emoji: "🌱", color: "#4CAF50" };
    return { rank: "SLEEPY", emoji: "😴", color: "#888" };
  }

  const { rank, emoji, color } = getRank();
  const isNewBest = score === best && score > 0;

  return (
    <div className={`result-screen ${show ? "result-show" : ""}`}>
      <Confetti />
      {isNewBest && (
        <div>
          <div className="new-best-badge">🎉 NEW PERSONAL BEST!</div>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.8rem",
              marginBottom: "12px",
            }}
          >
            You crushed your old record!
          </p>
        </div>
      )}
      <div className="rank-display" style={{ color }}>
        <span className="rank-emoji">{emoji}</span>
        <span className="rank-title">{rank}</span>
      </div>
      <p className="result-score">{score} clicks</p>
      <p className="result-sub">in 10 seconds</p>
      <button className="play-btn" onClick={onRestart}>
        Play Again 🔄
      </button>
      <button className="back-btn" onClick={onBack}>
        ← Back to Home
      </button>

      <p className="best-label">🏆 Best Ever: {best}</p>
      <p className="best-label">🏆 Best Ever: {best}</p>
    </div>
  );
}

export default ResultScreen;
