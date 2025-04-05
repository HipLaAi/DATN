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
import { Link } from "react-router-dom"
import { URL } from "../utils/url"
import { GoogleLogin, CredentialResponse, useGoogleLogin } from "@react-oauth/google";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // return (
  //   <div className={cn("flex flex-col gap-6", className)} {...props}>
  //     <Card
  //       style={{
  //         borderRadius: "10px",
  //         backdropFilter: "blur(8px)",
  //         WebkitBackdropFilter: "blur(8px)"
  //       }}
  //       className="bg-white/30 shadow-lg"
  //     >
  //       <CardHeader className="text-center">
  //         <TextPressure
  //           text="Task!"
  //           flex={true}
  //           alpha={false}
  //           stroke={false}
  //           width={true}
  //           weight={true}
  //           italic={true}
  //           textColor="#000000"
  //           strokeColor="#ffffff"
  //           minFontSize={48}
  //         />
  //       </CardHeader>
  //       <CardContent>
  //         <form>
  //           <div className="grid gap-6">
  //             <div className="flex flex-col gap-2">
  //               <Button variant="outline" className="w-full rounded-3xl">
  //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  //                   <path
  //                     d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
  //                     fill="currentColor"
  //                   />
  //                 </svg>
  //                 Đăng nhập với tài khoản Google
  //               </Button>
  //             </div>
  //             <div className="relative flex items-center justify-center my-4">
  //               <div className="flex-grow border-t border-border"></div>
  //               <span className="px-4 text-sm text-muted-foreground whitespace-nowrap">
  //                 Hoặc tiếp tục với
  //               </span>
  //               <div className="flex-grow border-t border-border"></div>
  //             </div>
  //             <div className="grid gap-6">
  //               <div className="grid gap-2">
  //                 <Label htmlFor="email">Email</Label>
  //                 <Input
  //                   id="email"
  //                   type="email"
  //                   placeholder="address@example.com"
  //                   required
  //                   className="rounded-xl"
  //                 />
  //               </div>
  //               <div className="grid gap-2">
  //                 <div className="flex items-center">
  //                   <Label htmlFor="password">Mật khẩu</Label>
  //                   <a
  //                     href=""
  //                     className="ml-auto text-sm underline-offset-4 hover:underline"
  //                   >
  //                     Quên mật khẩu?
  //                   </a>
  //                 </div>
  //                 <Input id="password" type="password" required className="rounded-xl" placeholder="••••••••••••••••" />
  //               </div>
  //               <Button
  //                 type="submit"
  //                 className="w-full rounded-xl bg-slate-200 border border-slate-300 hover:bg-slate-300 transition-colors"
  //               >
  //                 Đăng nhập
  //               </Button>
  //             </div>
  //             <div className="text-center text-sm">
  //               Bạn chưa có tài khoản?{" "}
  //               <Link to={URL.REGISTER} className="underline underline-offset-4">
  //                 Đăng ký
  //               </Link>
  //             </div>
  //           </div>
  //         </form>
  //       </CardContent>
  //     </Card>
  //   </div>
  // )

  // LOGIN WITH GG
  // const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
  //   console.log("Google Credential Token:", credentialResponse.credential)

  //   // TODO: Gửi credential token lên server để xử lý đăng nhập
  //   // Example:
  //   // await apiServer.post('/auth/google', { token: credentialResponse.credential })
  // }

  // const handleGoogleLoginError = () => {
  //   console.error("Google login failed")
  // }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google token:', tokenResponse)
      // TODO: Gửi tokenResponse.access_token lên server
    },
    onError: () => {
      console.error('Google Login Failed')
    },
  })

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
              <div className="flex flex-col gap-2">
                {/* Nút Google Login */}
                {/* <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                /> */}
                <Button
                  variant="outline"
                  className="w-full rounded-3xl flex items-center gap-2 justify-center"
                  onClick={() => loginWithGoogle()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Đăng nhập với tài khoản Google
                </Button>
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
