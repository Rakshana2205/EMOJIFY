import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import ScoreCard from "./ScoreCard";
import ResultScreen from "./ResultScreen";
import ComboBar from "./ComboBar";
import useSound from "./useSound";
import ThemeSwitcher from "./ThemeSwitcher";

const EMOJIS = ["😄", "🐱", "🦊", "🐸", "🎯", "⭐", "🍕", "🚀", "💎", "🎮"];
const TIPS = [
  "🖱️ Use index finger!",
  "⚡ Find your rhythm!",
  "🎯 Stay focused!",
  "💪 Don't tense up!",
  "🔥 You're on fire!",
  "🚀 Speed is key!",
];
const MILESTONES = [
  { score: 5, label: "Starter", emoji: "🌱" },
  { score: 15, label: "Warming Up", emoji: "🔥" },
  { score: 25, label: "Speed Demon", emoji: "👹" },
  { score: 35, label: "Pro", emoji: "🎯" },
  { score: 45, label: "Legend", emoji: "👑" },
];

function Starfield({ clickCount }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsRef.current = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      opacity: Math.random(),
      twinkle: Math.random() * 0.015 + 0.004,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((s) => {
        s.opacity += s.twinkle;
        if (s.opacity > 1 || s.opacity < 0) s.twinkle *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.abs(s.opacity)})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (clickCount === 0) return;
    const x = Math.random() * canvas.width;
    const vx = (Math.random() - 0.5) * 10;
    const vy = -(Math.random() * 5 + 3);
    let op = 1;
    function shoot() {
      if (op <= 0) return;
      ctx.beginPath();
      ctx.moveTo(x, canvas.height / 2);
      ctx.lineTo(x + vx * 8, canvas.height / 2 + vy * 8);
      ctx.strokeStyle = `rgba(255,220,100,${op})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      op -= 0.06;
      requestAnimationFrame(shoot);
    }
    shoot();
  }, [clickCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function FloatingParticles({ score, isPlaying }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const delay = isPlaying ? Math.max(300, 800 - score * 10) : 900;
    const iv = setInterval(() => {
      const p = {
        id: Date.now() + Math.random(),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        duration: Math.max(900, 2000 - score * 30) + Math.random() * 800,
        size: 14 + Math.random() * 18,
      };
      setParticles((prev) => [...prev.slice(-14), p]);
    }, delay);
    return () => clearInterval(iv);
  }, [score, isPlaying]);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}ms`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

function LeftPanel({ history, cps, isPlaying }) {
  const [tipIdx, setTipIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTipIdx((i) => (i + 1) % TIPS.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(t);
  }, [isPlaying]);

  const max = Math.max(...history, 1);
  return (
    <div className="sidebar left-sidebar">
      <p className="sidebar-title">📊 Stats</p>
      <div className="cps-box">
        <span className="cps-num">{cps}</span>
        <span className="cps-lbl">clicks/sec</span>
      </div>
      <p className="sidebar-sub">Last 5 games</p>
      <div className="bar-chart">
        {history.length === 0 ? (
          <p className="no-data">Play!</p>
        ) : (
          history.slice(-5).map((s, i) => (
            <div key={i} className="bar-col">
              <div
                className="bar-fill"
                style={{ height: `${(s / max) * 60}px` }}
              />
              <span className="bar-val">{s}</span>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: 12,
          paddingTop: 10,
        }}
      >
        <p className="sidebar-title">💡 Tip</p>
        <div className={`tip-box ${fade ? "tip-show" : "tip-hide"}`}>
          <p className="tip-text">{TIPS[tipIdx]}</p>
        </div>
      </div>
    </div>
  );
}

function RightPanel({ score }) {
  return (
    <div className="sidebar right-sidebar">
      <p className="sidebar-title">🏅 Milestones</p>
      {MILESTONES.map((m, i) => {
        const unlocked = score >= m.score;
        return (
          <div
            key={i}
            className={`milestone-row ${unlocked ? "unlocked" : "locked"}`}
          >
            <span className="ms-emoji">{m.emoji}</span>
            <div className="ms-info">
              <p className="ms-label">{m.label}</p>
              <p className="ms-req">{m.score}+ clicks</p>
            </div>
            {unlocked && <span className="ms-check">✓</span>}
          </div>
        );
      })}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: 12,
          paddingTop: 10,
        }}
      >
        <p className="sidebar-title">🌟 Next up</p>
        {(() => {
          const next = MILESTONES.find((m) => score < m.score);
          if (!next)
            return (
              <p className="tip-text" style={{ textAlign: "center" }}>
                👑 MAX RANK!
              </p>
            );
          return (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "white", fontSize: "1.5rem" }}>{next.emoji}</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem" }}>
                {next.label}
              </p>
              <p
                style={{
                  color: "#e040fb",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {next.score - score} more clicks!
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function PlusOne({ id, x, y }) {
  return (
    <span className="plus-one" style={{ left: x, top: y }}>
      +1
    </span>
  );
}

function App() {
  // ✅ ALL useState FIRST
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameState, setGameState] = useState("idle");
  const [best, setBest] = useState(() => {
    const saved = localStorage.getItem("bestScore");
    return saved ? Number(saved) : 0;
  });
  const [emoji, setEmoji] = useState("😄");
  const [plusOnes, setPlusOnes] = useState([]);
  const [scorePop, setScorePop] = useState(false);
  const [history, setHistory] = useState([]);
  const [cps, setCps] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [heat, setHeat] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "purple";
  });
  const [countdown, setCountdown] = useState(null);
  const [shaking, setShaking] = useState(false);

  // ✅ useEffect AFTER useState
  const scoreRef = useRef(0);
  const { playClick, playCombo, playGameStart, playGameEnd } = useSound();
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("ended");
          setBest((prevBest) => {
            const finalScore = scoreRef.current;
            return finalScore > prevBest ? finalScore : prevBest;
          });
          setHistory((prevHistory) => [...prevHistory, scoreRef.current]);
          return 0;
        }
        return prev - 1;
      });

      // ✅ playGameEnd goes HERE — outside setTimeLeft
      if (timeLeft <= 1) {
        playGameEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === "playing") {
      const elapsed = 10 - timeLeft;
      setCps(elapsed > 0 ? (score / elapsed).toFixed(1) : 0);
    }
  }, [score, timeLeft, gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (combo === 0) return;

    const comboTimer = setTimeout(() => {
      setCombo(0);
    }, 1000);

    return () => clearTimeout(comboTimer);
  }, [combo, gameState]);

  useEffect(() => {
    if (gameState !== "playing") {
      setHeat(0);
      return;
    }
    setHeat(Math.min(100, combo * 10));
  }, [combo, gameState]);

  useEffect(() => {
    localStorage.setItem("bestScore", best);
  }, [best]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (gameState !== "countdown") return;
    if (countdown === 0) {
      setGameState("playing");
      playGameStart();
      return;
    }
    const t = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, gameState, playGameStart]);

  useEffect(() => {
    if (timeLeft === 3 && gameState === "playing") {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }, [timeLeft, gameState]);

  // ✅ FUNCTIONS AFTER useEffect
  function startGame() {
    setGameState("countdown");
    setCountdown(3);
    setScore(0);
    setTimeLeft(10);
    setEmoji("😄");
    setPlusOnes([]);
    setCps(0);
    setClickCount(0);
    setCombo(0);
    setHeat(0);
  }

  const handleClick = useCallback(
    (e) => {
      if (gameState !== "playing") return;
      setClickCount((c) => c + 1);
      playClick();
      const rect = e.currentTarget.getBoundingClientRect();
      const newP = {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left - 10,
        y: e.clientY - rect.top - 20,
      };
      setPlusOnes((prev) => [...prev.slice(-8), newP]);
      setTimeout(
        () => setPlusOnes((prev) => prev.filter((p) => p.id !== newP.id)),
        700,
      );

      setScorePop(true);
      setTimeout(() => setScorePop(false), 150);

      setCombo((prev) => prev + 1);

      setScore((prev) => {
        const n = prev + 1;
        if (n % 5 === 0)
          setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
        playCombo();
        return n;
      });
    },
    [gameState, playClick, playCombo],
  );

  // ✅ RETURN LAST
  return (
    <div className="page-wrapper">
      <Starfield clickCount={clickCount} />
      <FloatingParticles score={score} isPlaying={gameState === "playing"} />

      <LeftPanel
        history={history}
        cps={cps}
        isPlaying={gameState === "playing"}
      />
      <ThemeSwitcher theme={theme} onThemeChange={setTheme} />

      <div className={`app-container ${shaking ? "shake" : ""}`}>
        <div className="title-card">
          <h1>EMOJIFY⚡</h1>
          <p>How fast can you click in 10 seconds?</p>
        </div>

        {gameState === "idle" && (
          <div className="idle-screen animate-in">
            <div className="idle-emoji">🎮</div>
            <button className="play-btn" onClick={startGame}>
              Start Game!
            </button>
            {best > 0 && <p className="best-label">🏆 Best: {best}</p>}
          </div>
        )}

        {gameState === "countdown" && (
          <div className="idle-screen animate-in">
            <div className="countdown-number">{countdown}</div>
            <p className="click-hint">get ready!</p>
          </div>
        )}

        {gameState === "playing" && (
          <div className="animate-in">
            <button className="back-btn" onClick={() => setGameState("idle")}>
              ← Back to Home
            </button>

            <ScoreCard
              score={score}
              timeLeft={timeLeft}
              best={best}
              scorePop={scorePop}
            />
            <ComboBar combo={combo} heat={heat} />
            <div className="click-card" onClick={handleClick}>
              <button className="click-btn">{emoji}</button>
              {plusOnes.map((p) => (
                <PlusOne key={p.id} id={p.id} x={p.x} y={p.y} />
              ))}
              <p className="click-hint">tap as fast as you can!</p>
            </div>
          </div>
        )}

        {gameState === "ended" && (
          <div className="animate-in">
            <ResultScreen
              score={score}
              best={best}
              onRestart={startGame}
              onBack={() => setGameState("idle")}
            />
          </div>
        )}
      </div>

      <RightPanel score={score} />
    </div>
  );
}

export default App;
