import React, { useState, useEffect } from 'react';
import './Main.css';
import { Col, Flex, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../component/ui/tabs';

const { Title } = Typography;

const Main: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const userName = localStorage.getItem("name")

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = time.getHours();
        if (hour < 12) return 'Buổi sáng tốt lành';
        if (hour < 18) return 'Buổi chiều vui vẻ';
        return 'Buổi tối an lành';
    };

    return (
        <Flex vertical gap={10} style={{ padding: "30px" }}>
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
            <Flex vertical gap={20} style={{ padding: "10px" }}>
                <Col style={{
                    padding: "10px",
                    borderRadius: "5px", // Bo góc
                    boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)" // Đổ bóng với blur
                }}>
                    <Title level={5} style={{ paddingLeft: "15px" }}>Công việc của tôi</Title>
                    <Tabs defaultValue="todo">
                        <TabsList>
                            <TabsTrigger value="todo" className="focus:outline-none focus:underline transition-all duration-300">
                                Cần làm
                            </TabsTrigger>
                            <TabsTrigger value="inprogress" className="focus:outline-none focus:underline transition-all duration-300">
                                Đang làm
                            </TabsTrigger>
                            <TabsTrigger value="done" className="focus:outline-none focus:underline transition-all duration-300">
                                Đã hoàn thành
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="todo">Cần làm.</TabsContent>
                        <TabsContent value="inprogress">Make changes to your account here.</TabsContent>
                        <TabsContent value="done">Change your password here.</TabsContent>
                    </Tabs>
                </Col>
                <Flex gap={20} style={{ width: "100%" }}>
                    <Col style={{
                        width: "50%",
                        padding: "10px",
                        borderRadius: "5px", // Bo góc
                        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)" // Đổ bóng với blur
                    }}>
                        <Title level={5} style={{ paddingLeft: "15px" }}>Danh sách công việc</Title>
                        <Tabs defaultValue="todo">
                            <TabsList>
                                <TabsTrigger value="todo" className="focus:outline-none focus:underline transition-all duration-300">
                                    Cần làm
                                </TabsTrigger>
                                <TabsTrigger value="inprogress" className="focus:outline-none focus:underline transition-all duration-300">
                                    Đang làm
                                </TabsTrigger>
                                <TabsTrigger value="done" className="focus:outline-none focus:underline transition-all duration-300">
                                    Đã hoàn thành
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="todo">Cần làm.</TabsContent>
                            <TabsContent value="inprogress">Make changes to your account here.</TabsContent>
                            <TabsContent value="done">Change your password here.</TabsContent>
                        </Tabs>
                    </Col>
                    <Col style={{
                        width: "50%",
                        padding: "10px",
                        borderRadius: "5px", // Bo góc
                        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)" // Đổ bóng với blur
                    }}>
                        <Title level={5} style={{ paddingLeft: "15px" }}>Thông báo & Lời nhắc</Title>
                        <Tabs defaultValue="todo">
                            <TabsList>
                                <TabsTrigger value="todo" className="focus:outline-none focus:underline transition-all duration-300">
                                    Cần làm
                                </TabsTrigger>
                                <TabsTrigger value="inprogress" className="focus:outline-none focus:underline transition-all duration-300">
                                    Đang làm
                                </TabsTrigger>
                                <TabsTrigger value="done" className="focus:outline-none focus:underline transition-all duration-300">
                                    Đã hoàn thành
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="todo">Cần làm.</TabsContent>
                            <TabsContent value="inprogress">Make changes to your account here.</TabsContent>
                            <TabsContent value="done">Change your password here.</TabsContent>
                        </Tabs>
                    </Col>
                </Flex>
            </Flex>
        </Flex >
    );
};

export default Main;
