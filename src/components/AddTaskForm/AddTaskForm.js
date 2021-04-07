import {Button, Checkbox, DatePicker, Divider, Form, Input, Row} from "antd";

const AddTaskFrom = ({onFinish, onFinishFailed}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Row style={{marginBottom: '12px'}}>
      <Form form={form} layout="horizontal" onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{remind: false}}>
        <Form.Item label='Task' name='task'
                   rules={[{required: true, message: 'Please input task!'}]}>
          <Input placeholder="Add Task"/>
        </Form.Item>
        <Form.Item label='Day & Time' name='date'>
          <DatePicker placeholder="Select date"/>
        </Form.Item>
        <Form.Item label='Set Reminder' name="remind" valuePropName="checked">
          <Checkbox/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width: '100%'}} ghost>
            Submit
          </Button>
        </Form.Item>
        <Divider/>
      </Form>
    </Row>
  )
}

export default AddTaskFrom;