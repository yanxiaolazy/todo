import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, DatePicker, Form, Input, notification } from "antd";
import moment from "moment";
import { newProjectApi } from "../../utils/api";
import ContainerLayer from "../../components/ContainerLayer";
import './style.css';

const prefix = 'create-project';
const FormItem = Form.Item;

const resolveCreateProject = (history, setSpinning) => response => {
  setTimeout(setSpinning, 500, false);
  history.push('/view');
}
const rejectCreateProject = setSpinning => () => setTimeout(setSpinning, 500, false);

export default function CreateProject() {
  const [spinning, setSpinning] = useState(false),
        history = useHistory()

  function onPublish(values) {
    const {projectTitle, endTime} = values;

    if (!projectTitle) {
      notification.warn({message: '', description: '项目标题是必须的', placement: 'topLeft'});
      return;
    }
    if (!endTime) {
      notification.warn({message: '', description: '请设置一个结束时间', placement: 'topLeft'});
      return;
    }

    setSpinning(true);

    const [start, end] = endTime.map(time => {
      const localDate = new Date(time._d).toLocaleDateString();
      return new Date(localDate).getTime();
    });

    newProjectApi()({data: {projectTitle, endTime: {start, end}}})(resolveCreateProject(history, setSpinning), rejectCreateProject(setSpinning))
  }

  return(
    <ContainerLayer
      title='Create Project'
      className={`${prefix}`}
      h1Content='Create'
      {...{spinning}}
    >
      <Form 
        className={`${prefix}-form animate-bottom`} 
        onFinish={onPublish}
      >
        <FormItem
          name='projectTitle'
        >
          <Input type='text' placeholder='添加项目标题'/>
        </FormItem>
        <FormItem
          name='endTime'
        >
          <DatePicker.RangePicker 
            format='YYYY-MM-DD'
            placeholder={['开始时间', '结束时间']}
            disabledDate={current => current < moment(new Date().toLocaleDateString())}
            ranges={{
              Today: [moment(), moment()],
              Day: [moment(), moment().add(1, 'day')],
              Week: [moment(), moment().add(1, 'week')],
              TwoWeeks: [moment(), moment().add(2, "weeks")],
              Month: [moment(), moment().add(1, 'month')]
            }}
          />
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit'>Publish</Button>
        </FormItem>
      </Form>
    </ContainerLayer>
  );
}