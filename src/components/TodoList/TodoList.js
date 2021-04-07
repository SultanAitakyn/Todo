import './styles.css';
import { useEffect } from 'react';
import { Typography, notification } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { useState } from 'react';
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import TasksList from "../TasksList/TasksList";
const { Title } = Typography;

const TodoList = () => {

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchData = async() => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchData();
        setTasks(tasks);
      } catch (error) {
        notifyUser();
      }
    }
    getTasks();
  }, []);

  const onFinish = async(task) => {
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (err) {
      notifyUser();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleAdd = () => {
    setIsAddFormVisible(!isAddFormVisible);
  }

  const handleDelete = async(value) => {
    try {
      await fetch(`http://localhost:5000/tasks/${value.id}`, {method: 'DELETE'});
      setTasks( (prev) => prev.filter(item => item.id !== value.id));
    } catch (error) {
      notifyUser();
    }
  }

  const handleChangeRemind = async(task) => {
    try {
      await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({...task, remind: !task.remind})
      })
      setTasks((prev) => prev.map(item => item.id === task.id ?
        {...task, remind: !task.remind} : item));
    } catch (error) {
      notifyUser();
    }
  }

  const notifyUser = () => {
    notification.error({
      message: 'Please run fake server!',
      description:
        'Run in terminal: npm run server. It will not work without server!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  return(
    <div className='todo-card'>
      <Row style={{marginBottom: '12px'}} justify='space-between'>
        <Col>
          <Title level={3}>Task Tracker</Title>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAdd} danger={isAddFormVisible}>
            {isAddFormVisible ? 'Close' : 'Add'}
          </Button>
        </Col>
      </Row>
      {isAddFormVisible &&
        <AddTaskForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
      }
      <TasksList handleDelete={handleDelete} handleChangeRemind={handleChangeRemind} tasks={tasks}/>
    </div>
  );
}

export default TodoList;