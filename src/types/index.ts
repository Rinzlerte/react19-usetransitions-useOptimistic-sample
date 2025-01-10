export type User = {
  id: string;
  email: string;
};

export type TaskType = {
  id: string;
  userId: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type CreateActionState = {
  error?: string;
  email: string;
  title?: string;
};

export type DeleteUserActionState = {
  error?: string;
};

export type CreateUserAction = (
  state: CreateActionState,
  formData: FormData
) => Promise<CreateActionState>;

export type DeleteUserAction = (
  state: DeleteUserActionState,
  formData: FormData
) => Promise<DeleteUserActionState>;

export type CreateTaskActionState = {
  error?: string;
  title: string;
};

export type CreateTaskAction = (
  state: CreateTaskActionState,
  formData: FormData
) => Promise<CreateTaskActionState>;

type DeleteTaskActionState = {
  error?: string;
};

export type DeleteTaskAction = (
  state: DeleteTaskActionState,
  formData: FormData
) => Promise<DeleteTaskActionState>;

export type PaginatedResponse<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  page: number;
  pages: number;
  prev: number | null;
};
