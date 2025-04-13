"use client"

import { Button } from "antd"
import { Input } from "../component/ui/input"
import { Label } from "../component/ui/label"
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
import { CalendarOutlined } from "@ant-design/icons"

export function SheetSide({ side }: { side: any }) {
    return (
        <div className="grid gap-2">
            <Sheet key={side}>
                <SheetTrigger asChild>
                    <Button type="primary">
                        <CalendarOutlined size={20}/>
                    </Button>
                </SheetTrigger>
                <SheetContent side={side} className="h-[500px] bg-white">
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="primary">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
