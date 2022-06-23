
import React from "react"
import { Route, Routes } from 'react-router';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return <div>
<Routes>
  <Route exact path="/login" element={<Login />} />
  <Route exact path="/register" element={<Register />} />

</Routes>

  </div>;
}

export default App;
