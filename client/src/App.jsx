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
import HouseForm from './components/HouseForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/MyNavbar';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            {token && <Navbar />}
            <Routes>
                {token ? (
                    <>
                        <Route path="/" element={<Main />} />
                        <Route path="/books" element={<BookList />} />
                        <Route path="/books/:name" element={<BookDetail />} />
                        <Route path="/update-book/:name" element={<BookForm />} /> 
                        <Route path="/books/new" element={<BookForm />} />
                        <Route path="/characters" element={<CharacterList />} />
                        <Route path="/characters/:name" element={<CharacterDetail />} />
                        <Route path="/houses" element={<HouseList />} />
                        <Route path="/houses/new" element={<HouseForm />} />
                        <Route path="/houses/:name" element={<HouseDetail />} />
                        <Route path="/update-house/:name" element={<HouseForm />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
