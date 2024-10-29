import { RouteObject } from "react-router";
import { createBrowserRouter, Link } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { LoginPage } from "./pages/LoginPage";
import { AccountPage } from "./pages/AccountPage";

const routers: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <h1>Home</h1>
            <Link to="/account">Account</Link>
          </>
        )
      },
      {
        path: "/account",
        element: <AccountPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
];
export const Routers = createBrowserRouter(routers);
