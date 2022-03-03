import React, { FC } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Student from './pages/Student';



const App: FC = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='page/:pageNum' element={<Home />} />
        </Route>
        <Route path='/student/:srudentId' element={<Student />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
