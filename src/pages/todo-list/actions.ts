import { createTask, deleteTask } from "../../shared/api";
import { TaskType, CreateTaskAction , DeleteTaskAction} from "../../types";

export function createTaskAction({
  refetchTasks,
  userId,
}: {
  userId: string;
  refetchTasks: () => void;
}): CreateTaskAction {
  return async (_, formData) => {
    const title = formData.get("title") as string;

    try {
      const task: TaskType = {
        createdAt: Date.now(),
        done: false,
        userId,
        title,
        id: crypto.randomUUID(),
      };
      await createTask(task);

      refetchTasks();

      return {
        title: "",
      };
    } catch {
      return {
        title,
        error: "Error while creating task",
      };
    }
  };
}

export function deleteTaskAction({
  refetchTasks,
}: {
  refetchTasks: () => void;
}): DeleteTaskAction {
  return async (_, formData) => {
    const id = formData.get("id") as string;
    try {
      await deleteTask(id);
      refetchTasks();
      return {};
    } catch (e) {
      console.log(e);
      return {
        error: "Error while deleting task",
      };
    }
  };
}