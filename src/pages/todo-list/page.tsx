import { Suspense, use, useMemo, useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PaginatedResponse } from "../../types";
import { useParams } from "react-router";
import { useTasks } from "../../hooks/useTasks";
import { useSort } from "../../hooks/useSort";
import { useSearch } from "../../hooks/useSearch";
import { TasksList } from "./tasklist/TaskList";
import { CreateTaskForm } from "./taskform/TaskForm";

export function TodoListPage() {
  const { userId = "" } = useParams();

  const {
    paginatedTasksPromise,
    refetchTasks,
    defaultCreatedAtSort,
    defaultSearch,
  } = useTasks({
    userId,
  });

  const { search, handleChangeSearch } = useSearch(defaultSearch, (title) =>
    refetchTasks({ title })
  );

  const { sort, handleChangeSort } = useSort(defaultCreatedAtSort, (sort) =>
    refetchTasks({ createdAtSortNew: sort as "asc" | "desc" })
  );

  const onPageChange = async (newPage: number) => {
    refetchTasks({ page: newPage });
  };

  const tasksPromise = useMemo(
    () => paginatedTasksPromise.then((r) => r.data),
    [paginatedTasksPromise]
  );

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline">Tasks</h1>
      <CreateTaskForm refetchTasks={() => refetchTasks({})} userId={userId} />
      <div className="flex gap-2 px-2">
        <input
          placeholder="Search"
          type="text"
          className="border p-2 rounded"
          value={search}
          onChange={handleChangeSearch}
        />
        <select
          className="border p-2 rounded"
          value={sort}
          onChange={handleChangeSort}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <ErrorBoundary
        fallbackRender={(e) => (
          <div className="text-red-500">
            Something went wrong:{JSON.stringify(e)}{" "}
          </div>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <TasksList
            tasksPromise={tasksPromise}
            refetchTasks={() => refetchTasks({})}
          />
          <Pagination
            tasksPaginated={paginatedTasksPromise}
            onPageChange={onPageChange}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

function Pagination<T>({
  tasksPaginated,
  onPageChange,
}: {
  tasksPaginated: Promise<PaginatedResponse<T>>;
  onPageChange?: (page: number) => void;
}) {
  const [isLoading, startTransition] = useTransition();
  const { last, page, first, next, prev, pages } = use(tasksPaginated);

  const handlePageChange = (page: number) => () => {
    console.log(page);
    startTransition(() => onPageChange?.(page));
  };
  return (
    <nav
      className={`${
        isLoading ? "opacity-50" : ""
      } flex items-center justify-between`}
    >
      <div className="grid grid-cols-4 gap-2">
        <button
          disabled={isLoading}
          onClick={handlePageChange(first)}
          className="px-3 py-2 rounded-l"
        >
          First ({first})
        </button>
        {prev && (
          <button
            disabled={isLoading}
            onClick={handlePageChange(prev)}
            className="px-3 py-2"
          >
            Prev ({prev})
          </button>
        )}
        {next && (
          <button
            disabled={isLoading}
            onClick={handlePageChange(next)}
            className="px-3 py-2"
          >
            Next ({next})
          </button>
        )}
        <button
          disabled={isLoading}
          onClick={handlePageChange(last)}
          className="px-3 py-2 rounded-r"
        >
          Last ({last})
        </button>
      </div>
      <span className="text-sm">
        Page {page} of {pages}
      </span>
    </nav>
  );
}