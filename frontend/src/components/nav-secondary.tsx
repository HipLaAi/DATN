"use client"

import * as React from "react"
import { LogOut, LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../component/ui/sidebar"
import { Link } from "react-router-dom"
import { logout } from "../services/User/user.service"
import { URL } from "../utils/url"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = URL.AUTH.LOGIN;
    await logout();
  };
  
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuButton asChild>
            <Link to={"#"} onClick={() => handleLogout()}>
              <LogOut />
              <span>Đăng xuất</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
