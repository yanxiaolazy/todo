import { Empty, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewProjectApi } from "../../utils/api";

const styles = {
  empty: {
    padding: '50px 0'
  }
}

function getAllProjectTitle(fn) {
  if (typeof fn !== 'function') {
    message.error('');
    return;
  }
  const resolve = response => fn(response);
  const reject = error => console.log(error);

  viewProjectApi()()(resolve, reject);
}

export default function ProjectsScanning() {
  const [projects, setProjects] = useState(null);
  const [titles, setTitles] = useState(null);

  useEffect(() => {
    getAllProjectTitle(setProjects);
  }, []);

  useEffect(() => {
    if (projects) {
      console.log(projects);
      const {params} = projects;

      if (!params.titles) return;
      
      setTitles(params.titles);
    }
  });

  if (!titles) {
    return(<div style={styles.empty}><Empty /></div>);
  }
  
  const views = titles.map(title => {
    return(
      <li key={title.id} className='view-projects-item'>
        <span><Link to={`/view/${title.id}`}>{title.projectTitle}</Link></span>
        <span>{title.createTime}</span>
        <span>{title.updateTime}</span>
        <span>{title.status}</span>
      </li>
    );
  });

  return(
    <div className='view-projects'>
      <ul>
        {views}
      </ul>
    </div>
  );
}