// src/routes/adminRoutes.js

import {
  LayoutDashboard,
  Building2,
  UsersRound,
  User,
  Calendar,
  CreditCard,
  BarChart,
  MapPin,
  LogOut,
} from "lucide-react";

// Pages
import Landlords from "../pages/Landlords";
import DashboardPage from "../pages/DashboardPage";
import HouseUpload from "../pages/HouseUpload";
// import Dashboard from "../pages/Admin/Dashboard";
// import Properties from "../pages/Admin/Properties";
// import Tenants from "../pages/Admin/Tenants";
// import Landlords from "../pages/Admin/Landlords";
// import Bookings from "../pages/Admin/Bookings";
// import Payments from "../pages/Admin/Payments";
// import Reports from "../pages/Admin/Reports";
// import Locations from "../pages/Admin/Locations";
import AdminProfile from "../pages/AdminProfile";
import AdminLogout from "../pages/AdminLogout";

export const adminRoutes = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: LayoutDashboard,
    component: DashboardPage,
    section: "main",
  },
  {
    label: "HouseUpload",
    path: "HouseUpload",
    icon: Building2,
    component: HouseUpload,
    section: "main",
  },
  // {
  //   label: "Tenants",
  //   path: "tenants",
  //   icon: UsersRound,
  //   component: Tenants,
  //   section: "main",
  // },
  {
    label: "Landlords",
    path: "landlords",
    icon: User,
    component: Landlords,
    section: "main",
  },
  // {
  //   label: "Bookings",
  //   path: "bookings",
  //   icon: Calendar,
  //   component: Bookings,
  //   section: "main",
  // },
  // {
  //   label: "Payments",
  //   path: "payments",
  //   icon: CreditCard,
  //   component: Payments,
  //   section: "main",
  // },
  // {
  //   label: "Reports",
  //   path: "reports",
  //   icon: BarChart,
  //   component: Reports,
  //   section: "main",
  // },
  // {
  //   label: "Locations",
  //   path: "locations",
  //   icon: MapPin,
  //   component: Locations,
  //   section: "main",
  // },
  {
    label: "Profile",
    path: "profile",
    icon: User,
    component: AdminProfile,
    section: "bottom",
  },
  {
    label: "Logout",
    path: "logout",
    icon: LogOut,
    component: AdminLogout,
    section: "bottom",
  },
];
