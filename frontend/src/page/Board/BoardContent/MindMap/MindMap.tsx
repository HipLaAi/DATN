import React from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Chủ đề chính' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Ý chính 1' }, position: { x: 100, y: 150 } },
  { id: '3', data: { label: 'Ý chính 2' }, position: { x: 400, y: 150 } },
  { id: '4', data: { label: 'Chi tiết 1.1' }, position: { x: 50, y: 300 } },
  { id: '5', data: { label: 'Chi tiết 1.2' }, position: { x: 150, y: 300 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
];

const MindMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        {/* <Background gap={16} size={1} /> */}
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MindMap;
