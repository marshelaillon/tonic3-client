import React from 'react';
import Login from './Login';

const Home = () => {
  return (
    <div>
      {/* si no hay usuario mostrar el primer ingreso con acces code */}
      <Login />
      {/* si hay usuario mostrar evento en pending */}
    </div>
  );
};

export default Home;
