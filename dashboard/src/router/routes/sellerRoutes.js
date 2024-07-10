import { lazy } from "react";
const Home = lazy(() => import("../../views/Home"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const Pending = lazy(() => import("../../views/Pending"));
const Deactive = lazy(() => import("../../views/Deactive"));

export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    visibility: ["admin", "seller"],
  },
  {
    path: "/seller/account-pending",
    element: <Pending />,
    visibility: "seller",
  },
  {
    path: "/seller/account-deactive",
    element: <Deactive />,
    visibility: "seller",
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    visibility: ["seller"],
    status: "active",
  },
  {
    path: "/seller/dashboard/add-product",
    //element : <AddProduct/>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-product/:productId",
    // element : <EditProduct/>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/products",
    //element : <Products/>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/discount-product",
    //  element : <DiscountProducts/>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/orders",
    //  element : <Orders/>,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/order/details/:orderId",
    //  element : <OrderDetails/>,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/payments",
    //element : <Payments/>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-support",
    //element : <SellerToAdmin/>,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/chat-customer/:customerId",
    // element : <SellerToCustomer/>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-customer",
    //element : <SellerToCustomer/>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/profile",
    //element : <Profile/>,
    role: "seller",
    status: "active",
  },
];
