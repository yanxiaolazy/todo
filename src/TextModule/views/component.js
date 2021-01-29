import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

const styles = {
  quill: {
    height: 250
  }
}
export default function TextModule({
  value, 
  username, 
  lastTime, 
  todoStatus,
  onChange, 
  onDelete
}) {

  return(
    <div className='text-module animate-bottom'>
      <div className='delete-container' onClick={onDelete}><span>删除</span></div>
      <ReactQuill {...{value, onChange}} style={styles.quill}/>
      {lastTime && <div className='upload-info text-module-info'>
        <span className='uploader'>编辑者：{username}</span>
        <span className='upload-time'>最后一次更改时间：{`${new Date(lastTime).toLocaleDateString()}/${new Date(lastTime).toLocaleTimeString()}`}</span>
        <span className={`approval-status approval-status-${todoStatus === 'pending' ? 'pending' :  todoStatus === '已通过' ? 'pass' : 'not-pass'}`}>{todoStatus === 'pending' ? '待审核' : todoStatus === '已通过' ? '已通过': '未通过'}</span>
      </div>}
    </div>
  );
}