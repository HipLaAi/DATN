import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Flex, Input, Modal, Typography } from 'antd';
import CustomPop from '../../../component/PopConfirm/PopConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { createLabelBoardAPI, deleteLabelBoardAPI, getLabelBoardAPI, updateLabelBoardAPI } from '../../../services/Label/LabelBoard.service';
import { useDispatch } from 'react-redux';
import { boardDetailReload, cardDetailReload } from '../../../features/reloadSlice';

const { Title, Text } = Typography;

const BoardLabel = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [labelBoard, setLabelBoard] = useState<any>();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [createLabel, setCreatelabel] = useState(false);
    const [newLabel, setNewLabel] = useState<{ name: string; background: string }>({
        name: "",
        background: "#CFFAEA",
    });

    const fetchLabelBoard = async () => {
        if (id) {
            const results = await getLabelBoardAPI(id)
            setLabelBoard(results);
        }
    }

    useEffect(() => {
        fetchLabelBoard();
    }, [id]);

    const colors = [
        "#CFFAEA", "#FFEB99", "#A2D8D8", "#BBDEFB", "#C6F8F2", "#E8FF99",
        "#FFBE99", "#FFD3D3", "#dfd8fd", "#85D88A", "#FFCF85", "#FF8C73",
        "#C199FF", "#85C9FF", "#AFE7A0", "#FFD1F0", "#E8E8E8", "#2185D0",
        "#26C6DA", "#AED581", "#F06292", "#9FA8DA", "#6e5dc6", "#64B5F6",
        "#4bce97", "#FF5252", "#F57C00", "#0055cc", "#607D8B", "#f5cd47"
    ];

    // Hàm xử lý cập nhật dữ liệu thay đổi
    const handleDataLabelChange = async (lbID: any, name: any, background: any) => {
        try {
            if (id) {
                const updateData = {
                    labelboard_id: lbID,
                    name: name,
                    background: background
                }
                await updateLabelBoardAPI(id, updateData)
                setLabelBoard((prevData: any) =>
                    prevData?.map((item: any) =>
                        item.labelboard_id === lbID
                            ? {
                                ...item,
                                name: name,
                                background: background,
                            }
                            : item
                    ),
                );
                dispatch(boardDetailReload());
                dispatch(cardDetailReload());
            }
        } catch (error) {
            console.error('Update failed:', error);
        }

    };

    // Hàm xử lý tạo
    const handleDataLabelCraete = async () => {
        try {
            if (id) {
                await createLabelBoardAPI(id, newLabel);
                fetchLabelBoard();
                setNewLabel({
                    name: "",
                    background: "#CFFAEA"
                });
                dispatch(cardDetailReload());
            }
        } catch (error) {
            console.error('Update failed:', error);
        }

    };

    // hàm xử lý xóa
    const handleDeleteLabel = async (lbID: any) => {
        try {
            await deleteLabelBoardAPI(lbID);
            fetchLabelBoard();
            dispatch(boardDetailReload());
            dispatch(cardDetailReload());
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div style={{ margin: 0, padding: 0, border: "none", backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity, 1))" }}>
            <Flex vertical={true} gap={30} style={{ margin: "20px 0" }}>
                <Title level={5}>Nhãn</Title>
                {
                    labelBoard?.map((item: any) => (
                        <>
                            <Flex gap={12}>
                                <Col span={20}>
                                    <CustomPop
                                        position='left'
                                        title={
                                            <>
                                                <Text style={{ pointerEvents: "auto" }}>Chọn một màu</Text>
                                            </>
                                        } content={
                                            <>
                                                <div style={{ pointerEvents: "auto" }}>
                                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginTop: "10px" }}>
                                                        {colors.map((color: any) => (
                                                            <div
                                                                style={{
                                                                    borderRadius: "5px",
                                                                    border: item?.background === color ? `2px dashed ${color}` : "2px dashed white"
                                                                }}>
                                                                <Button
                                                                    style={{
                                                                        width: "40px",
                                                                        height: "35px",
                                                                        backgroundColor: color,
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => handleDataLabelChange(item?.labelboard_id, item?.name, color)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        }>
                                        <Button type='text' style={{ backgroundColor: item?.background, width: "100%" }}>
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    maxWidth: "100%",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    fontWeight: "500",
                                                    color: "#2a2a2a"
                                                }}
                                            >
                                                {item?.name}
                                            </span>
                                        </Button>
                                    </CustomPop>
                                </Col>
                                <Col span={2}>
                                    <Button icon={<EditOutlined />}
                                        onClick={() => setEditIndex(item?.labelboard_id)}
                                    />
                                </Col>
                            </Flex>
                            {editIndex === item?.labelboard_id && (
                                <Flex gap={10}>
                                    <Input
                                        spellCheck={false}
                                        onBlur={() => setEditIndex(null)}
                                        onPressEnter={() => setEditIndex(null)}
                                        placeholder="Nhập tiêu đề"
                                        value={item?.name}
                                        onChange={(e: any) => handleDataLabelChange(item?.labelboard_id, e.target.value, item?.background)}
                                    />
                                    <Button danger type="text" icon={<DeleteOutlined />} title="Xóa"
                                        onClick={() => handleDeleteLabel(item?.labelboard_id)}
                                    ></Button>
                                </Flex>
                            )}
                        </>
                    ))
                }
                {
                    !createLabel ? (
                        <Button
                            onClick={() => setCreatelabel(true)}
                        >Tạo nhãn</Button>
                    ) : (
                        <Flex vertical={true} gap={10}>
                            <hr></hr>
                            <CustomPop
                                position='left'
                                title={
                                    <>
                                        <Text style={{ pointerEvents: "auto" }}>Chọn một màu</Text>
                                    </>
                                } content={
                                    <>
                                        <div style={{ pointerEvents: "auto" }}>
                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginTop: "10px" }}>
                                                {colors.map((color: any) => (
                                                    <div
                                                        style={{
                                                            borderRadius: "5px",
                                                            border: newLabel?.background === color ? `2px dashed ${color}` : "2px dashed white"
                                                        }}>
                                                        <Button
                                                            style={{
                                                                width: "40px",
                                                                height: "35px",
                                                                backgroundColor: color,
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => setNewLabel((prev) => ({
                                                                ...prev,
                                                                background: color,
                                                            }))}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                }>
                                <Button type='text' style={{ backgroundColor: newLabel.background, width: "100%" }}>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            maxWidth: "100%",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            fontWeight: "500",
                                            color: "#2a2a2a"
                                        }}
                                    >
                                        {newLabel.name}
                                    </span>
                                </Button>
                            </CustomPop>
                            <Input
                                spellCheck={false}
                                placeholder="Nhập tiêu đề"
                                value={newLabel.name}
                                onChange={(e: any) =>
                                    setNewLabel((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))}
                                onPressEnter={handleDataLabelCraete}
                            />
                            <Flex gap={10} justify="end">
                                <Button danger
                                    onClick={() => setCreatelabel(false)}
                                >Hủy</Button>
                                <Button type="primary"
                                    onClick={handleDataLabelCraete}>Lưu</Button>
                            </Flex>
                        </Flex>
                    )}
            </Flex>
        </div >
    );
};

export default BoardLabel;
