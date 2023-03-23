import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BooksPage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <Routes>
        <Route exact path="/" element = {<BooksPage />}></Route>
        <Route path="/register" element = {<RegistrationForm />}></Route>
    </Routes>
  );
}

export default App;
