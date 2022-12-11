import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/LogIn/Login";
import Main from "../pages/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
        ]
    }

])