import React from 'react';
import { useSelector } from 'react-redux';
import LoginWithToken from './LoginWithToken';
import Countdown from '../commons/Countdown';

const Home = () => {
  const user = useSelector(state => state.user);
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const verifiedToken = useSelector(state => state.verifiedToken);
  return (
    <>
      <div className="home-content row-sm">
        {/* si no hay usuario mostrar el primer ingreso con acces code */}
        {/* {(!verifiedGuest.verified || !verifiedToken) && <LoginWithToken />} */}
        {user.id /*  || verifiedToken */ ? <Countdown /> : <LoginWithToken />}
        {/* si hay usuario mostrar evento en pending */}
      </div>
    </>
  );
};

export default Home;

/*El estado de verifiedGuest deberia persistir durante el mismo tiempo que persista el user,
si el usuario se desloguea, se desverifica automaticamente. El estado verifiedGuest DEBE persistir 
junto con el estado de usuario. Guardarlo como un token e implementar la misma logica que con el user me huele a buen plan. */
