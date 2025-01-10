import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useUsers } from "../../hooks/use-users";
import { UserForm } from "./form/Form";
import { UsersList } from "./userlist/UserList";

export function UsersPage() {
  const { useUsersList, createUserAction, deleteUserAction } = useUsers();
  return (
    <main className="container mx-auto p-4 py-10">
      <h1 className="text-3xl font-medium mb-2 px-2">Users Page</h1>
      <section>
        <UserForm createUserAction={createUserAction} />
        <ErrorBoundary
          fallbackRender={(e) => (
            <div className="text-slate-700">
              Something went wrong:{JSON.stringify(e)}{" "}
            </div>
          )}
        >
          <Suspense fallback={<div className="p-2">Loading...</div>}>
            <UsersList
              useUsersList={useUsersList}
              deleteUserAction={deleteUserAction}
            />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  );
}