import { useDispatch, useSelector } from 'react-redux';
import '../styles/user.css';
import { PleaseRegister } from '../utils/sweetAlerts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillGearFill, BsCheckCircleFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useInput } from '../hooks/useInput';
import { updateUser } from '../state/user/user';
import { useTranslation } from 'react-i18next';
import { BASE_URL, IMG_URL } from '../utils/config';

export default function User() {
  const myform = document.querySelector('#update');
  const [image, setImage] = useState('');
  const [readImage, setReadImage] = useState('');
  console.log(image);
  const { t } = useTranslation();
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
    event.preventDefault();
    console.log('image', image);
    const form = new FormData(myform);
    // form.append('id', user.id);
    // form.append('userName', userName.value || user.userName);
    // form.append('firstName', firstName.value || user.firstName);
    // form.append('lastName', lastName.value || user.lastName);
    // form.append('image', image || user.profilePicture);
    // form.append('genre', genre.value || user.genre);
    console.log(form);
    //crear estado para la ruta
    dispatch(
      updateUser({
        id: user.id,
        userName: userName.value || user.userName,
        firstName: firstName.value || user.firstName,
        lastName: lastName.value || user.lastName,
        image: image || user.profilePicture,
        genre: genre.value || user.genre,
      })
    );

    handleEdit();
  };

  const loadPhoto = e => {
    console.log('E.TARGET.VALUE', e.target.value);
    console.log('E.TARGET.FILES', e.target.files);
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setReadImage(reader.result);
  };

  return (
    <>
      <div className="container porfile">
        <div className="card mb-9 perfil-card ">
          <form method="post" encType="multipart/form-data" id="update" style={{margin: "auto 15px"}}>
            <div className="card-header" style={{ background: 'black' }}>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="imag">
                  {editInput ? (
                    <div className="input group">
                      <img
                        src={readImage ? readImage : user.profilePicture}
                        className="card-img user-foto"
                      />

                      <input
                        name="image"
                        type="file"
                        className="custom-file-input"
                        id="file"
                        aria-describedby="inputGroupFileAddon01"
                        /* accept="image/png, image/jpeg" */
                        onChange={e => {
                          loadPhoto(e);
                          setImage(e.target.files[0]);
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={user?.profilePicture}
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
                      {t('edit_profile')}
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
                      {t('save_changes')}
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
              <p style={{fontSize:"70%", marginRight:"10px"}}>{t('username')}</p>
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
              <p  style={{fontSize:"70%", marginRight:"10px"}}>{t('name')}</p>
              <input
                name="firstName"
                className="perfil-input"
                {...firstName}
                placeholder={user.firstName?.toString()}
                disabled={!editInput}
              />
            </label>
            <label className="text-white" htmlFor="text ">
              <p  style={{fontSize:"70%", marginRight:"10px"}}>{t('last_name')}</p>
              <input
                name="lastName"
                className="perfil-input"
                placeholder={user.lastName?.toString()}
                {...lastName}
                disabled={!editInput}
              />
            </label>
            <label className=" text-white" htmlFor="email">
              <p  style={{fontSize:"70%", marginRight:"10px"}}>{t('email')}</p>
              <input className="perfil-input" value={user.email} />
            </label>
            <label className=" text-white" name="text">
              <p  style={{fontSize:"70%", marginRight:"10px"}}>{t('genre')}</p>
              <input
                name="genre"
                className="perfil-input"
                placeholder={user.genre?.toString()}
                {...genre}
                disabled={!editInput}
              />
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
