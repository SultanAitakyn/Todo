import {Avatar, List} from "antd";
import {NotificationOutlined, NotificationTwoTone,
  DeleteOutlined} from "@ant-design/icons";
import moment from "moment";
import './styles.css';

const TasksList = ({handleDelete, handleChangeRemind, tasks}) => {

  return(
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={item => (
        <List.Item onDoubleClick={() => handleChangeRemind(item)}
                   className={`task ${item.remind && 'active'}`}
                   actions={[<DeleteOutlined style={{color: '#e5353e'}} onClick={() => handleDelete(item)}/>]}>
          <List.Item.Meta
            avatar={item.remind ? <Avatar><NotificationTwoTone /></Avatar>
              : <Avatar><NotificationOutlined /></Avatar>}
            title={item.task}
            description={item.date && moment(item.date).format('LL')}
          />
        </List.Item>
      )}
    />
  );
}

export default TasksList;