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

export const AdminOrders = Loadable({
  loader: () => import("../pages/dashboard/AdminOrders"),
  loading : Loading
});

export const AdminBlogs = Loadable({
  loader: () => import("../pages/dashboard/AdminBlogs"),
  loading : Loading
});

export const UpdateBlog = Loadable({
  loader: () => import("../pages/dashboard/AdminBlogs/UpdateBlog"),
  loading : Loading
});

export const Updating = Loadable({
  loader: () => import("../components/Updating"),
  loading : Loading
});

export const HomePage = Loadable({
  loader: () => import("../pages/UserWebsite/HomePage"),
  loading : Loading
});

export const Categories = Loadable({
  loader: () => import("../pages/UserWebsite/Categories"),
  loading : Loading
});

export const Blogs = Loadable({
  loader: () => import("../pages/UserWebsite/Blogs"),
  loading : Loading
});
export const BlogPage = Loadable({
  loader: () => import("../pages/UserWebsite/Blogs/BlogPage"),
  loading : Loading
});
export const ProductInfo = Loadable({
  loader: () => import("../pages/UserWebsite/ProductInfo"),
  loading : Loading
});

export const UserInformation = Loadable({
  loader: () => import("../pages/UserWebsite/UserInformation"),
  loading : Loading
});

export const CartPage = Loadable({
  loader: () => import("../pages/UserWebsite/CartPage"),
  loading : Loading
});