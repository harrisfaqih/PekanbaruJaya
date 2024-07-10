import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaUserTimes, FaUsers } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosChatbubbles, IoMdAdd } from "react-icons/io";
import { MdPayment, MdViewList } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";

import { TbBasketDiscount } from "react-icons/tb";

import { IoChatbubbles } from "react-icons/io5";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export const allNav = [
  {
    id: 1,
    title: "dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <BsCartCheck />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "AddProduct",
    icon: <IoMdAdd />,
    role: "admin",
    path: "/admin/dashboard/Add-Product",
  },
  // {
  //   id: 5,
  //   title: "Seller",
  //   icon: <FaUsers />,
  //   role: "admin",
  //   path: "/admin/dashboard/Sellers",
  // },
  {
    id: 6,
    title: "Payment Request",
    icon: <MdPayment />,
    role: "admin",
    path: "/admin/dashboard/Payment-Request",
  },
  // {
  //   id: 7,
  //   title: "Deactive Sellers",
  //   icon: <FaUserTimes />,
  //   role: "admin",
  //   path: "/admin/dashboard/Deactive-Sellers",
  // },
  // {
  //   id: 8,
  //   title: "Seller Request",
  //   icon: <FaCodePullRequest />,
  //   role: "admin",
  //   path: "/admin/dashboard/sellers-request",
  // },
  // {
  //   id: 9,
  //   title: "Live Chat",
  //   icon: <IoIosChatbubbles />,
  //   role: "admin",
  //   path: "/admin/dashboard/chat-Sellers",
  // },
  {
    id: 10,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 11,
    title: "Add Product",
    icon: <IoMdAdd />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 12,
    title: "All Product",
    icon: <MdViewList />,
    role: "admin",
    path: "/admin/dashboard/Products",
  },
  {
    id: 13,
    title: "Discount Product",
    icon: <TbBasketDiscount />,
    role: "admin",
    path: "/admin/dashboard/discount-product",
  },
  {
    id: 14,
    title: "Orders",
    icon: <AiOutlineDashboard />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 15,
    title: "Payments",
    icon: <MdPayment />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 16,
    title: "Chat-Customer",
    icon: <IoChatbubbles />,
    role: "admin",
    path: "/admin/dashboard/chat-customer",
  },
  {
    id: 17,
    title: "Chat-Support",
    icon: <BsFillChatQuoteFill />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: 18,
    title: "Profile",
    icon: <CgProfile />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
];
