import { useOutletContext } from "react-router-dom";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { UserCards } from "./card-user";


export function Report() {
    const { dataUser } = useOutletContext<{ dataUser: any }>();

    const formatDate = (date: Date | null) => {
        if (!date) return "Chưa cài thời gian";
        return new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date)).replace(",", "");
    };

    // Xuất Excel
    const exportToExcel = async () => {
        if (dataUser && dataUser.length > 0) {

            const flatData = dataUser?.flatMap((user: any) => ({
                "Ảnh đại diện": user?.avatar,
                "Tên người dùng": user?.name,
                "Email": user?.email,
                "Mô tả": user?.description ? user?.description : "Không có mô tả",
                "Loại tài khoản": user?.password ? "Người dùng đăng ký" : "Đăng nhập bằng gmail",
                "Quyền": user?.role,
                "Ngày tạo tài khoản": formatDate(user?.created_at),
            }));

            const worksheet = XLSX.utils.json_to_sheet(flatData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách người dùng");
            XLSX.writeFile(workbook, "danhsachnguoidung.xlsx");
        } else {
            console.warn("Không có dữ liệu để xuất Excel");
        }
    };
    return (
        <>
            <UserCards />
            <Button type="primary" onClick={exportToExcel}>Xuất Excel</Button>
        </>
    );
}
