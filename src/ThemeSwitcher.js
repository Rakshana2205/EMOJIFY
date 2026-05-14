const THEMES = [
  { id: "purple", color: "#5c35d4", label: "💜" },
  { id: "blue", color: "#1877F2", label: "💙" },
  { id: "green", color: "#0F6E56", label: "💚" },
  { id: "red", color: "#E24B4A", label: "❤️" },
  { id: "orange", color: "#FF6B35", label: "🧡" },
];

function ThemeSwitcher({ theme, onThemeChange }) {
  return (
    <div className="theme-switcher">
      <p className="theme-label">🎨 Theme</p>
      <div className="theme-dots">
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={`theme-dot ${theme === t.id ? "active" : ""}`}
            style={{ background: t.color }}
            onClick={() => onThemeChange(t.id)}
            title={t.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
