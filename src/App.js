import React from 'react'; //tools
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login'; //components
import Register from './components/Register';
//import Home from './components/Home';

import Navbar from './commons/Navbar'; //commons
import Countdown from './commons/Countdown';


import  './styles/App.css' //styles


function App() {
  return (
    <>
      <Navbar />
      <Countdown/>
      <Routes>
        {/* confirm access-Public */}
     <Route exact path="/login" element={<Login />} />
        {/* register- confirmed token No public */} 
<Route exact path="/register" element={<Register />} />
       
        {/* home-No Public */}
        <Route path="/home" />
      </Routes>
    </>
  );

export default App;
