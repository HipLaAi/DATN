import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { Button } from "antd";

const ExportComponent: React.FC = () => {
  // Dữ liệu mẫu
  const tasks = [
    { ID: 1, Title: "Công việc 1", Status: "Cần làm" },
    { ID: 2, Title: "Công việc 2", Status: "Đang làm" },
    { ID: 3, Title: "Công việc 3", Status: "Đã hoàn thành" },
  ];

  // Xuất Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
    XLSX.writeFile(workbook, "DanhSachCongViec.xlsx");
  };

  // Xuất PDF từ HTML
  const exportHTMLToPDF = async () => {
    const element = document.getElementById("workTable");
    if (!element) return;

    // Đảm bảo phần tử đã có kích thước đầy đủ trước khi chụp
    element.style.visibility = "visible"; // Đảm bảo phần tử hiển thị
    const canvas = await html2canvas(element, {
      scrollX: 0,
      scrollY: -window.scrollY, // Đảm bảo chụp chính xác vị trí của phần tử
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Điều chỉnh kích thước ảnh
    pdf.save("DanhSachCongViec.pdf");
  };

  // Xuất PDF từ dữ liệu
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Danh sách công việc", 10, 10);

    tasks.forEach((task, index) => {
      doc.text(`${index + 1}. ${task.Title} - ${task.Status}`, 10, 20 + index * 10);
    });

    doc.save("DanhSachCongViec.pdf");
  };

  return (
    <div>
      {/* Phần HTML để xuất ra PDF */}
      <div
        id="workTable"
        style={{
          visibility: "hidden", // Đảm bảo phần tử không hiển thị trên giao diện
          marginTop: "20px",
          maxWidth: "100%",
        }}
      >
        <h1>Danh sách công việc</h1>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.ID}>
                <td>{task.ID}</td>
                <td>{task.Title}</td>
                <td>{task.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Các nút để xuất file */}
      <Button onClick={exportToExcel}>Xuất Excel</Button>
      <Button onClick={exportToPDF}>Xuất PDF từ dữ liệu</Button>
      <Button onClick={exportHTMLToPDF}>Xuất PDF từ HTML</Button>
    </div>
  );
};

export default ExportComponent;
