import React from 'react';
import LoginWithToken from './LoginWithToken';

const Home = () => {
  return (
    <div>
      {/* si no hay usuario mostrar el primer ingreso con acces code */}
      <LoginWithToken />
      {/* si hay usuario mostrar evento en pending */}
    </div>
  );
};

export default Home;
