import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

const styles = {
  quill: {
    height: 250
  }
}
export default function TextModule({value, onChange}) {

  return(
    <div className='text-module animate-bottom'>
      <ReactQuill {...{value, onChange}} style={styles.quill}/>
    </div>
  );
}