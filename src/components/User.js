import { useSelector } from 'react-redux';
import '../styles/user.css';
import { PleaseRegister } from '../utils/sweetAlerts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function User() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      PleaseRegister();
      navigate('/register');
    }
  }, []);
  const handleEdit = () => {
   console.log("edit active");
  };
  return (
    <>
      <div className="card mb-9 perfil-card ">
        <div className="card-header" style={{ background: 'black' }}>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="imag">
              <img
                src={user.profilePicture}
                className="card-img user-foto"
              ></img>
            </li>
            <li className="nav-item">
              <p
                className="nav-link active text-white"
                style={{
                  background: '#141321b2',
                  border: 'solid 1px #212529',
                }}
                onClick={handleEdit()}
              >
                Edita tu perfil
              </p>
            </li>
          </ul>
        </div>
        <p />
        <label className=" text-white" htmlFor="email ">
          <p>User Name</p>
          <input className="perfil-input" value={user.userName}></input>
        </label>

        <label className="text-white" htmlFor="email ">
          <p> Nombre</p>
          <input className="perfil-input" value={user.firstName}></input>
        </label>
        <label className=" text-white" htmlFor="email ">
          <p> Apellido</p>
          <input className="perfil-input" value={user.lastName}></input>
        </label>
        <label className=" text-white" htmlFor="email ">
          <p> E-mail</p>
          <input className="perfil-input" value={user.email}></input>
        </label>
        <label className=" text-white" htmlFor="email ">
          <p> genero</p>
          <input className="perfil-input" value={user.genre}></input>
        </label>
      </div>
    </>
  );
}
export default User;
