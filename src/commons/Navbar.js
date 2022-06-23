import '../styles/Navbar.css';

import { GoHome, GoPerson } from 'react-icons/go';
import { Usermenu } from './Usermenu';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const sidebarCollapsed = () => setSidebar(!sidebar);

  return (
    <div className="nav-style">
      <NavLink to={'/home'} className="home-icon">
       
          <GoHome size={40} />
       
      </NavLink>
      <NavLink to={'/menu'} className="home-icon">
        <div onClick={sidebarCollapsed}>
           <GoPerson size={40} />  
        </div>
      </NavLink>
      <nav className={sidebar? "nav-menu active": "nav-menu"}>
<ul className='nav-menu-item'>

{Usermenu.map((item,index)=>{
    return(
        <li key={index} className={item.cNm} onClick={sidebarCollapsed}>
            <Link to={item.path}>
               {item.title}  
            </Link>
           
        </li>
    )
})}

</ul>
      </nav>
    </div>
  );
}
export default Navbar;
