import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googleLogin, sendVerificationEmail } from "../../services/User/user.service";
import { URL } from "../../utils/url"
import { useState } from "react";

export function MainRegister({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { setCode, setEmail, handleToast } = useOutletContext<{ setCode: any, setEmail: any, handleToast: any }>();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        const result = await googleLogin({ token_id: credentialResponse.credential });
        if (result) {
            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("name", result.name);
            localStorage.setItem("avatar", result.avatar);
            navigate(URL.HOME.HOME)
        }
        else {
            handleToast("Tài khoản gmail này đã được đăng ký", "error");
        }
    }
    const handleGoogleLoginError = () => {
        console.error("Google login failed")
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString().trim();

        if (!email || email.length === 0) {
            handleToast("Email không hợp lệ", "error");
            return;
        }

        setIsLoading(true);
        try {
            const results = await sendVerificationEmail({ email });
            if (results) {
                handleToast("Gửi mã xác thực thành công", "success");
                setEmail(email)
                setCode(results)
                navigate(URL.AUTH.VERIFICATIONEMAIL)
            }
        } catch (error) {
            handleToast("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                disabled={isLoading}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="address@example.com"
                                required
                                className="rounded-xl"
                            />
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

                    {/* space */}
                    <div className="relative flex items-center justify-center my-4">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="px-4 text-sm text-muted-foreground whitespace-nowrap">
                            Hoặc tiếp tục với
                        </span>
                        <div className="flex-grow border-t border-border"></div>
                    </div>
                    {/* button login with google */}
                    <div className="flex flex-col gap-2">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                            useOneTap={false}
                            width="310"
                        />
                    </div>
                    {/* footer */}
                    <div className="text-center text-sm">
                        Bạn đã có tài khoản?{" "}
                        <Link to={URL.AUTH.LOGIN} className="underline underline-offset-4">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}