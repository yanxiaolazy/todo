// import { useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditProject from "../../EditProject";
import { actions as editProjectActions } from "../../EditProject";
import { actions as moduleItemActions } from "../../ModuleItem";
import { actions as fileModuleActions } from "../../FileModule";
import { actions as textModuleActions } from "../../TextModule";
import { viewProjectApi } from "../../utils/api";

const resolve = (fn) => {
  return response => {
    if (typeof fn !== 'function') return;
    fn(response);
  }
}

export default function ViewProject() {
  const [projectData, setProjectData] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch()
    const params = {id: match.params.projectId};
    viewProjectApi({params})()(resolve(setProjectData), () => {});
  }, []);

  useEffect(() => {
    if (projectData) {
      const parseData = JSON.parse(projectData.params.project);
      const {project, moduleItem, fileModule, textModule} = parseData;

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
      <EditProject {...{match, history}}/>
    </div>
  );
}