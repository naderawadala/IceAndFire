import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import BookList from './components/BookList';
import CharacterList from './components/CharacterList';
import HouseList from './components/HouseList';
import BookDetail from './pages/BookDetail';
import CharacterDetail from './pages/CharacterDetail';
import HouseDetail from './pages/HouseDetail';
import BookForm from './components/BookForm';
import Navbar from './components/Navbar';

const App = () => {
    const username = "User"; // Placeholder for username

    return (
        <Router>
            <Navbar username={username} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:name" element={<BookDetail />} />
                <Route path="/update-book/:name" element={<BookForm />} /> 
                <Route path="/books/new" element={<BookForm />} />

                <Route path="/characters" element={<CharacterList />} />
                <Route path="/characters/:id" element={<CharacterDetail />} />

                <Route path="/houses" element={<HouseList />} />
                <Route path="/houses/:id" element={<HouseDetail />} />


            </Routes>
        </Router>
    );
};

export default App;
