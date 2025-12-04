import { LayoutDashboard, Building2, User, Users, LogOut } from "lucide-react";


// Pages
import DashboardPage from "../pages/DashboardPage";
import HousesPage from "../pages/HousesPage";
import AdminProfile from "../pages/AdminProfile";
import AdminLogout from "../pages/AdminLogout";
import HouseUploadPage from "../pages/HouseUploadPage";
import UserAdminManager from "../pages/UserAdminManager";

export const adminRoutes = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: LayoutDashboard,
    component: DashboardPage,
    section: "main",
  },
  {
    label: "Houses",
    path: "houses",
    icon: Building2,
    component: HousesPage, // Renders HouseTable
    section: "main",
  },

    {
    label: "Manage Users",
    path: "Manage-user",
    icon: Users,
    component: UserAdminManager, // Renders HouseTable
    section: "main",
  },

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
