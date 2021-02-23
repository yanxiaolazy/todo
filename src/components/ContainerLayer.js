import { Skeleton, Spin, Empty } from "antd";
import Helmet from "react-helmet";

export default function ContainerLayer({
  title,
  className,
  h1ClassName,
  h1Content,
  spinning,
  isEmpty,
  loading,
  children
}) {
  
  return(
    <div {...{className}}>
      <Helmet>
        <title>{title} -- ToDo</title>
      </Helmet>
      <h1 className={h1ClassName}>{h1Content}</h1>
      {
        loading ? <Skeleton loading round active paragraph={{rows: 6}}/> :
        isEmpty ? <Empty /> :
        <Spin {...{spinning}}>
          {children}
        </Spin>
      }
    </div>
  );
}

ContainerLayer.defaultProps = {
  title: 'ToDo',
  className: '',
  h1ClassName: 'todo-title',
  h1Content: 'ToDo',
  spinning: false,
  isEmpty: false,
  loading: false
}