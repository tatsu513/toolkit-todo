import React from "react";
import { useForm } from "react-hook-form";
import styles from "./TaskForm.module.scss";
import { TextField } from "@material-ui/core/";
import { createTask } from "../TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { editTask, handleModalOpen, selectTask } from "../TaskSlice";
type Inputs = {
  taskTitle: string;
};

type Props = {
  edit?: boolean;
};

const TaskForm: React.FC<Props> = ({ edit }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectTask);
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle));
    reset();
  };
  const handleEdit = (data: Inputs) => {
    dispatch(editTask(data.taskTitle));
    dispatch(handleModalOpen(false));
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={
          edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)
        }
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          defaultValue={edit ? selectedTask.title : ""}
          label={edit ? "Edit Task" : "New Task"}
          variant="outlined"
          inputRef={register}
          name="taskTitle"
          className={styles.text_field}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button
              type="button"
              onClick={() => dispatch(handleModalOpen(false))}
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
