import React from 'react';
import { useSelector } from 'react-redux';
import { verifyGuest } from '../state/guests/verifyGuest';
import LoginWithToken from './LoginWithToken';

const Home = () => {
  const user = useSelector(state => state.user);
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const verifiedToken = useSelector(state => state.verifiedToken);
  return (
    <div>
      {/* si no hay usuario mostrar el primer ingreso con acces code */}
      {(!verifiedGuest.verified || !verifiedToken) && <LoginWithToken />}
      {verifyGuest.checked ||
        (verifiedToken && <h1>todo el contenido de home</h1>)}
      {/* si hay usuario mostrar evento en pending */}
    </div>
  );
};

export default Home;
