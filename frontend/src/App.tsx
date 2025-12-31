import { useEffect, useState } from 'react';
import { getAllPosts } from './api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { getAllPosts().then(setPosts); }, []);
  return (
    <div>
      <h1>🌍 Wanderlust Blog</h1>
      <ul>
        {posts.map((p:any) => (
          <li key={p.id}>{p.title} — {p.authorName}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
