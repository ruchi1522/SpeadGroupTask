import React from 'react';
import './App.css';
import  CatsMain from './Cats/Cat-Main';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import CatBreedDetails  from './Cats/Cat-Breed-Details';

function App() {
  return (
    <div className="App">
      <header className="App-header">    
      <Router>
      <Routes >
      <Route path="/" element={<CatsMain />} />
      <Route path="/cat/:catId" element={<CatBreedDetails/>} /> 
      </Routes >
    </Router>
      </header>
    </div>
  );
}

export default App;
