import { Routes, Route } from "react-router";
import { UsersPage } from "../pages/users";
import { TodoListPage } from "../pages/todo-list";
import { UsersProvider } from "../entities/user";
import NavBar from "../components/shared/NavBar";

export function App() {
  return (
    <UsersProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/:userId/tasks" element={<TodoListPage />} />
      </Routes>
    </UsersProvider>
   
  )
}