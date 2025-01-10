import { Suspense, useState, use, useTransition } from "react";
import { User } from "../../../types/index";
import { createUser, deleteUser, fetchUsers } from "../../../shared/api";
import { ErrorBoundary } from "react-error-boundary";

const defaultUsersPromise = fetchUsers();

export function UsersPage() {
    const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
    const refetchUsers = ()=> {
        setUsersPromise(fetchUsers())
    }
  return (
    <main className="container mx-auto p-4 py-10">
        <h1 className="text-3xl font-medium mb-2">Users</h1>
        <section>
        <UserForm refetchUsers={refetchUsers}/>
        <ErrorBoundary fallbackRender={
            (e)=><div className="text-slate-700">Something went wrong {JSON.stringify(e)}</div>
        }>
        <Suspense fallback={<div>Loading...</div>}>
            <UsersList usersPromise={usersPromise} refetchUsers={refetchUsers} />
        </Suspense>
        </ErrorBoundary>
      
        </section>
    </main>
  );
}

export function UsersList({ usersPromise,
    refetchUsers
 }: { usersPromise: Promise<User[]> ,
    refetchUsers: ()=> void
  }) {

    const users = use(usersPromise);
    // directly in render perform userspromise in users list

    return (
        <div className="flex flex-col">
        {users.map((user: User ) => {
            return <UserCard key={user.id} 
            user={user} 
            refetchUsers={refetchUsers}
            />;
        })}
        </div>
    );
}

export function UserCard({ user, refetchUsers }: { user: User , refetchUsers: ()=> void}) {

    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            await deleteUser(user.id);
            startTransition(() => {
                refetchUsers()
            });
        });
    };

  return (
    <div className="border py-2 px-3 m-2 flex gap-2 bg-slate-200 items-center justify-between">
      {user.email}
      <button
        onClick={() => handleDelete()}
        disabled={isPending}
        className="bg-red-500 text-white font-semibold py-2  px-4 disabled:bg-slate-700"
      >
        DEL
      </button>
    </div>
  );
}

export function UserForm({refetchUsers}: {refetchUsers: ()=> void}){
    const [email, setEmail] = useState<string>("");
    // add form status manipulations and features
    const [isPending, startTransition] = useTransition();
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            await createUser({
                email,
                id: crypto.randomUUID(),
            });
            startTransition(() => {
                refetchUsers()
                setEmail('');
            });
        });
    };
    
    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            className="border p-2"
            value={email}
            disabled={isPending}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-green-500 text-white font-bold p-2 disabled:bg-zinc-500"
          >
            ADD
          </button>
        </form> 
    )
}