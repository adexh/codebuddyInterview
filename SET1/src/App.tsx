import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import FormPage from './pages/forms/formPage';
import Posts from './pages/posts/posts';

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </Router>
    </>
  )
}

export default App