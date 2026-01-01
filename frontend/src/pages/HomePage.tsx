import BlogFeed from "../components/blog-feed";
import Header from "../components/header";
import Hero from "../components/hero";
import "../styles/home.css";
import "../styles/hero.css";

export default function HomePage() {
  return (
    <>
    <Header />
      <Hero />
      <main className="home-layout">
        <section className="left-column">
          <h2>Featured Posts</h2>
          <BlogFeed />
        </section>

        <aside className="right-column">
          <section>
            <h3>Categories</h3>
            <div className="category-pills">
              <span>Luxury</span>
              <span>Solo Travel</span>
              <span>Family</span>
              <span>Destination</span>
              <span>Tourist Place</span>
            </div>
          </section>

          <section>
            <h3>Latest Posts</h3>
            <ul className="latest-posts">
              <li>A Serene Escape to Bali’s Hidden Beaches</li>
              <li>Trekking the Inca Trail</li>
              <li>Savoring Tuscany</li>
            </ul>
          </section>
        </aside>
      </main>
    </>
  );
}
