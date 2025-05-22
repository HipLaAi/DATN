import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Typography, Card, Space, Avatar, Flex, Select, Spin } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import style from "./ChatAI.module.scss";
import Draggable from 'react-draggable';
import { chatAIAPI } from '../../../services/Chat/Chat.service';

const { Text, Title } = Typography;
const cx = classNames.bind(style)

const ChatAI = (props: any) => {
    const workspace = props.workSpaceMember;
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [option, setOption] = useState<any>("allcard");
    const [resources, setResources] = useState<any>("Tất cả");
    const [loading, setLoading] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setData((preve) => [...preve, { actor: "user", message: inputValue }]);
            setInputValue('');
            handleSendMessage();
        }
    };

    const handleChange = (value: any) => {
        setOption(value);
        if (value === "allcard") {
            setResources("Tất cả");
            return;
        }
        for (const workspaceItem of workspace || []) {
            for (const boardItem of workspaceItem?.boards || []) {
                if (boardItem?.board_id === value) {
                    setResources(`${workspaceItem?.workspace_name} / ${boardItem?.name}`);
                    return;
                }
            }
        }
    };

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatText = (text: string): string => {
        let formattedText = text;

        formattedText = formattedText.replace(/[*]{1,2}/g, '');

        formattedText = formattedText.replace(
            /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.\d+Z/g,
            (_, date, time) => `${date} ${time}`
        );

        formattedText = formattedText.replace(/^\s*[\*\-]+\s+/gm, '  ');
        formattedText = formattedText.replace(/\n\s*\n/g, '\n');

        return formattedText.trim();
    };


    const handleSendMessage = async () => {
        setLoading(true);
        try {
            const result = await chatAIAPI({ request: inputValue, option: option });
            setData((preve) => [...preve, { actor: "ai", message: formatText(result) }]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    return (
        <Draggable bounds="parent" handle=".drag-handle">
            <div className={cx("chat")}>
                <Title level={5} style={{ margin: "10px", cursor: "grab" }} className="drag-handle">
                    <Flex justify="space-between" style={{ width: "100%" }} align='center'>
                        <Flex gap={"10px"} align='center'>
                            <Avatar src={"https://img.freepik.com/premium-vector/artificial-intelligence-colorful-tool-symbol-icon-ai-stars-modern-image-generator-app-logo-vector_34480-1595.jpg"} ></Avatar>
                            <Flex vertical>
                                <Text>{"Task"} </Text>
                                <span style={{ fontSize: '12px', fontWeight: "400" }}>Nguồn: {resources} </span>
                            </Flex>
                        </Flex>
                        <Button type='text' shape="circle" onClick={() => props.handleOPenChatAI()}><CloseOutlined /></Button>
                    </Flex>
                </Title>
                <Card
                    className={cx("chat-content")}
                    style={{
                        borderRadius: 0
                    }}
                    styles={{
                        body: {
                            padding: "10px",
                            overflow: "auto"
                        },
                    }}
                >
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className={cx("chat-message")}
                            style={{
                                display: 'flex',
                                justifyContent: item.actor == "user" ? 'flex-end' : 'flex-start',
                                marginBottom: '16px',
                            }}
                        >
                            <Space align="start">
                                {item.actor != "user" && (
                                    <Avatar src={"https://img.freepik.com/premium-vector/artificial-intelligence-colorful-tool-symbol-icon-ai-stars-modern-image-generator-app-logo-vector_34480-1595.jpg"}></Avatar>
                                )}
                                <Card
                                    styles={{
                                        body: {
                                            padding: '5px 10px',
                                        }
                                    }}>
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {item.message}
                                    </div>
                                </Card>
                                {item.actor == "user" && (
                                    <></>
                                )}
                            </Space>
                        </div>
                    ))}
                    {loading ? (
                        <Space align="start">
                            <Avatar src="https://img.freepik.com/premium-vector/artificial-intelligence-colorful-tool-symbol-icon-ai-stars-modern-image-generator-app-logo-vector_34480-1595.jpg" />
                            <Card
                                styles={{
                                    body: {
                                        padding: '5px 10px',
                                    }
                                }}
                            >
                                {<Spin />}
                            </Card>
                        </Space>) : (<></>)
                    }
                    <div ref={messagesEndRef} />
                </Card>
                <div className={cx("chat-input")}>
                    <Input.TextArea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập câu hỏi..."
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        spellCheck={false}
                    />
                    <Select
                        style={{ width: 110 }}
                        placeholder="Select an option"
                        defaultValue={"allcard"}
                        onChange={handleChange}
                    >
                        <Select.Option key="allcard" value="allcard">
                            Tất cả
                        </Select.Option>
                        {workspace?.map((workspaceItem: any) =>
                            workspaceItem?.boards?.map((boardItem: any) => (
                                <Select.Option key={boardItem?.board_id} value={boardItem?.board_id}>
                                    {boardItem?.name}
                                </Select.Option>
                            ))
                        )}
                    </Select>

                    <div>
                        <Button type="text" onClick={handleSendMessage} className={cx("btn-send")}>
                            Gửi
                        </Button>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default ChatAI;