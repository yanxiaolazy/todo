import { Link } from "react-router-dom";
import './style.css';

export default function SideBar() {

  return(
    <div className='sidebar'>
      <Link to='/'><div>home</div></Link>
      <Link to='/new'><div>add</div></Link>
      <Link to='/view'><div>view</div></Link>
      <Link to='/approval'><div>approval</div></Link>
      <Link to='/user'><div>user</div></Link>
      <Link to='/setting'><div>setting</div></Link>
    </div>
  );
}