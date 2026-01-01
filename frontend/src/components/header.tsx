import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)"
      }}
    >
      <strong>WanderLust</strong>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <ThemeToggle />
        <button
          style={{
            padding: "0.4rem 1rem",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            background: "transparent",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </header>
  );
}
