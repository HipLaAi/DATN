import { cn } from "../lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
} from "../component/ui/card"
import { Button } from "../component/ui/button"
import { Label } from "../component/ui/label"
import { Input } from "../component/ui/input"
import TextPressure from "../component/Reactbits/TextPressure"
import { Link, useNavigate } from "react-router-dom"
import { URL } from "../utils/url"
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { googleLogin } from "../services/User/user.service"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const result = await googleLogin({ token_id: credentialResponse.credential });
    if(result){
      localStorage.setItem("user_id",result.user_id)
      localStorage.setItem("user_name",result.name)
      localStorage.setItem("user_avatar",result.avatar)
      navigate(URL.HOME)
    }
  }

  const handleGoogleLoginError = () => {
    console.error("Google login failed")
  }

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
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col items-center gap-2 w-full [&>div>div]:rounded-[12px] [&>div>div]:overflow-hidden">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap={false}
                  width="310"
                />
              </div>
              <div className="relative flex items-center justify-center my-4">
                <div className="flex-grow border-t border-border"></div>
                <span className="px-4 text-sm text-muted-foreground whitespace-nowrap">
                  Hoặc tiếp tục với
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="address@example.com"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <a
                      href=""
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>
                  <Input id="password" type="password" required className="rounded-xl" placeholder="••••••••••••••••" />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-xl bg-slate-200 border border-slate-300 hover:bg-slate-300 transition-colors"
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="text-center text-sm">
                Bạn chưa có tài khoản?{" "}
                <Link to={URL.REGISTER} className="underline underline-offset-4">
                  Đăng ký
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
