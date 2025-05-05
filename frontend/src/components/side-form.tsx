// "use client"

// import { Button } from "antd"
// import { Input } from "../component/ui/input"
// import { Label } from "../component/ui/label"
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "../component/ui/sheet"
// import { CalendarOutlined } from "@ant-design/icons"
// import Calendar from "../component/Calendar/Calendar"

// export function SheetSide({ side }: { side: any }) {
//     // const events = [
//     //     {
//     //         id: 1,
//     //         title: "Meeting",
//     //         startTime: "2025-04-08T10:00:00",
//     //         endTime: "2025-04-08T12:00:00",
//     //         day: 2, // Tuesday
//     //     },
//     //     {
//     //         id: 2,
//     //         title: "Lunch",
//     //         startTime: "2025-04-08T13:00:00",
//     //         endTime: "2025-04-08T14:00:00",
//     //         day: 2, // Tuesday
//     //     },
//     // ];

//     return (
//         <div className="grid gap-2">
//             <Sheet key={side}>
//                 <SheetTrigger asChild>
//                     <Button type="primary">
//                         <CalendarOutlined size={20} />
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent
//                     side={side}
//                     className="h-[600px] bg-white overflow-y-auto"
//                     style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
//                     {/* <Calendar events={events} /> */}
//                     {/* <SheetHeader>
//                         <SheetTitle>Edit profile</SheetTitle>
//                         <SheetDescription>
//                             Make changes to your profile here. Click save when you're done.
//                         </SheetDescription>
//                     </SheetHeader>
//                     <div className="grid gap-4 py-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="name" className="text-right">
//                                 Name
//                             </Label>
//                             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="username" className="text-right">
//                                 Username
//                             </Label>
//                             <Input id="username" value="@peduarte" className="col-span-3" />
//                         </div>
//                     </div>
//                     <SheetFooter>
//                         <SheetClose asChild>
//                             <Button type="primary">Save changes</Button>
//                         </SheetClose>
//                     </SheetFooter> */}
//                 </SheetContent>
//             </Sheet>
//         </div>
//     )
// }









"use client"

import { Button, ButtonProps, Divider } from "antd"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../component/ui/sheet"
import { ReactNode } from "react"

type SheetSideProps = {
  side?: "top" | "right" | "bottom" | "left"
  triggerIcon?: ReactNode
  triggerText?: string
  triggerProps?: ButtonProps
  width?: number | string
  height?: number | string
  title?: string
  description?: string
  showFooter?: boolean
  footerContent?: ReactNode
  className?: string
  contentClassName?: string
  children: ReactNode
}

export function SheetSide({
  side = "bottom",
  triggerIcon,
  triggerText,
  triggerProps = { type: "primary" },
  width = "100%",
  height = "100%",
  title,
  description,
  showFooter = false,
  footerContent,
  className = "",
  contentClassName = "",
  children,
}: SheetSideProps) {
  return (
    <div className={`grid gap-2 ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button {...triggerProps}>
            {triggerIcon}
            {triggerText && <span className="ml-2">{triggerText}</span>}
          </Button>
        </SheetTrigger>
        <SheetContent
          side={side}
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
          }}
          className={`bg-white overflow-y-auto ${contentClassName}`}
        >
          {(title || description) && (
            <SheetHeader className="flex flex-col items-center justify-center text-center">
              {title && <SheetTitle style={{ fontSize: "16px", fontWeight: "500" }}>{title}</SheetTitle>}
              {description && <SheetDescription>{description}</SheetDescription>}
              <Divider />
            </SheetHeader>
          )}

          <div className="p-0 m-0">{children}</div>


          {showFooter && (
            <SheetFooter>
              {footerContent || (
                <SheetClose asChild>
                  <Button type="primary">Đóng</Button>
                </SheetClose>
              )}
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}