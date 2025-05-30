import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Button, Col, Flex } from 'antd';
import { ClearOutlined, UndoOutlined } from '@ant-design/icons';

const Whiteboard = () => {
    const canvasRef = useRef<CanvasDraw | null>(null);

    const clearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clear();
        }
    };

    const undoLastAction = () => {
        if (canvasRef.current) {
            canvasRef.current.undo();
        }
    };

    return (
        <Flex justify="center" align="center" vertical={true} gap={10} style={{ width: "100%", height: "90vh" }}>
            <Col>
                <CanvasDraw
                    ref={canvasRef}
                    canvasWidth={1200}
                    canvasHeight={550}
                    brushRadius={1}
                    lazyRadius={2}
                />
            </Col>
            <Flex gap={20}>
                <Button type="primary" onClick={clearCanvas} icon={<ClearOutlined />} />
                <Button type="default" onClick={undoLastAction} icon={<UndoOutlined />} />
            </Flex>
        </Flex>
    );
};

export default Whiteboard;
