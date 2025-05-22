import { cn } from "../lib/utils"
import {
    Card,
    CardContent,
    CardHeader,
} from "../component/ui/card"
import TextPressure from "../component/Reactbits/TextPressure"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer, ToastOptions } from "react-toastify"

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [code, setCode] = useState<any>();
    const [email, setEmail] = useState<any>();
    //hàm thông báo modal
    const handleToast = (message: string, status: "success" | "error") => {
        const toastOptions: ToastOptions = {
            toastId: message,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        };

        const toastActions = {
            success: () => toast.success(message, toastOptions),
            error: () => toast.error(message, toastOptions),
        };

        toastActions[status]?.();
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card
                style={{
                    borderRadius: "10px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)"
                }}
                className="bg-white/30 shadow-lg"
            >
                <CardHeader className="text-center">
                    <TextPressure
                        text="Task!"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#000000"
                        strokeColor="#ffffff"
                        minFontSize={48}
                    />
                </CardHeader>
                <CardContent>
                    <Outlet context={{
                        code: code,
                        setCode: setCode,
                        email: email,
                        setEmail: setEmail,
                        handleToast: handleToast
                    }} />
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    )
}
