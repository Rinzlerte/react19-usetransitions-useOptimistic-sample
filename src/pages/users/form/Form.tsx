import { useActionState, useOptimistic, useRef } from "react";
import { CreateUserAction } from "../../../types";


  export function UserForm({
    createUserAction,
  }: {
    createUserAction: CreateUserAction;
  }) {
    const [state, dispatch] = useActionState(createUserAction, {
      email: "",
    });
      // isPending
      // no need when optimistic is used
    const [optimisticState, setOptimisticState] = useOptimistic(state);
    const form = useRef<HTMLFormElement>(null);
    return (
      <form
        className="flex gap-2 p-2"
        ref={form}
        action={(formData: FormData) => {
          setOptimisticState({ email: "" });
          dispatch(formData);
          form.current?.reset();
        }}
      >
        <input
          name="email"
          type="email"
          className="border p-2 rounded"
          defaultValue={optimisticState.email}
            // disabled={isPending}
          // no need when optimistic is used
        />
        <button
         // disabled={isPending}
          // no need when optimistic is used
          className="bg-green-500 text-white font-bold py-2 px-4 disabled:bg-zinc-500"
        >
          Add
        </button>
        {optimisticState.error && (
          <div className="text-red-500">{optimisticState.error}</div>
        )}
      </form>
    );
  }