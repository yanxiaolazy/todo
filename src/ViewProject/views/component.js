// import { useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditProject from "../../EditProject";
import { actions as editProjectActions } from "../../EditProject";
import { actions as moduleItemActions } from "../../ModuleItem";
import { actions as fileModuleActions } from "../../FileModule";
import { actions as textModuleActions } from "../../TextModule";
import { viewProjectApi } from "../../utils/api";

const resolve = (fn) => {
  return response => {
    console.log(response);
    if (typeof fn !== 'function') return;
    fn(response);
  }
}

export default function ViewProject() {
  const [projectData, setProjectData] = useState(null);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch()
    const params = {id: match.params.projectId};
    console.log(params)
    viewProjectApi({params})()(resolve(setProjectData), () => {});
  }, []);

  useEffect(() => {
    if (projectData) {
      const parseData = JSON.parse(projectData.params.project);
      console.log(parseData)
      const {project, moduleItem, fileModule, textModule} = parseData;
      console.log(project);
      dispatch(editProjectActions.init(project));
      dispatch(moduleItemActions.init(moduleItem));
      dispatch(fileModuleActions.init(fileModule));
      dispatch(textModuleActions.init(textModule));
    }
  }, [projectData]);

  if (!projectData) {
    return(<div></div>);
  }

  return(
    <div>
      <EditProject />
    </div>
  );
}