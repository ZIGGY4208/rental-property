import { useContext } from "react";
import AdminAuthContext from "../../components/data/AdminAuthContext"; // ✅ path is correct if the file is in the same folder

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
