import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import styles from "./TaskItem.module.scss";
import TaskForm from "../taskForm/TaskForm";
import {
  deleteTask,
  handleModalOpen,
  selectIsModalOpen,
  setTask,
  toggleCheck,
} from "../TaskSlice";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  task: { id: number; title: string; completed: boolean };
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleOpen = () => {
    dispatch(setTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

  const handleCheck = () => {
    const sendData = {
      id: task.id,
      completed: !task.completed,
    };
    dispatch(toggleCheck(sendData));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={handleCheck}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button
          onClick={handleDelete}
          className={styles.delete_button}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        className={styles.modal}
      >
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
