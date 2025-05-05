import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Typography, Card, Space, Avatar, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import style from "./ChatAI.module.scss";
import Draggable from 'react-draggable';
import { chatAIAPI } from '../../../services/Chat/Chat.service';

const { Text, Title } = Typography;
const cx = classNames.bind(style)

const ChatAI = (props: any) => {

    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState<any[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setData((preve) => [...preve, { actor: "user", message: inputValue }]);
            setInputValue('');
            handleSendMessage();
        }
    };

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        const result = await chatAIAPI({request: inputValue});
        setData((preve) => [...preve, { actor: "ai", message: result }]);
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
                            <Avatar src={"data:image/png;base64,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"} ></Avatar>
                            {"Task"}
                        </Flex>
                        <Button type='text' shape="circle" onClick={() => props.setIsOpenChat(false)}><CloseOutlined /></Button>
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
                                    <Avatar src={"data:image/png;base64,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"}></Avatar>
                                )}
                                <Card
                                    styles={{
                                        body: {
                                            padding: '5px 10px',
                                        }
                                    }}>
                                    <Text>{item.message}</Text>
                                </Card>
                                {item.actor == "user" && (
                                    <></>
                                )}
                            </Space>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </Card>
                <div className={cx("chat-input")}>
                    <Input.TextArea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        spellCheck={false}
                    />
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