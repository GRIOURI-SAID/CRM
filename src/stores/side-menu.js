import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/alpha/dashboard",
        title: "Dashboard",
        permission: "personnal",
      },
      {
        icon: "Users",
        pathname: "/alpha/customers",
        title: "Customers",
        permission: "customers",
      },
      {
        icon: "Package",
        pathname: "/alpha/deals",
        title: "Deals",
        permission: "deals",
      },
      // {
      //   icon: "BarChart2",
      //   pathname: "/side-menu/page-4",
      //   title: "Campaigns",
      // },
      // {
      //   icon: "UserPlus",
      //   pathname: "/side-menu/page-5",
      //   title: "Leads",
      // },
      {
        icon: "FileText",
        pathname: "/alpha/invoices",
        title: "Invoices",
        permission: "invoices",
      },
      {
        icon: "FilePlus",
        pathname: "/alpha/quotes",
        title: "Quotes",
        permission: "quotes",
      },
      {
        icon: "Tag",
        pathname: "/alpha/products",
        title: "Products",
        permission: "products",
      },
      {
        icon: "Clipboard",
        pathname: "/alpha/tasks",
        title: "Tasks",
        permission: "tasks",
      },
      {
        icon: "Calendar",
        pathname: "/alpha/meetings",
        title: "Meetings",
        permission: "meetings",
      },
      {
        icon: "PhoneCall",
        pathname: "/alpha/calls",
        title: "Calls",
        permission: "calls",
      },
      {
        icon: "User",
        pathname: "/alpha/users",
        title: "Users",
        permission: "users",
      },
    ],
  },
});

export { sideMenu };
