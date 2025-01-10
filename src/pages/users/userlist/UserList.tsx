import { DeleteUserAction, User } from "../../../types";
import { UserCard } from "../card/Card";

export function UsersList({
    deleteUserAction,
    useUsersList
  } : {
    useUsersList: ()=> User[]
    deleteUserAction: DeleteUserAction
  }) {
    const users = useUsersList();
    return (
      <div className="flex flex-col">
        {users.map((user: User) => {
          return (
            <UserCard 
              key={user.id} 
              user={user} 
              deleteUserAction={deleteUserAction}
             />
          );
        })}
      </div>
    );
  }