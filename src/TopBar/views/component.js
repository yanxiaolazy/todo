import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import './style.css';

const styles = {
  icon: {
    position: 'absolute',
    color: '#636e72',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '50%',
    fontSize: 20
  }
}

export default function TopBar({onLogout}) {
  const [openPannel, setOpenPannel] = useState(false);

  function onClick() {
    setOpenPannel(prev => !prev);
  }
  return(
    <div className='topbar'>
      <div className='logo'><img  alt='' width='45' src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3100819712,3434737581&fm=26&gp=0.jpg'/></div>
      <div className='user-container'>
        <div className='user'  {...{onClick}}>
          <UserOutlined className='icon' style={styles.icon}/>
        </div>
        <div key='pannel' className='pannel' style={{display: openPannel ? 'block' : 'none'}}>
          <div className='logout-btn' onClick={onLogout}>logout</div>
        </div>        
      </div>
    </div>
  );
}