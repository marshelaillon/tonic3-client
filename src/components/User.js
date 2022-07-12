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
  const [userPhoto, setUserPhoto] = useState('');
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
 
  const handleSubmit = event => {
    //crear estado para la ruta
    dispatch(
      updateUser({
        id: user.id,
        userName: userName.value || user.userName,
        firstName: firstName.value || user.firstName,
        lastName: lastName.value || user.lastName,
        profilePicture: userPhoto || user.profilePicture,
        genre: genre.value || user.genre,
      })
    );
    handleEdit();
  };
console.log(userPhoto);
  const loadPhoto = e => {
    const reader = new FileReader();
    reader.onload = () => setUserPhoto(reader.result);
    if (e.target.files[0])  reader.readAsDataURL(e.target.files[0]);
    
  };

  return (
    <>
      <div className="container porfile">
        <div className="card mb-9 perfil-card ">
          <div className="card-header" style={{ background: 'black' }}>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="imag">
                {editInput ? (
                  <div className="input group">
                    <img src={userPhoto} className="card-img user-foto" />

                    <input
                      type="file"
                      className="custom-file-input"
                      id="file"
                      aria-describedby="inputGroupFileAddon01"
                      accept="image/png, image/jpeg"
                      onChange={loadPhoto}
                    />
                  </div>
                ) : (
                  <img
                    src={userPhoto || user.profilePicture}
                    className="card-img user-foto"
                  />
                )}
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
                    Guarda tus cambios
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
              placeholder={user.userName?.toString()}
              name="userName"
              className="perfil-input"
              disabled={!editInput}
              required
            />
          </label>
          <label className="text-white" htmlFor="text ">
            <p>Name</p>
            <input
              name="firstName"
              className="perfil-input"
              {...firstName}
              placeholder={user.firstName?.toString()}
              disabled={!editInput}
            />
          </label>
          <label className="text-white" htmlFor="text ">
            <p> Apellido</p>
            <input
              name="lastName"
              className="perfil-input"
              placeholder={user.lastName?.toString()}
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
              placeholder={user.genre?.toString()}
              {...genre}
              disabled={!editInput}
            />
          </label>
        </div>
      </div>
    </>
  );
}
