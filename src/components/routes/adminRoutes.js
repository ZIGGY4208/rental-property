import {
  LayoutDashboard,
  Building2,
  Upload,
  User,
  Users,
  LogOut,
} from "lucide-react";

// Pages
import DashboardPage from "../pages/DashboardPage";
import HousesPage from "../pages/HousesPage";
import AdminProfile from "../pages/AdminProfile";
import AdminLogout from "../../features/Admin.authentication/AdminLogout";
import HouseUploadPage from "../pages/HouseUploadPage";
import UserAdminManager from "../pages/UserAdminManager";
import HouseUploadWrapper from "../houseUploadComponents/HouseUploadWrapper";

export const adminRoutes = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: LayoutDashboard,
    component: DashboardPage,
    section: "main",
    matchMode: "exact", // active only on /Admin/dashboard
  },
  {
    label: "Houses",
    path: "houses",
    icon: Building2,
    component: HousesPage,
    section: "main",
    matchMode: "exact", // active only on /Admin/houses
  },
  {
    label: "Upload House",
    path: "upload", // changed to /Admin/upload for clarity
    icon: Upload,
    component: HouseUploadWrapper,
    section: "main",
    matchMode: "exact", // active only on /Admin/upload
  },
  {
    label: "Manage Users",
    path: "Manage-user",
    icon: Users,
    component: UserAdminManager,
    section: "main",
    matchMode: "parent", // active on /Admin/Manage-user and nested
  },
  {
    label: "Profile",
    path: "profile",
    icon: User,
    component: AdminProfile,
    section: "bottom",
    matchMode: "exact", // active only on /Admin/profile
  },
  {
    label: "Logout",
    path: "logout",
    icon: LogOut,
    component: AdminLogout,
    section: "bottom",
    matchMode: "exact", // active only on /Admin/logout
  },
];
