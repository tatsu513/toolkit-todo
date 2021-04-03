import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TaskState {
  idCount: number;
  tasks: {
    id: number;
    title: string;
    completed: boolean;
  }[];
  selectedTask: {
    id: number;
    title: string;
    completed: boolean;
  };
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 0,
  tasks: [
    {
      id: 0,
      title: "TaskA",
      completed: false,
    },
  ],
  selectedTask: {
    id: 0,
    title: "",
    completed: false,
  },
  isModalOpen: false,
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task: TaskState["selectedTask"]) =>
          task.id === state.selectedTask.id
      );
      if (index >= 0) {
        state.tasks[index].title = action.payload;
      }
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task: TaskState["selectedTask"]) =>
          task.id === action.payload
      );
      if (index >= 0) {
        state.tasks.splice(index, 1);
      }
    },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    toggleCheck: (state, action) => {
      const index = state.tasks.findIndex(
        (task: TaskState["selectedTask"]) =>
          task.id === action.payload.id
      );
      if (index >= 0) {
        state.tasks[index].completed = action.payload.completed;
      }
    },
  },
});

export const {
  createTask,
  editTask,
  deleteTask,
  handleModalOpen,
  setTask,
  toggleCheck,
} = TaskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export const selectIsModalOpen = (
  state: RootState
): TaskState["isModalOpen"] => state.task.isModalOpen;

export default TaskSlice.reducer;
