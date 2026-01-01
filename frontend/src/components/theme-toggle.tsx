import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
      style={{
        borderRadius: "999px",
        padding: "0.4rem 0.8rem",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        cursor: "pointer"
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
