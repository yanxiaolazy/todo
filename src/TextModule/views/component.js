import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

const styles = {
  quill: {
    height: 250
  }
}
export default function TextModule({value, username, lastTime, onChange, onDelete}) {
  const [isPass, setIsPass] = useState(true);
  const [isPending, setIsPending] = useState(true);
  return(
    <div className='text-module animate-bottom'>
      <div className='delete-container' onClick={onDelete}><span>删除</span></div>
      <ReactQuill {...{value, onChange}} style={styles.quill}/>
      {lastTime && <div className='upload-info text-module-info'>
        <span className='uploader'>编辑者：{username}</span>
        <span className='upload-time'>最后一次更改时间：{`${new Date(lastTime).toLocaleDateString()}/${new Date(lastTime).toLocaleTimeString()}`}</span>
        <span className={`approval-status approval-status-${isPending ? 'pending' :  isPass ? 'pass' : 'not-pass'}`}>{isPending ? '待审核' : isPass ? '已通过': '未通过'}</span>
      </div>}
    </div>
  );
}