import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogFeed from './components/blog-feed';
import PostDetails from './pages/post-details';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogFeed />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
