import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContainerLayer from "../../components/ContainerLayer";
import { viewProjectApi } from "../../utils/api";
import "./style.css";

const resolveProjectSummary = (setProjects, setLoading) => response => {
  if (response) {
    setProjects(response.params);
  }
  setTimeout(setLoading, 500, false);
};
const rejectProjectSummary = setLoading => () => setTimeout(setLoading, 500, false);

const prefix = 'project-summary';

export default function ProjectSummary() {
  const [projects, setProjects] = useState(null),
        [titles, setTitles] = useState(null),
        [loading, setLoading] = useState(true),
        [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    viewProjectApi()()(resolveProjectSummary(setProjects, setLoading), rejectProjectSummary(setLoading));
  }, []);

  useEffect(() => {
    if (projects) {
      const {titles} = projects;
      
      setTitles(titles);
    }
  }, [projects]);

  useEffect(() => {
    if (titles?.length > 0) {
      setIsEmpty(false);
    }
  }, [titles]);
  
  const views = titles?.map(title => {
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
    <ContainerLayer
      title='Project'
      className={prefix}
      h1Content='Project'
      {...{loading, isEmpty}}
    >
      <div className='animate-bottom'>
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
    </ContainerLayer>
  );
}