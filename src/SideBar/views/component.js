import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAdmin } from "../../utils/parse";
import './style.css';

const prefix = 'sidebar'
export default function SideBar() {
  const [isAdmin] = useState(() => getAdmin()),
        location = useLocation()

  const {pathname} = location;

  return(
    <div className={`${prefix}`}>
      <Link 
        to='/' 
        className={`${prefix}-link${pathname === '/' ? '-checked' : ''}`}
      >
        <div>home</div>
      </Link>
      <Link 
        to='/new'
        className={`${prefix}-link${pathname === '/new' ? '-checked' : ''}`}
      >
        <div>add</div>
      </Link>
      <Link 
        to='/view'
        className={`${prefix}-link${pathname === '/view' ? '-checked' : ''}`}
      >
        <div>view</div>
      </Link>
      {/* <Link to='/approval'><div>approval</div></Link> */}
      {isAdmin && <>
        <Link 
          to='/user'
          className={`${prefix}-link${pathname === '/user' ? '-checked' : ''}`}
        >
          <div>user</div>
        </Link>
      </>}
      <Link 
        to='/setting'
        className={`${prefix}-link${pathname === '/setting' ? '-checked' : ''}`}
      >
        <div>setting</div>
      </Link>
    </div>
  );
}