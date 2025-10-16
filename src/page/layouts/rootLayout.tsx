import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "./appLayout";

import Cookies from "js-cookie";
import { useAppSelector } from "@/store";

const RootLayout = () => {
  const authState = useAppSelector((state) => state.auth);
  const tokenFromCookie = Cookies.get("token");

  const token = authState.token || tokenFromCookie;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};


export default RootLayout;
