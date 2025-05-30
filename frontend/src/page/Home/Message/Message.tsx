import { Flex, Layout, List, Avatar, Input, Button, Typography, Space, Badge, Spin } from "antd";
import { SendOutlined, MoreOutlined, PhoneOutlined, InfoCircleOutlined, PaperClipOutlined, SmileOutlined, WechatOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { converSationAPI, createconverSationAPI } from "../../../services/ConverSation/Conversation.sevice";
import { isArray } from "lodash";
import { createMessageAPI, getMessageAPI } from "../../../services/Message/Message.service";
import decodeJWT from "../../../services/Auth/auth.service ";
import { SocketService } from "../../../services/Socket/Socket.service";
import EmojiPicker from "emoji-picker-react";
import { useDebounce } from "@uidotdev/usehooks";
import { search } from "../../../services/User/user.service";

const { Sider, Content } = Layout;
const { Text, Title } = Typography;

const ChatComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [converSation, setConverSation] = useState<any[]>([]);
  const [message, setMessage] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>();
  const [idUser, setIdUser] = useState<any>();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const socketRef = useRef<any>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const debouncedSearch = useDebounce(searchEmail, 500);
  const [data, setData] = useState<any[]>([]);

  // Call API lấy các cuộc hội thoại
  const fetchMenuData = async () => {
    try {
      const response = await converSationAPI();
      if (response) {
        setConverSation(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Call API lấy tin nhắn
  const fetchMessage = async () => {
    if (activeConversation) {
      try {
        const response = await getMessageAPI(activeConversation?.conversation_id)
        setMessage(response)
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Xử lý gửi tin nhắn
  const handleSendMessage = async () => {
    if (inputValue.trim() && socketRef.current) {
      socketRef.current.emit('send_message', {
        message: inputValue,
        sender_id: idUser as string,
        receive_id: activeConversation?.user_id as string
      });

      // Display user's message in the chat
      setMessage((prevMessages) => [
        ...prevMessages,
        { message: inputValue, sender_id: idUser as string },
      ]);

      await createMessageAPI({
        sender_id: idUser,
        conversation_id: activeConversation?.conversation_id,
        message: inputValue
      })

      setInputValue('');
    }
  };

  // Thêm emoji vào nội dung tin nhắn
  const handleEmojiClick = (emojiObject: any) => {
    setInputValue((prevContent) => prevContent + emojiObject.emoji);
  };

  //Tạo hội thoại với người dùng mới
  const handleCreateConversation = async (userID: any) => {
    const reponse = await createconverSationAPI({
      user_id_1: idUser,
      user_id_2: userID
    })
    setActiveConversation(reponse || []);
    setSearchEmail("");
    fetchMenuData();
  };

  // Call API tìm kiếm người dùng
  const fetchSearchUser = async (debouncedSearch: any) => {
    setLoading(true);
    try {
      const response = await search({ email: debouncedSearch });
      setData(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // load tìm kiếm user
  useEffect(() => {
    if (debouncedSearch.length > 2) {
      fetchSearchUser(debouncedSearch);
    }
  }, [debouncedSearch]);

  // load tin nhắn
  useEffect(() => {
    try {
      socketRef.current = SocketService.connect();
      socketRef.current.on('receive_message', (data: { message: string, sender_id: string, receive_id: string }) => {
        setMessage((prevMessages) => [
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
  }, [message]);

  //load tin nhắn đầu tin
  useEffect(() => {
    fetchMessage();
  }, [activeConversation]);

  // load id người dùng hiện tại
  useEffect(() => {
    fetchMenuData();
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userInfo = decodeJWT(token);
      setIdUser(userInfo?.user_id);
    }
  }, []);

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Sidebar bên trái */}
      <Sider width={300} style={{ backgroundColor: "#fff", borderRight: "1px solid #f0f0f0" }}>
        <Title level={5} style={{ padding: "10px 15px" }}>
          Đoạn chat
        </Title>
        <Input.Search
          placeholder="Tìm kiếm trên người dùng"
          style={{ padding: "0 15px 10px" }}
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        {
          debouncedSearch.length > 2 ? (
            <List
              style={{ width: "100%" }}
              itemLayout="horizontal"
              dataSource={Array.isArray(data) ? data : []}
              renderItem={(item: any) => (
                <List.Item
                  style={{ padding: "10px 15px", cursor: "pointer" }}
                  onClick={() => handleCreateConversation(item?.user_id)}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item?.avatar} />}
                    title={<Text>{item?.name}</Text>}
                  />
                </List.Item>
              )}
            />
          ) : (
            <List
              dataSource={Array.isArray(converSation) ? converSation : []}
              renderItem={(item) => (
                <List.Item
                  style={{ padding: "10px 15px", cursor: "pointer" }}
                  onClick={() => setActiveConversation(item)}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item?.avatar} />}
                    title={<Text>{item?.name}</Text>}
                    description={<Text type="secondary">{item?.message}</Text>}
                  />
                  <Text type="secondary">
                    {new Date(item?.created_at).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                    })}
                  </Text>
                </List.Item>
              )}
            />
          )
        }
      </Sider>

      {/* Khu vực chat chính */}
      <Layout style={{ height: "94vh" }}>
        {
          activeConversation ? (
            <Content style={{ backgroundColor: "#e5e7eb", display: "flex", flexDirection: "column" }}>
              <Flex justify="space-between" align="center" style={{ padding: "10px 15px", backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0" }}>
                <Flex align="center" gap={10}>
                  <Avatar src={activeConversation?.avatar} />
                  <Flex vertical>
                    <Title level={5} style={{ margin: 0 }}>
                      {activeConversation?.name}
                    </Title>
                    <Text>{activeConversation?.email}</Text>
                  </Flex>
                  {/* <Badge dot style={{ color: "#52c41a" }} /> */}
                </Flex>
                {/* <Space>
              <Button type="text" icon={<PhoneOutlined />} />
              <Button type="text" icon={<InfoCircleOutlined />} />
              <Button type="text" icon={<MoreOutlined />} />
            </Space> */}
              </Flex>

              <div style={{ flex: 1, padding: "20px", overflowY: "auto"}}>
                {/* <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: "20px" }}>
              1 ngày
            </Text> */}
                {message.map((msg) => (
                  <div
                    key={msg?.message_id}
                    style={{
                      display: "flex",
                      justifyContent: msg.sender_id === idUser ? "flex-end" : "flex-start",
                      marginBottom: "10px",
                    }}
                  >
                    {(msg?.sender_id != idUser) && <Avatar src={activeConversation?.avatar} style={{ marginRight: "10px" }} />}
                    <div
                      style={{
                        maxWidth: "60%",
                        padding: "8px 12px",
                        borderRadius: "15px",
                        backgroundColor: msg.isMe ? "#1890ff" : "#fff",
                        color: msg.isMe ? "#fff" : "#000",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Text>{msg.message}</Text>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <Flex align="center" gap={10} style={{ padding: "10px 15px", backgroundColor: "#fff", borderTop: "1px solid #f0f0f0" }}>
                {/* <Button type="text" icon={<PaperClipOutlined />} /> */}
                <Input
                  placeholder="Aa"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onPressEnter={handleSendMessage}
                  style={{ flex: 1, borderRadius: "20px" }}
                />
                <Button type="text" icon={<SmileOutlined />} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                <Button type="primary" shape="circle" icon={<SendOutlined />} onClick={handleSendMessage} />
              </Flex>
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width="100%"
                  height="60%"
                  style={{
                    '--epr-emoji-size': '30px'
                  }}
                />
              )}
            </Content>
          ) : (
            <Flex vertical gap={10} justify="center" align="center" style={{ height: "100%", color: "gray" }}>
              <WechatOutlined style={{ fontSize: "100px" }} />
              <Title level={3} style={{ color: "gray" }}>Chưa chọn đoạn chat nào</Title>
            </Flex>
          )
        }

      </Layout>

      {/* Panel thông tin bên phải */}
      <Sider width={300} style={{ backgroundColor: "#fff", borderLeft: "1px solid #f0f0f0" }}>
        <Flex justify="center" align="center" style={{ padding: "20px 15px", borderBottom: "1px solid #f0f0f0" }}>
          <Avatar src={activeConversation?.avatar} size={60} />
        </Flex>
        <Title level={4} style={{ textAlign: "center", margin: 0 }}>
          {activeConversation?.name}
        </Title>
        <Title level={5} style={{ textAlign: "center", margin: 0 }}>
          {activeConversation?.email}
        </Title>
        <List
          style={{ padding: "10px 15px" }}
          dataSource={[
            { label: "Được mã hóa đầu cuối" },
            { label: "Trang cá nhân", icon: <InfoCircleOutlined /> },
            { label: "Tắt thông báo", icon: <MoreOutlined /> },
            { label: "Tìm kiếm", icon: <MoreOutlined /> },
            { label: "Thông tin về đoạn chat", icon: <MoreOutlined /> },
            { label: "Tùy chỉnh đoạn chat", icon: <MoreOutlined /> },
            { label: "File phương tiện & file", icon: <MoreOutlined /> },
            { label: "Quyền riêng tư và trợ giúp", icon: <MoreOutlined /> },
          ]}
          renderItem={(item) => (
            <List.Item style={{ border: "none" }}>
              <Space>
                {item.icon && item.icon}
                <Text>{item.label}</Text>
              </Space>
            </List.Item>
          )}
        />
      </Sider>
    </Layout>
  );
};

export default ChatComponent;