import { Outlet, Route, Routes } from "react-router-dom";
import { UserForm } from "../users/user-form/UserForm";
import { User } from "../users/user/User";
import { UsersList } from "../users/users-list/UsersList";

export function Main() {
    return (
        <div className="main-content">
            <Outlet />
        </div>
    )
}