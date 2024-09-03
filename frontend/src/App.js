import React from 'react';
import "./App.css"
import { Navbar, Footer } from './pages/layout';
import { Home } from './pages/home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {
  return (

      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
     
      
      <Footer />
      </BrowserRouter>

  );
};

export default App;
