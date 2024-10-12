import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import BookList from './components/BookList';
import CharacterList from './components/CharacterList';
import HouseList from './components/HouseList';
import BookDetail from './pages/BookDetail';
import CharacterDetail from './pages/CharacterDetail';
import HouseDetail from './pages/HouseDetail';
import Navbar from './components/Navbar';

const App = () => {
    const username = "User"; // Placeholder for username

    return (
        <Router>
            <Navbar username={username} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/characters" element={<CharacterList />} />
                <Route path="/characters/:id" element={<CharacterDetail />} />
                <Route path="/houses" element={<HouseList />} />
                <Route path="/houses/:id" element={<HouseDetail />} />
                {/* Add other routes here */}
                <Route path="/about" element={() => <h1>About Page</h1>} />
                <Route path="/contact" element={() => <h1>Contact Page</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
