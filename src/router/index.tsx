import Dashboard from "@/page/dashboardPage";
import TaskDetailPage from "@/page/detailTaskPage";
import RootLayout from "@/page/layouts/rootLayout";
import { Login } from "@/page/loginPage";
import { Register } from "@/page/registerPage";
import TaskPage from "@/page/taskPage";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

const route: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/tasks", element: <TaskPage /> },
      { path: "/tasks/:id", element: <TaskDetailPage /> },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default function Router() {
  return <RouterProvider router={createBrowserRouter(route)} />;
}
