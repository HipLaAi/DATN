import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeMouseHandler,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { getBoarByIdAPI } from '../../../../services/Board/board.sevice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

interface Card {
  card_id: string;
  name: string;
}

interface Column {
  column_id: string;
  name: string;
  card: Card[];
}

interface Board {
  board_id: string;
  name: string;
  column: Column[];
}

const mapToNodesAndEdges = (data: Board): { nodes: any[]; edges: any[] } => {
  const nodes: any[] = [];
  const edges: any[] = [];

  nodes.push({
    id: `board-${data.board_id}`,
    type: 'input',
    data: { label: `Bảng: ${data.name}` },
    position: { x: 300, y: 0 },
    onClick: (event: any) => alert(`Clicked on Board: ${data.name}`), // Thêm sự kiện click cho Board
  });

  data.column.forEach((col, colIndex) => {
    nodes.push({
      id: `column-${col.column_id}`,
      data: { label: `Danh sách: ${col.name}` },
      position: { x: colIndex * 300, y: 150 },
    });

    edges.push({
      id: `e-board-${col.column_id}`,
      source: `board-${data.board_id}`,
      target: `column-${col.column_id}`,
      animated: true,
    });

    col.card.forEach((card, cardIndex) => {
      nodes.push({
        id: `card-${card.card_id}`,
        data: { label: `Nhiệm vụ: ${card.name}` },
        position: { x: colIndex * 300 + cardIndex * 50, y: 300 },
      });

      edges.push({
        id: `e-column-${col.column_id}-card-${card.card_id}`,
        source: `column-${col.column_id}`,
        target: `card-${card.card_id}`,
      });
    });
  });

  return { nodes, edges };
};



const MindMap = () => {
  const { id } = useParams<{ id: string }>();
  const { handleToggleModal, fetchCardById } = useOutletContext<{ handleToggleModal: any, fetchCardById: any }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const exportReload = useSelector(
    (state: any) => state.reload.exportReload
  );
  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const fetchData = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await getBoarByIdAPI(id);
      setBoard(response);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const handleOpenModal = (cardId: any) => {
    handleToggleModal()
    fetchCardById(cardId)
  }

  const onNodeClick: NodeMouseHandler = (event, node) => {
    if (node.id.includes("card")) {
      const cardId = node.id.replace('card-', '');
      handleOpenModal(cardId);
    }
  };

  useEffect(() => {
    if (board) {
      const { nodes, edges } = mapToNodesAndEdges(board);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [board, setNodes, setEdges]);

  useEffect(() => {
    fetchData();
  }, []);

  const exportHTMLToPDF = async () => {
    const element = document.getElementById("mindmap");
    if (!element) return;

    element.style.position = "static";
    const canvas = await html2canvas(element, {
      scale: 2,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("DanhSachCongViec.pdf");
  };

  useEffect(() => {
    if (exportReload) {
      exportHTMLToPDF();
    }
  }, [exportReload]);



  return (
    <div style={{ height: '90vh', width: '100%' }} id="mindmap">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>

  );
};

export default MindMap;