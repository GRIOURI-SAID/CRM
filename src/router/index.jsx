import { useState, useEffect } from 'react';
import { getRouterPermissions } from '../services/api/permissions/permissions'
import { useRoutes, Navigate } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";

import Dashboard from "../views/Dashboard/Dashboard";
import Customers from "../views/Customers/Customers";
import Deals from "../views/Deals/Deals";
import Invoices from "../views/Invoices/Invoices";
import Quotes from "../views/Quotes/Quotes";
import Products from "../views/Products/Products";
import Tasks from "../views/Tasks/Tasks";
import Meetings from "../views/Meetings/Meetings";
import Calls from "../views/Calls/Calls";
import Users from "../views/Users/Users";
import UserProfil from '../views/Users/UserProfil'
import UserSocialNetworks from '../views/Users/UserSocialNetworks'

import CustomerView from "../views/customer-view/Main";
import DealView from "../views/deal-view/Main";
import InvoiceView from "../views/invoice-view/Main";
import QuoteView from "../views/quote-view/Main";

import ProfileView from "../views/Personnal-Settings/Profile-View/Main";
import AccountSettings from "../views/Personnal-Settings/Account-Settings/Main"
import EmailSettings from '../views/Personnal-Settings/Email-Settings/Main'
import SocialNetworks from '../views/Personnal-Settings/Social-Networks/Main'
import ResetPassword from '../views/Personnal-Settings/Reset-Password/Main'


import ErrorPage from "../views/error-page";


export const children = [
  {
    path: "dashboard",
    element: <Dashboard />,
    permission: "personnal"
  },
  {
    path: "customers",
    element: <Customers />,
    permission: "customers"
  },
  {
    path: "deals",
    element: <Deals />,
    permission: "deals"
  },
  {
    path: "invoices",
    element: <Invoices />,
    permission: "invoices"
  },
  {
    path: "quotes",
    element: <Quotes />,
    permission: "quotes"
  },
  {
    path: "products",
    element: <Products />,
    permission: "products"
  },
  {
    path: "tasks",
    element: <Tasks />,
    permission: "tasks"
  },
  {
    path: "meetings",
    element: <Meetings />,
    permission: "meetings"
  },
  {
    path: "calls",
    element: <Calls />,
    permission: "calls"
  },
  {
    path: "users",
    element: <Users />,
    permission: "users"
  },
  {
    path: "customer-view",
    element: <CustomerView />,
    permission: "customers"
  },
  {
    path: "deal-view",
    element: <DealView />,
    permission: "deals"
  },
  {
    path: "invoice-view/:invoiceId",
    element: <InvoiceView />,
    permission: "invoices"
  },
  {
    path: "quote-view/:quoteId",
    element: <QuoteView />,
    permission: "quotes"
  },
  {
    path: "personnal/account-settings",
    element: <AccountSettings />,
    permission: "personnal"
  },
  {
    path: "personnal/profile-view",
    element: <ProfileView />,
    permission: "personnal"
  },
  {
    path: "users/profile-view/:userId",
    element: <UserProfil />,
    permission: "users"
  },
  {
    path: "users/social-networks/:userId",
    element: <UserSocialNetworks />,
    permission: "users"
  },
  {
    path: "personnal/email-settings",
    element: <EmailSettings />,
    permission: "personnal"
  },
  {
    path: "personnal/reset-password",
    element: <ResetPassword />,
    permission: "personnal"
  },
  {
    path: "personnal/social-networks",
    element: <SocialNetworks />,
    permission: "personnal"
  },
]




function Router() {

  const [allPathsPermitted, setAllPathsPermitted] = useState([])

  useEffect(() => {

    const mainFetch = async () => {
      const menuResponse = []
      const result = await getRouterPermissions()

      children.forEach((child) => {
        result.forEach((res) => {
          if (child.permission == res.module) {
            menuResponse.push(child)
          }
        })
      })
      console.log("menuResponse", menuResponse);
      setAllPathsPermitted(menuResponse)

    }

    mainFetch()

  }, [])



  const routes = [
    {
      path: "/",
      element: <Navigate to="/alpha/dashboard" replace />
    },
    {
      path: "/login",
      element: <Navigate to="/alpha/dashboard" replace />
    },
    {
      path: "/alpha",
      element: <SideMenu />,
      children: allPathsPermitted
    },
    {
      path: "/simple-menu",
      element: <SimpleMenu />,
      children: [
        {
          path: "page-1",
          element: <Dashboard />,
        },
        {
          path: "page-2",
          element: <Customers />,
        },
      ],
    },
    // {
    //   path: "/simple-menu",
    //   element: <SimpleMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
    // {
    //   path: "/top-menu",
    //   element: <TopMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: allPathsPermitted.length > 0 ? <ErrorPage /> : null,
    },
  ];


  return useRoutes(routes);
}

export default Router;
