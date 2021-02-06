import {Helmet} from "react-helmet";

export default function HelmetComponent({
  title
}) {
  return(
    <Helmet>
      <title>{title} -- ToDo</title>
    </Helmet>
  );
}

HelmetComponent.defaultProps = {
  title: 'todo'
}
