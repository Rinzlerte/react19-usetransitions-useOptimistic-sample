import { Link } from "react-router";
import { DeleteUserAction, User } from "../../../types";
import { useActionState } from "react";

export function UserCard({
    user,
    deleteUserAction
  } : {
    user: User;
    deleteUserAction: DeleteUserAction; 
  }) {
    const [state, handleDelete,
      // isPending
      // its no need when optimistic is used
      ] = useActionState( deleteUserAction, {});
    return (
      <div className="border py-2 px-3 m-2 flex gap-2 shadow-sm items-center justify-between">
        {user.email}
        <form action={handleDelete}>
          <input type="hidden" name="id" value={user.id}/>
          <Link
            to={`/${user.id}/tasks`}
          >
            <button
            type="button"
            className="bg-black text-white font-semibold py-2 px-4 mr-2 disabled:bg-gray-400"
          >
            tasks
          </button>
          </Link>
          <button
            // disabled={isPending}
            // no need when optimistic is used
            type="submit"
            className="bg-red-500 text-white font-semibold py-2 px-4 disabled:bg-slate-700"
          >
            del
            {state.error && (
              <span className="p-2 text-red-600">{state.error}</span>
            )}
          </button>
        </form>
      </div>
    );
  }