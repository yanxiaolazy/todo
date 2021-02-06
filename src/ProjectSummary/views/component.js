import { Empty, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";
import { viewProjectApi } from "../../utils/api";
import "./style.css";

const styles = {
  empty: {
    padding: '50px 0'
  }
}

const resolveProjectSummary = (setProjects, setLoading) => response => {
  setProjects(response);
  setLoading(false);
};
const rejectProjectSummary = setLoading => () => setLoading(false);

const prefix = 'project-summary';

export default function ProjectSummary() {
  const [projects, setProjects] = useState(null),
        [titles, setTitles] = useState(null),
        [loading, setLoading] = useState(true);

  useEffect(() => {
    viewProjectApi()()(resolveProjectSummary(setProjects, setLoading), rejectProjectSummary(setLoading));
  }, []);

  useEffect(() => {
    if (projects) {
      const {params} = projects;

      if (!params.titles) return;
      
      setTitles(params.titles);
    }
  }, [projects]);

  if (loading) {
    return(<Skeleton className={`${prefix}`} active loading round paragraph={{rows: 6}}/>);
  }

  if (!titles) {
    return(<div style={styles.empty}><Empty /></div>);
  }
  
  const views = titles.map(title => {
    const createTime = `${new Date(title.createTime).toLocaleDateString()}/${new Date(title.createTime).toLocaleTimeString()}`,
          updateTime = `${new Date(title.updateTime).toLocaleDateString()}/${new Date(title.updateTime).toLocaleTimeString()}`,
          {start, end} = JSON.parse(title.timeRange),
          startTime = `${new Date(start).toLocaleDateString()}`,
          endTime = `${new Date(end).toLocaleDateString()}`

    return(
      <li key={title.id} className={`${prefix}-item`}>
        <span title={title.projectTitle}><Link to={`/view/${title.id}`}>{title.projectTitle}</Link></span>
        <span>{createTime}</span>
        <span>{updateTime}</span>
        <span>{startTime}</span>
        <span>{endTime}</span>
        <span>{title.status}</span>
      </li>
    );
  });

  return(
    <div className={`${prefix} animate-bottom`}>
      <Helmet title='Project' />
      <h1 className='todo-title'>Project</h1>
      <ul className={`${prefix}-titles`}>
        <li>Project</li>
        <li>Publish Time</li>
        <li>Update Time</li>
        <li>Start Time</li>
        <li>End Time</li>
        <li>Progress</li>
      </ul>
      <ul className={`${prefix}-items`}>
        {views}
      </ul>
    </div>
  );
}