import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Typography, Card, Space, Avatar, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import style from "./Chat.module.scss"
import { createMessageAPI, getMessageAPI } from '../../services/Message/Message.service';
import { isArray } from 'lodash';
import decodeJWT from '../../services/Auth/auth.service ';
import { SocketService } from '../../services/Socket/Socket.service';
import EmojiPicker from "emoji-picker-react";

const { Text, Title } = Typography;
const cx = classNames.bind(style)

const ChatApp = (props: any) => {
  const { converSation } = props
  const token = localStorage.getItem('accessToken') as string;
  const userInfo = decodeJWT(token);
  const idUser = userInfo.user_id;
  const [messageData, setMessageData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const socketRef = useRef<any>(null);

  // Call API lấy tin nhắn
  const fetchMessage = async () => {
    const response = await getMessageAPI(converSation.conversation_id as string)
    if (isArray(messageData)) {
      setMessageData(response)
    }
  }

  // Xử lý nhập tin nhắn
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Xử lý gửi tin nhắn
  const handleSendMessage = async () => {
    if (inputValue.trim() && socketRef.current) {
      socketRef.current.emit('send_message', {
        message: inputValue,
        sender_id: idUser as string,
        receive_id: converSation.user_id as string
      });

      // Display user's message in the chat
      setMessageData((prevMessages) => [
        ...prevMessages,
        { message: inputValue, sender_id: idUser as string },
      ]);

      await createMessageAPI({
        sender_id: idUser,
        conversation_id: converSation?.conversation_id,
        message: inputValue
      })

      setInputValue('');
    }
  };


  console.log(messageData);

  // load tin nhắn
  useEffect(() => {
    try {
      socketRef.current = SocketService.connect();
      socketRef.current.on('receive_message', (data: { message: string, sender_id: string, receive_id: string }) => {
        setMessageData((prevMessages) => [
          ...prevMessages,
          { message: data.message, sender_id: data.sender_id },
        ]);
      });

      scrollToBottom();

      return () => {
        socketRef.current.off('receive_message');
      };

    } catch (error) {
      console.error(error);
    }
  }, [messageData]);

  // Mở hộp thoại
  useEffect(() => {
    fetchMessage()
  }, [converSation?.conversation_id])

  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Trạng thái mở Emoji Picker

  const handleEmojiClick = (emojiObject: any) => {
    // Thêm emoji vào nội dung tin nhắn
    setInputValue((prevContent) => prevContent + emojiObject.emoji);
  };

  return (
    <div className={cx("chat")}>
      <Title level={5} style={{ margin: "10px" }}>
        <Flex justify="space-between" style={{ width: "100%" }} align='center'>
          <Flex gap={"10px"} align='center'>
            <Avatar src={converSation?.avatar?.replace("D:\\DA4\\frontend\\", "")} ></Avatar>
            {converSation.name}
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
        {messageData?.map((msg, index) => (
          <div
            key={index}
            className={cx("chat-message")}
            style={{
              display: 'flex',
              justifyContent: msg.sender_id == idUser ? 'flex-end' : 'flex-start',
              marginBottom: '16px',
            }}
          >
            <Space align="start">
              {msg.sender_id != idUser && (
                <Avatar title={msg.created_at} src={converSation?.avatar?.replace("D:\\DA4\\frontend\\", "")}></Avatar>
              )}
              <Card
                styles={{
                  body: {
                    padding: '5px 10px',
                    maxWidth: "200px"
                  }
                }}>
                <Text>{msg.message}</Text>
              </Card>
              {msg.sender_id == idUser && (
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
          placeholder="Nhập tin nhắn..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          spellCheck={false}
        />
        <div>
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
          <Button type="text" onClick={handleSendMessage} className={cx("btn-send")}>
            Gửi
          </Button>
        </div>
      </div>
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <EmojiPicker
        onEmojiClick={handleEmojiClick}
        width="100%"
        height="100%"
        style={{ 
          '--epr-emoji-size': '20px'
        }}
      />
      )}
    </div>
  );
};

export default ChatApp;