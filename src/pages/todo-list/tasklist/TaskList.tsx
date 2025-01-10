import { TaskType } from "../../../types";
import { TaskCard } from "../taskcard/TaskCard";
import { use } from 'react'

export function TasksList({
  tasksPromise,
  refetchTasks,
}: {
  tasksPromise: Promise<TaskType[]>;
  refetchTasks: () => void;
}) {
  const tasks = use(tasksPromise);
  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} refetchTasks={refetchTasks} />
      ))}
    </div>
  );
}