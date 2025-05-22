import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { register } from "../../services/User/user.service";
import { URL } from "../../utils/url"
import { useEffect, useState } from "react";

export function InforAccount({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { email, handleToast, setCode, setEmail } = useOutletContext<{ email: any, handleToast: any, setCode: any, setEmail: any }>();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (email === undefined || email === null) {
            navigate(URL.AUTH.REGISTER);
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString().trim();
        const password = formData.get("password")?.toString().trim();
        const confirmpassword = formData.get("confirmpassword")?.toString().trim();

        if (confirmpassword !== password) {
            setError("Mật khẩu không khớp.");
            return;
        }
        setIsLoading(true);
        try {
            const results = await register({ email, name, password });
            if (results) {
                console.log(results.accessToken, results.name, results.avatar)
                localStorage.setItem("accessToken", results.accessToken);
                localStorage.setItem("name", results.name);
                localStorage.setItem("avatar", results.avatar);
                setCode(null)
                setEmail(null)
                navigate(URL.HOME.HOME)
            }

            else {
                handleToast("Đăng ký thất bại!", "error")
            }
        } catch (error) {
            console.log("Fail:", error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    {/* content */}
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Họ và Tên</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Nhập tên người dùng"
                                required
                                className="rounded-xl"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                className="rounded-xl"
                                placeholder="••••••••••••••••" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmpassword">Xác nhận mật khẩu</Label>
                            <Input
                                id="confirmpassword"
                                type="password"
                                name="confirmpassword"
                                required
                                className="rounded-xl"
                                placeholder="••••••••••••••••" />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-xl bg-slate-200 border border-slate-300 hover:bg-slate-300 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="loader"></span>
                                    Đang xử lý...
                                </div>
                            ) : (
                                "Đăng ký"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}