import { useState, startTransition, useOptimistic, use } from "react";
import { fetchUsers } from "../shared/api";
import { createUserAction, deleteUserAction } from "../pages/users/actions";
import { User } from "../types";

const defaultUserPromise = fetchUsers();

export function useUsers(){
    const [usersPromise, setUserPromise] = useState(defaultUserPromise);
    const refetchUsers = ()=> 
        startTransition(()=>  setUserPromise(fetchUsers()));

    const [createdUsers, optimisticCreate] = useOptimistic([] as User[],
        (createdUsers, user: User)=> [...createdUsers, user]
    )

    const [deletedUsersIds, optimisticDelete] = useOptimistic([] as string[],
        (deletedUsersIds, id: string)=> deletedUsersIds.concat(id)
    )
    // keeps data before transions woks - actions keeps transitions inside 

    const useUsersList = ()=> {
        const users = use(usersPromise);

        return users
        .concat(createdUsers)
        .filter((user: { id: string; })=> !deletedUsersIds.includes(user.id))
    }
    return {
        createUserAction: createUserAction({ refetchUsers, optimisticCreate}),
        deleteUserAction: deleteUserAction({ refetchUsers, optimisticDelete}),
        useUsersList,
    } as const;
}