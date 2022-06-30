import { useSelector } from 'react-redux';
import '../styles/user.css';
function User() {
  const user = useSelector(state => state.user);
  return (
    <>
    {user.isAdmi?    <h1>{user.firstName}</h1>:
    <div className="conatiner">
        <div className="row">
          <div className="perfil col-12 my-3 pt-3 shadow">
            <img
              src={user.profilePicture}
              className="float-left rounder-circle mr-2 user-foto"
            ></img>
            <h1>{user.firstName}</h1>
            <h3>{user.email} </h3>
            <p/>
            
          </div>
        </div>
      </div>
    }
      
    </>
  );
}
export default User;
