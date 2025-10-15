import Dashboard from "@/page/dashboardPage";
import RootLayout from "@/page/layouts/rootLayout";
import { Login } from "@/page/loginPage";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

const route: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Dashboard /> }],
  },

  {
    path: "/login",
    element: <Login />,
  },
];

export default function Router() {
  return <RouterProvider router={createBrowserRouter(route)} />;
}
