import React from "react";
import Loadable from 'react-loadable';

const Loading = () => <div></div>

export const AdminLogin = Loadable({
  loader: () => import("../pages/dashboard/AdminLogin"),
  loading : Loading,
});