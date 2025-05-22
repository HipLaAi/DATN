import React, { useState, useEffect } from 'react';
import './Main.css';
import { Breadcrumb, Col, Flex, Row, Space, Typography } from 'antd';
import { BellOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../component/ui/tabs';
import decodeJWT from '../../../services/Auth/auth.service ';
import { getCardAPI, getCardEndDateAPI, getCardInWeekAPI } from '../../../services/Card/Card.service';
import dayjs from "dayjs";
import { ChartMain } from '../../../components/chart-main';
import { Link } from 'react-router-dom';
import { URL } from '../../../utils/url';

const { Title } = Typography;

const Main: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [myCardEndDate, setMyCardEndDate] = useState<any>([]);
    const [allCardEndDate, setAllCardEndDate] = useState<any[]>([]);
    const [mycard, setMyCard] = useState<any>([]);
    const [allcard, setAllCard] = useState<any>([]);
    const [cardInWeek, setcardInWeek] = useState<any>();
    const userName = localStorage.getItem("name")


    const getGreeting = () => {
        const hour = time.getHours();
        if (hour < 12) return 'Buổi sáng tốt lành';
        if (hour < 18) return 'Buổi chiều vui vẻ';
        return 'Buổi tối an lành';
    };

    const fetchCardEndDate = async () => {
        try {
            const results = await getCardEndDateAPI({ option: "allcard" });
            setAllCardEndDate(results);
            const response = await getCardEndDateAPI({ option: "mycard" });
            setMyCardEndDate(response);
        } catch (error) {
            console.error("Failed:", error);
        }
    };

    const fetchCard = async () => {
        try {
            const response = await getCardAPI({ option: "mycard" });
            setMyCard(response);
            const results = await getCardAPI({ option: "allcard" });
            setAllCard(results);
        } catch (error) {
            console.error("Failed:", error);
        }
    };

    const fetchCardInWeek = async () => {
        try {
            const response = await getCardInWeekAPI();
            setcardInWeek(response);
        } catch (error) {
            console.error("Failed:", error);
        }
    };

    useEffect(() => {
        fetchCardEndDate();
        fetchCard();
        fetchCardInWeek();
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Flex vertical gap={10}
            style={{
                padding: "30px",
                maxHeight: "100vh",
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <Flex justify="space-between">
                <Col style={{ fontSize: "24px" }}>
                    {getGreeting()}, {userName}
                </Col>
                <Col>
                    <div style={{ fontSize: "24px" }}>
                        {time.toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <Flex gap={10} style={{ fontSize: "24px" }}>
                        <ClockCircleOutlined />
                        {time.toLocaleTimeString()}
                    </Flex>
                </Col>
            </Flex>
            <Flex vertical gap={20} style={{ padding: "10px", marginBottom: "50px" }}>
                <ChartMain />
                <Flex gap={20} style={{ width: "100%" }}>
                    <Col style={{
                        width: "50%",
                        padding: "10px",
                        borderRadius: "5px", // Bo góc
                        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)" // Đổ bóng với blur
                    }}>
                        <Title level={5} style={{ paddingLeft: "15px" }}>Danh sách công việc</Title>
                        <Tabs defaultValue="mycard">
                            <TabsList>
                                <TabsTrigger value="mycard" className="focus:outline-none focus:underline transition-all duration-300">
                                    Của tôi
                                </TabsTrigger>
                                <TabsTrigger value="allcard" className="focus:outline-none focus:underline transition-all duration-300">
                                    Tất cả
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="mycard">
                                {
                                    mycard && mycard.length > 0 ? (
                                        mycard.map((item: any) => (
                                            <Link to={URL.BOARD.BUILDER.LIST(item?.workspace_id, item?.board_id)} key={item?.id}>
                                                <Row justify="space-between" align="middle" style={{ padding: "8px 16px" }}>
                                                    <Col>
                                                        <Space size="small" align="center">
                                                            <CalendarOutlined style={{ fontSize: 16 }} />
                                                            <Title style={{ fontSize: 16, fontWeight: 500 }}>{item?.card_name}</Title>
                                                            <Breadcrumb>
                                                                <Breadcrumb.Item> </Breadcrumb.Item>
                                                                <Breadcrumb.Item>{item?.board_name}</Breadcrumb.Item>
                                                                <Breadcrumb.Item>{item?.workspace_name}</Breadcrumb.Item>
                                                            </Breadcrumb>
                                                        </Space>
                                                    </Col>

                                                    <Col>
                                                        <Title style={{ fontSize: 14, color: "#888" }}>
                                                            {item?.start_date
                                                                ? dayjs(item.start_date).format("DD/MM/YYYY")
                                                                : "..."}{" "}
                                                            -{" "}
                                                            {item?.end_date
                                                                ? dayjs(item.end_date).format("DD/MM/YYYY")
                                                                : "..."}
                                                        </Title>
                                                    </Col>
                                                </Row>
                                            </Link>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: "center", padding: "16px" }}>
                                            Không có dữ liệu để hiển thị.
                                        </div>
                                    )
                                }
                            </TabsContent>
                            <TabsContent value="allcard">
                                {
                                    allcard && allcard.length > 0 ? (
                                        allcard.map((item: any) => (
                                            <Link to={URL.BOARD.BUILDER.LIST(item?.workspace_id, item?.board_id)} key={item?.id}>
                                                <Row justify="space-between" align="middle" style={{ padding: "8px 16px" }}>
                                                    <Col>
                                                        <Space size="small" align="center">
                                                            <CalendarOutlined style={{ fontSize: 16 }} />
                                                            <Title style={{ fontSize: 16, fontWeight: 500 }}>{item?.card_name}</Title>
                                                            <Breadcrumb>
                                                                <Breadcrumb.Item> </Breadcrumb.Item>
                                                                <Breadcrumb.Item>{item?.board_name}</Breadcrumb.Item>
                                                                <Breadcrumb.Item>{item?.workspace_name}</Breadcrumb.Item>
                                                            </Breadcrumb>
                                                        </Space>
                                                    </Col>

                                                    <Col>
                                                        <Title style={{ fontSize: 14, color: "#888" }}>
                                                            {item?.start_date
                                                                ? dayjs(item.start_date).format("DD/MM/YYYY")
                                                                : "..."}{" "}
                                                            -{" "}
                                                            {item?.end_date
                                                                ? dayjs(item.end_date).format("DD/MM/YYYY")
                                                                : "..."}
                                                        </Title>
                                                    </Col>
                                                </Row>
                                            </Link>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: "center", padding: "16px" }}>
                                            Không có dữ liệu để hiển thị.
                                        </div>
                                    )
                                }
                            </TabsContent>
                        </Tabs>
                    </Col>

                    <Col style={{
                        width: "50%",
                        padding: "10px",
                        borderRadius: "5px", // Bo góc
                        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)" // Đổ bóng với blur
                    }}>
                        <Title level={5} style={{ paddingLeft: "15px" }}>Thông báo & Lời nhắc</Title>
                        <Tabs defaultValue="mycard">
                            <TabsList>
                                <TabsTrigger value="mycard" className="focus:outline-none focus:underline transition-all duration-300">
                                    Của tôi
                                </TabsTrigger>
                                <TabsTrigger value="allcard" className="focus:outline-none focus:underline transition-all duration-300">
                                    Tất cả
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="mycard">
                                {
                                    myCardEndDate && myCardEndDate.length > 0 ? (
                                        myCardEndDate.map((item: any) => (
                                            <Link to={URL.BOARD.BUILDER.LIST(item?.workspace_id, item?.board_id)}>
                                                <Row justify="space-between" align="middle" style={{ padding: "8px 16px" }}>
                                                    <Col>
                                                        <Space size="small" align="center">
                                                            <BellOutlined style={{ fontSize: 16 }} />
                                                            <Title style={{ fontSize: 16, fontWeight: 500 }}>{item?.card_name}</Title>
                                                            <Breadcrumb>
                                                                <Breadcrumb.Item> </Breadcrumb.Item>
                                                                <Breadcrumb.Item>{item?.board_name}</Breadcrumb.Item>
                                                                <Breadcrumb.Item>{item?.workspace_name}</Breadcrumb.Item>
                                                            </Breadcrumb>
                                                        </Space>
                                                    </Col>

                                                    <Col>
                                                        <Title style={{ fontSize: 14, color: "#888" }}>
                                                            {item?.start_date
                                                                ? dayjs(item.start_date).format("DD/MM/YYYY")
                                                                : "..."}{" "}
                                                            -{" "}
                                                            {item?.end_date
                                                                ? dayjs(item.end_date).format("DD/MM/YYYY")
                                                                : "..."}
                                                        </Title>
                                                    </Col>
                                                </Row>
                                            </Link>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: "center", padding: "16px" }}>
                                            Không có dữ liệu để hiển thị.
                                        </div>
                                    )
                                }
                            </TabsContent>
                            <TabsContent value="allcard">
                                {allCardEndDate && allCardEndDate.length > 0 ? (
                                    allCardEndDate.map((item: any) => (
                                        <Link to={URL.BOARD.BUILDER.LIST(item?.workspace_id, item?.board_id)}>
                                            <Row justify="space-between" align="middle" style={{ padding: "8px 16px" }}>
                                                <Col>
                                                    <Space size="small" align="center">
                                                        <BellOutlined style={{ fontSize: 16 }} />
                                                        <Title style={{ fontSize: 16, fontWeight: 500 }}>{item?.card_name}</Title>
                                                        <Breadcrumb>
                                                            <Breadcrumb.Item> </Breadcrumb.Item>
                                                            <Breadcrumb.Item>{item?.board_name}</Breadcrumb.Item>
                                                            <Breadcrumb.Item>{item?.workspace_name}</Breadcrumb.Item>
                                                        </Breadcrumb>
                                                    </Space>
                                                </Col>

                                                <Col>
                                                    <Title style={{ fontSize: 14, color: "#888" }}>
                                                        {item?.start_date
                                                            ? dayjs(item.start_date).format("DD/MM/YYYY")
                                                            : "..."}{" "}
                                                        -{" "}
                                                        {item?.end_date
                                                            ? dayjs(item.end_date).format("DD/MM/YYYY")
                                                            : "..."}
                                                    </Title>
                                                </Col>
                                            </Row>
                                        </Link>
                                    ))
                                ) : (
                                    <div style={{ textAlign: "center", padding: "16px" }}>
                                        Không có dữ liệu để hiển thị.
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </Col>
                </Flex>
            </Flex>
        </Flex >
    );
};

export default Main;
