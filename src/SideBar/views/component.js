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
      <Link to='/' className={`${prefix}-link${/^\/$/.test(pathname) ? '-checked' : ''}`}><div>home</div></Link>
      {isAdmin && <Link to='/new' className={`${prefix}-link${/^\/new/.test(pathname) ? '-checked' : ''}`}><div>add</div></Link>}
      <Link to='/view' className={`${prefix}-link${/^\/view/.test(pathname) ? '-checked' : ''}`}><div>view</div></Link>
      {isAdmin && <>
        <Link to='/media' className={`${prefix}-link${/^\/media/.test(pathname) ? '-checked': ''}`}><div>media</div></Link>
        <Link to='/user' className={`${prefix}-link${/^\/user/.test(pathname) ? '-checked' : ''}`}><div>user</div></Link>
      </>}
      <Link to='/setting' className={`${prefix}-link${/^\/setting/.test(pathname) ? '-checked' : ''}`}><div>setting</div></Link>
    </div>
  );
}

