import { useOutletContext } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../component/ui/table";

export function DataTable() {
  const { dataUser } = useOutletContext<{ dataUser: any }>();

  return (
    <div className="relative max-h-[88vh] overflow-auto border rounded">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Ảnh đại diện</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="text-right">Ngày tạo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {dataUser?.map((item: any) => (
            <TableRow key={item?.user_id}>
              <TableCell className="font-medium">{item?.user_id}</TableCell>
              <TableCell>
                <img
                  src={item?.avatar}
                  alt={item?.name}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.status}</TableCell>
              <TableCell>{item?.description}</TableCell>
              <TableCell className="text-right">{item?.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="sticky bottom-0 bg-white text-center border-t py-2">
        Danh sách người dùng TASK.
      </div>
    </div>

  );
}
