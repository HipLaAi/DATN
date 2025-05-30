import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "../../component/ui/sidebar"
import { Outlet, useNavigate } from "react-router-dom"

import data from "./data.json"
import { useEffect, useState } from "react"
import { getAllUserAPI } from "../../services/User/user.service"
import decodeJWT from "../../services/Auth/auth.service "
import { URL } from "../../utils/url"

export default function HomeLayout() {
  const [allUser, setAllUser] = useState<any>();
  const navigate = useNavigate();

  const fetchAllUser = async () => {
    try {
      const response = await getAllUserAPI();
      setAllUser(response);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken') as string;
    if (!token) {
      navigate(URL.HOME.HOME)
      return;
    } else {
      const userInfo = decodeJWT(token);
      if (userInfo.role === "admin") {
        fetchAllUser();
      } else {
        navigate(URL.HOME.HOME)
      }
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet context={{
                data: data,
                dataUser: allUser
              }} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
