import Hero from '../components/Hero';
import BlogFeed from '../components/BlogFeed';
import LatestPostCard from '../components/LatestPostCard';
import type { Post } from '../types';

interface Props {
  latestPosts?: Post[];
}

export default function HomePage({ latestPosts = [] }: Props) {
  return (
    <main className="page-enter mx-auto max-w-7xl px-4 pb-20">
      <section className="section-enter pt-6">
        <Hero />
      </section>

      <section className="section-enter mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <header className="mb-6">
            <h2 className="text-xl font-semibold">Blog Feed</h2>
            <p className="mt-1 text-sm opacity-70">
              Stories worth reading
            </p>
          </header>

          <BlogFeed />
        </div>

        <aside className="section-enter lg:col-span-4">
          <div className="sticky top-24 space-y-10">
            <h3 className="text-sm font-semibold">Latest Posts</h3>
            <div className="space-y-3">
              {latestPosts.map((post) => (
                <LatestPostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}