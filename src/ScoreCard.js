function ScoreCard({ score, timeLeft, best, scorePop }) {
  return (
    <div className="score-section">
      <div className="time-bar-wrapper">
        <div
          className="time-bar"
          style={{ width: `${(timeLeft / 10) * 100}%` }}
        />
      </div>
      <div className="stats-row">
        <div className="stat-box">
          <span className={`stat-num ${timeLeft <= 3 ? "danger" : ""}`}>
            {timeLeft}s
          </span>
          <span className="stat-lbl">Time Left</span>
        </div>
        <div className="stat-box">
          <span className={`stat-num giant ${scorePop ? "pop" : ""}`}>
            {score}
          </span>
          <span className="stat-lbl">Score</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{best}</span>
          <span className="stat-lbl">Best</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
