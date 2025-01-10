import { use } from "react";
import { useUsersGlobal } from "../../../entities/user";

export function UserPreview({ userId }: { userId: string }) {
    const { usersPromise } = useUsersGlobal();
    const users = use(usersPromise);
    const user = users.find((u) => u.id === userId);
    return (
        <div>
            {
                user && <span>
                        {user?.email}
                </span> 
            }
        </div>
    )
}