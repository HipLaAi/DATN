import { useEffect, useState } from "react";
import { Separator } from "../component/ui/separator"
import { SidebarTrigger } from "../component/ui/sidebar"
import { Col, Flex } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

export function SiteHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Flex style={{ width: "100%" }} justify="space-between">
          <Col>
            <ClockCircleOutlined />
            {time.toLocaleTimeString()}
          </Col>
          <Col>
            {time.toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Col>
        </Flex>
      </div>
    </header>
  )
}
