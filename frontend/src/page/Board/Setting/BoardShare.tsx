import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { Button, Flex } from "antd";
import { useParams } from "react-router-dom";
import { getBoarByIdAPI } from "../../../services/Board/board.sevice";
import MindMap from "../BoardContent/MindMap/MindMap";
import { useDispatch } from "react-redux";
import { exportReload } from "../../../features/reloadSlice";

const ExportComponent: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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
    const response = await getBoarByIdAPI(id);
    if (response?.column && response?.column.length > 0) {

      const flatData = response?.column.flatMap((col: any) =>
        col?.card.map((card: any) => ({
          "Nhiệm vụ": card.name,
          "Danh sách": col.name,
          "Nhãn": card.label
            ? card.label.map((lbl: any) => lbl.name).join(", ")
            : "Không có nhãn",
          "Người tham gia": card.userjoin
            ? card.userjoin.map((user: any) => user.email).join(", ")
            : "Không có ai tham gia",
          "Ngày bắt đầu": card.start_date ? formatDate(card.start_date) : "Không có thời gian bắt đầu",
          "Ngày kết thúc": card.end_date ? formatDate(card.end_date) : "Không có thời gian kết thúc",
        }))
      );
      const worksheet = XLSX.utils.json_to_sheet(flatData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, response?.name);
      XLSX.writeFile(workbook, response?.name + ".xlsx");
    } else {
      console.warn("Không có dữ liệu để xuất Excel");
    }
  };


  // Xuất PDF
  const exportHTMLToPDF = async () => {
    dispatch(exportReload());
  };


  return (
    <Flex vertical gap={10}>
      <Button type="primary" onClick={exportToExcel}>Xuất Excel</Button>
      <Button danger type="primary" onClick={exportHTMLToPDF}>Xuất PDF từ HTML</Button>
    </Flex>
  );
};

export default ExportComponent;
