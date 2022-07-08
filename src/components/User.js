import { useDispatch, useSelector } from 'react-redux';
import '../styles/user.css';
import { PleaseRegister } from '../utils/sweetAlerts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillGearFill, BsCheckCircleFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useInput } from '../hooks/useInput';
import { updateUser } from '../state/user/user';

export default function User() {
  const [editInput, setEdit] = useState(false);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useInput();
  const firstName = useInput();
  const lastName = useInput();
  const genre = useInput();

  useEffect(() => {
    if (!user.id) {
      PleaseRegister();
      navigate('/register');
    }
  }, []);
  const handleEdit = () => {
    setEdit(!editInput);
  };
  const handleSubmit = value => {
    //crear estado para la ruta
    dispatch(
      updateUser({
        id: user.id,
        userName: userName.value || user.userName,
        firstName: firstName.value || user.firstName,
        lastName: lastName.value || user.lastName,
        genre: genre.value || user.genre,
      })
    );
    handleEdit();
  };

  return (
    <>
      <div className="container porfile">
        <div className="card mb-9 perfil-card ">
          <div className="card-header" style={{ background: 'black' }}>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="imag">
                <img
                  src={user.profilePicture}
                  className="card-img user-foto"
                ></img>
              </li>
             
                <p
                  className="nav-link active text-white"
                  style={{
                    background: '#141321b2',
                    border: 'solid 1px #212529',
                  }}
                >
                  {!editInput ? (
                    <>
                      Edita tu perfil
                      <BsFillGearFill
                        onClick={handleEdit}
                        style={{
                          margin: '1px  10px 2px',
                          cursor: 'pointer',
                        }}
                        size={20}
                      />
                    </>
                  ) : (
                    <>
                      {' '}
                      Guarda
                      <BsCheckCircleFill
                        onClick={handleSubmit}
                        type="submit"
                        style={{
                          margin: '1px  10px 2px',
                          cursor: 'pointer',
                        }}
                        size={20}
                      />
                    </>
                  )}
                </p>
            
            </ul>
          </div>

          <label className=" text-white" htmlFor="text ">
            <p>User Name</p>
            <input
              {...userName}
              placeholder={user.userName}
              name="userName"
              className="perfil-input"
              disabled={!editInput}
            />
          </label>
          <label className="text-white" htmlFor="text ">
            <p>Name</p>
            <input
              name="firstName"
              className="perfil-input"
              {...firstName}
              placeholder={user.firstName}
              disabled={!editInput}
            />
          </label>
          <label className="text-white" htmlFor="text ">
            <p> Apellido</p>
            <input
              name="lastName"
              className="perfil-input"
              placeholder={user.lastName}
              {...lastName}
              disabled={!editInput}
            />
          </label>
          <label className=" text-white" htmlFor="email">
            <p> E-mail</p>
            <input className="perfil-input" value={user.email} />
          </label>
          <label className=" text-white" name="text">
            <p> Genero</p>
            <input
              name="genre"
              className="perfil-input"
              placeholder={user.genre}
              {...genre}
              disabled={!editInput}
            />
          </label>
        </div>
      </div>
    </>
  );
}
