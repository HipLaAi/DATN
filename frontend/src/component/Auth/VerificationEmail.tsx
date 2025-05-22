import { MailOutlined } from "@ant-design/icons";
import { useDebounce } from "@uidotdev/usehooks";
import { Flex, Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { URL } from "../../utils/url"

export function VerificationEmail({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const navigate = useNavigate();
    const { code, handleToast } = useOutletContext<{ code: any, handleToast: any }>();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const debouncedOtp = useDebounce(otp.join(""), 500);

    useEffect(() => {
        if (code === undefined || code === null) {
            navigate(URL.AUTH.REGISTER);
        }
    }, [])

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) {
                (nextInput as HTMLInputElement).focus();
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            const previousInput = document.getElementById(`otp-input-${index - 1}`);
            if (previousInput) {
                (previousInput as HTMLInputElement).focus();
            }
        }
    };

    const verifyOtp = async (otpCode: string) => {
        try {
            if (otpCode == code) {
                navigate(URL.AUTH.INFORACCOUNT);
                handleToast("Xác thực thành công", "success")
            }
            else {
                handleToast("Mã xác nhận không hợp lệ ", "error")
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    useEffect(() => {
        if (debouncedOtp.length === 6 && /^\d{6}$/.test(debouncedOtp)) {
            verifyOtp(debouncedOtp);
        }
    }, [debouncedOtp]);

    return (
        <>
            <Flex gap={10}>
                {otp.map((digit, index) => (
                    <Input
                        style={{ fontSize: "20px", textAlign: "center" }}
                        key={index}
                        id={`otp-input-${index}`}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </Flex>
            <Flex justify="center" style={{ marginTop: "20px" }} gap={10}>
                <MailOutlined />
                <a
                    href="https://mail.google.com"
                    target="_blank"
                >
                    Truy cập Gmail để lấy mã xác nhận
                </a>
            </Flex>
        </>
    );
}
