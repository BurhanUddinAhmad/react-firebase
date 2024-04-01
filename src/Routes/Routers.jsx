import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Orders from "../Pages/Orders";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "../Pages/Profile";

export const routers = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage/>,
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/profile',
                element: <PrivateRoutes> <Profile/> </PrivateRoutes>
            },
            {
                path: '/orders',
                element: <PrivateRoutes> <Orders/> </PrivateRoutes>
            }
        ]
    }
]);