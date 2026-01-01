import '../styles/hero.css';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-overlay">
        <span className="brand">WanderLust</span>

        <h1>Journey Beyond Horizons</h1>

        <p>
          Dive into the world of travel with stories that transport you to far-off lands.
          Adventure awaits.
        </p>

        <button>LET’S GO!</button>
      </div>
    </header>
  );
}
