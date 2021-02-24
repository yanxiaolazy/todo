import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { viewProjectApi } from "../utils/api";
import { actions as editProjectActions } from "../EditProject";
import { actions as moduleItemActions } from "../ModuleItem";
import { actions as fileModuleActions } from "../FileModule";
import { actions as textModuleActions } from "../TextModule";

const resolve = (setProjectData, setLoading) => response => {
  const parseData = JSON.parse(response.params.project);

  if (parseData) {
    setProjectData(parseData);
  }
  
  setTimeout(setLoading, 500, false);
}
const reject = setLoading => () => setTimeout(setLoading, 500, false);

export default function useGetProjectData() {
  const [projectData, setProjectData] = useState(null),
        dispatch = useDispatch(),
        project = useSelector(state => state.project),
        moduleItem = useSelector(state => state.moduleItem),
        fileModule = useSelector(state => state.fileModule),
        textModule = useSelector(state =>state.textModule),
        match = useRouteMatch(),
        [loading, setLoading] = useState(true);

  useEffect(() => {
    if (match.params.projectId) {
      const params = {id: match.params.projectId};
      viewProjectApi({params})()(resolve(setProjectData, setLoading), reject(setLoading));
    }
  }, [match]);

  //从数据库获取数据用于更改状态
  useEffect(() => {
    if (projectData) {
      const {project, moduleItem, fileModule, textModule} = projectData;
      dispatch(editProjectActions.init(project));
      dispatch(moduleItemActions.init(moduleItem));
      dispatch(fileModuleActions.init(fileModule));
      dispatch(textModuleActions.init(textModule));
    }
  }, [projectData, dispatch]);

  return {loading, project, moduleItem, fileModule, textModule};
}