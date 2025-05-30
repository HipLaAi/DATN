import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  ClipboardListIcon,
  DatabaseIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"

import { NavDocuments } from "../components/nav-documents"
import { NavMain } from "../components/nav-main"
import { NavSecondary } from "../components/nav-secondary"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../component/ui/sidebar"
import { Link } from "react-router-dom"
import { BsTrello } from "react-icons/bs"
import decodeJWT from "../services/Auth/auth.service "
import { useEffect, useState } from "react"

const data = {
  user: {
    name: "shadcn",
    email: "m..example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Bảng điều khiển",
      url: "admin/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
  ],

  navSecondary: [
    {
      title: "Cài đặt",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Giúp đỡ",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Tìm kiếm",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Dữ liệu người dùng",
      url: "admin/user",
      icon: DatabaseIcon,
    },
    {
      name: "Báo cáo",
      url: "admin/report",
      icon: ClipboardListIcon,
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const avatar = localStorage.getItem("avatar");
    const name = localStorage.getItem("name");

    if (token) {
      const userInfo = decodeJWT(token);
      setUserData({
        name: name,
        email: userInfo?.email,
        avatar: avatar,
      });
    }
  }, []);


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={"admin/user"}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
              >
                <BsTrello className="h-5 w-5" style={{ transform: "rotate(90deg)", transformOrigin: "center" }} />
                <h2 className="text-base font-semibold">
                  Task
                </h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
