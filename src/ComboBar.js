function ComboBar({ combo, heat }) {
  function getComboLabel() {
    if (combo >= 20) return { label: "UNSTOPPABLE", color: "#FF3333" };
    if (combo >= 15) return { label: "ON FIRE", color: "#FF6B35" };
    if (combo >= 10) return { label: "BLAZING", color: "#FFD700" };
    if (combo >= 5) return { label: "HEATING UP", color: "#e040fb" };
    if (combo >= 2) return { label: "COMBO", color: "#7F77DD" };
    return null;
  }

  const comboInfo = getComboLabel();

  return (
    <div className="combo-card">
      <div className="combo-row">
        <span className="combo-title">🔥 Heat Meter</span>
        {comboInfo && (
          <span
            className="combo-badge"
            style={{ color: comboInfo.color, borderColor: comboInfo.color }}
          >
            {comboInfo.label}!
          </span>
        )}
      </div>

      <div className="heat-bar-wrapper">
        <div
          className="heat-bar-fill"
          style={{
            width: `${heat}%`,
            background:
              heat > 70
                ? "linear-gradient(90deg, #FF6B35, #FF3333)"
                : heat > 40
                  ? "linear-gradient(90deg, #e040fb, #FF6B35)"
                  : "linear-gradient(90deg, #5c35d4, #e040fb)",
          }}
        />
      </div>

      <div className="combo-stats">
        <span className="combo-count">x{combo}</span>
        <span className="combo-sub">
          {combo === 0 ? "start clicking!" : "keep going!"}
        </span>
      </div>
    </div>
  );
}

export default ComboBar;
