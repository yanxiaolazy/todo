import { Button, DatePicker, Form, Input, notification, Spin } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Helmet from "../../components/Helmet";
import { newProjectApi } from "../../utils/api";
import './style.css';

const prefix = 'create-project';
const FormItem = Form.Item;

const resolveCreateProject = (history, setSpinning) => response => {
  setTimeout(setSpinning, 500, false);
  history.push('/view');
}
const rejectCreateProject = setSpinning => () => setSpinning(false);

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
    <div className={`${prefix}`}>
      <Helmet title='Create Project'/>
      <h1 className='todo-title'>Create A New Project</h1>
      <Spin {...{spinning}}>
        <Form 
          className={`${prefix}-form`} 
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
      </Spin>
    </div>
  );
}