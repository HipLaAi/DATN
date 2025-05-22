import { MailIcon, type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../component/ui/sidebar"
import { Link } from "react-router-dom";


export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Quick Create Section */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Gmail"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground hover:shadow-md"
            >
              <MailIcon className="text-blue-600 hover:text-blue-800 transition-colors duration-200" />
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Gmail
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Dynamic Menu Section */}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className="hover:bg-gray-200 hover:rounded-xl"
            >
              <Link to={item?.url}>
                <SidebarMenuButton tooltip={item.title} className="flex items-center gap-2">
                  {item.icon && <item.icon className="scale-130 transition-transform" />}
                  <span style={{ fontWeight: "450" }}>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
