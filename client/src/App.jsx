import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import About from './pages/About';
import Upload from './pages/Upload';
import Faq from './pages/Faq';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); 

  console.log('Is Authenticated:', isAuthenticated); // Debugging line

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuthenticated ? (
          <>
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        {/* Catch-all route for 404 or unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// Make sure you have a NotFound component
const NotFound = () => <h2>404 - Page Not Found</h2>;

export default App;
