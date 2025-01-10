import { User, TaskType, PaginatedResponse } from '../types/index';

export async function fetchUsers() {
    return fetch("http://localhost:3001/users").then(
      (res) => res.json() as Promise<User[]>
    );
  }
  
  export function createUser(user: User) {
    return fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  }
  
  export function deleteUser(id: string) {
    return fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }
  
  export function fetchTasks({
    page = 1,
    per_page = 10,
    sort = { createdAt: "asc" },
    filters,
  }: {
    page?: number;
    per_page?: number;
    filters?: {
      userId?: string;
      title?: string;
    };
    sort?: {
      createdAt: "asc" | "desc";
    };
  }) {
    return fetch(
      `http://localhost:3001/tasks?_page=${page}&_per_page=${per_page}&_sort=${
        sort.createdAt === "asc" ? "createdAt" : "-createdAt"
      }&userId=${filters?.userId}&title=${filters?.title}`
    )
      .then((res) => res.json() as Promise<PaginatedResponse<TaskType>>)
      .then((r) => ({ ...r, page }));
  }
  
  export function createTask(task: Omit<TaskType, "id" | "createdAt">) {
    return fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());
  }
  
  export function updateTask(id: string, task: Partial<TaskType>) {
    return fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());
  }
  
  export function deleteTask(id: string) {
    return fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }