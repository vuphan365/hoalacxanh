import React from "react";
import Loadable from 'react-loadable';

export const Loading = () => <div></div>

export const AdminLogin = Loadable({
  loader: () => import("../pages/dashboard/AdminLogin"),
  loading : Loading
});

export const AdminProducts = Loadable({
  loader: () => import("../pages/dashboard/AdminProducts"),
  loading : Loading
});

export const ProductPage = Loadable({
  loader: () => import("../pages/dashboard/AdminProducts/ProductPage"),
  loading : Loading
})

export const Admin = Loadable({
  loader: () => import("../pages/dashboard/Admin"),
  loading : Loading
})

export const AdminRedirect = Loadable({
  loader: () => import("../pages/dashboard/AdminRedirect"),
  loading : Loading
})

export const UpdateProduct = Loadable({
  loader: () => import("../pages/dashboard/AdminProducts/UpdateProduct"),
  loading : Loading
})
