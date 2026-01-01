export default function Hero() {
  return (
    <section className="section-enter mx-auto mt-6 max-w-6xl overflow-hidden rounded-2xl shadow">
      <div
        className="relative h-[360px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <span className="mb-2 text-sm opacity-80">WanderLust</span>

          <h1 className="mb-3 text-4xl font-bold">
            Journey Beyond Horizons
          </h1>

          <p className="mb-6 max-w-xl text-sm opacity-90">
            Dive into the world of travel with stories that transport you
            to far-off lands.
          </p>

          <button className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white hover:opacity-90">
            LET'S GO!
          </button>
        </div>
      </div>
    </section>
  );
}