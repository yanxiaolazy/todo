import { useState } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './style.css';

const styles = {
  quill: {
    height: 250
  }
}
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default function TextModule({
  value, 
  username, 
  lastTime, 
  todoStatus,
  onChange, 
  onDelete
}) {
  const [quillValue, setQuillValue] = useState(value)

  function handleChange(text) {
    setQuillValue(text);
    onChange(text)
  }

  return(
    <div className='text-module animate-bottom'>
      <div className='delete-container' onClick={onDelete}><span>删除</span></div>
      <ReactQuill onChange={handleChange} value={quillValue} style={styles.quill} {...{modules, formats}}/>
      {lastTime && <div className='upload-info text-module-info'>
        <span className='uploader'>编辑者：{username}</span>
        <span className='upload-time'>最后一次更改时间：{`${new Date(lastTime).toLocaleDateString()}/${new Date(lastTime).toLocaleTimeString()}`}</span>
        <span className={`approval-status approval-status-${todoStatus === 'pending' ? 'pending' :  todoStatus === '已通过' ? 'pass' : 'not-pass'}`}>{todoStatus === 'pending' ? '待审核' : todoStatus === '已通过' ? '已通过': '未通过'}</span>
      </div>}
    </div>
  );
}

