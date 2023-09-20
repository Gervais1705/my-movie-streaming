import React from 'react';
import './App.scss';
import Header from './components/commons/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';
import NotFound from './components/commons/NotFound/NotFound';
import Footer from './components/commons/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/movie/:id' element={<MovieDetails></MovieDetails>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
