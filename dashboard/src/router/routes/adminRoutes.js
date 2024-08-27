import { lazy } from "react";
// import Category from "../../views/admin/Category";
// import Orders from "../../views/admin/Orders";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const AddProduct = lazy(() => import("../../views/admin/AddProduct"));

const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));

const AdminToCustomer = lazy(() => import("../../views/admin/AdminToCustomer"));

const OrderDetails = lazy(() => import("../../views/admin/OrderDetails"));
const Products = lazy(() => import("../../views/admin/Products"));
const DiscountProducts = lazy(() =>
  import("../../views/admin/DiscountProducts.jsx")
);
const EditProduct = lazy(() => import("../../views/admin/EditProduct"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
    ability: ["active", "deactive"],
  },
  {
    path: "admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "admin/dashboard/add-product",
    element: <AddProduct />,
    role: "admin",
    ability: "admin",
  },
  // {
  //   path: "admin/dashboard/sellers",
  //   element: <Sellers />,
  //   role: "admin",
  // },
  {
    path: "admin/dashboard/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
  // {
  //   path: "admin/dashboard/Deactive-sellers",
  //   element: <DeactiveSellers />,
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/sellers-request",
  //   element: <SellerRequest />,
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/seller/details/:sellerId",
  //   element: <SellerDetails />,
  //   role: "admin",
  // },
  // {
  //   path: "admin/dashboard/chat-sellers",
  //   element: <ChatSeller />,
  //   role: "admin",
  // },
  {
    path: "/admin/dashboard/chat-customer/:customerId",
    element: <AdminToCustomer />,
    role: "admin",
    status: "active",
    ability: ["active", "deactive"],
  },
  {
    path: "/admin/dashboard/chat-customer",
    element: <AdminToCustomer />,
    role: "admin",
    status: "active",
  },
  {
    path: "admin/dashboard/Products",
    element: <Products />,
    role: "admin",
  },
  {
    path: "admin/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "admin",
    ability: ["active", "deactive"],
  },
  {
    path: "admin/dashboard/stock-monitor",
    element: <DiscountProducts />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "admin",
    status: "active",
  },
];
