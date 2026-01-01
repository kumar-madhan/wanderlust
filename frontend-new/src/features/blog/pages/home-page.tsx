import BlogFeed from '../components/BlogFeed';
import Hero from '../components/Hero';

export default function HomePage() {
  return (
    <div className="px-4 py-6">
      <Hero />
      <BlogFeed />
    </div>
  );
}
