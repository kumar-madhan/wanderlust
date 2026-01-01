// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import BlogFeed from './components/blog-feed';
import PostDetails from './pages/post-details';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetails />} />
    </Routes>
  );
}

export default App;
