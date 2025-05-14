import { Flex, Layout, List, Avatar, Input, Button, Typography, Space, Badge } from "antd";
import { SendOutlined, MoreOutlined, PhoneOutlined, InfoCircleOutlined, PaperClipOutlined, SmileOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Sider, Content } = Layout;
const { Text, Title } = Typography;

// Dữ liệu giả lập cho danh sách chat và tin nhắn
const chatList = [
  { id: 1, name: "Vũ Minh Non", message: "Bận chứ, 11 phút", avatar: "https://via.placeholder.com/40", time: "11 phút" },
  { id: 2, name: "Nhóm Nhữ Lỡ", message: "Vì sao thế béo: Toán đi lùa g...", time: "17 giờ", avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Trình Thu Hằng", message: "Thẻ để tết ngố làm việc lên bạn...", time: "19 giờ", avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "Hằng: va nhừng nguồn đi bạn", message: "Xem đáp thử chương trình kkk: 1 ngày", time: "1 ngày", avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "Tuấn Anh", message: "Đây bạn chs day", time: "2 ngày", avatar: "https://via.placeholder.com/40" },
  { id: 6, name: "Hoàng Nam", message: "Đà bây tơ cảm xúc về tin nhắn...", time: "3 ngày", avatar: "https://via.placeholder.com/40" },
  { id: 7, name: "Bín", message: "Bận lộ hết tây cư tơ r 4 ngày", time: "4 ngày", avatar: "https://via.placeholder.com/40" },
];

const messages = [
  { id: 1, sender: "Vũ Minh Non", content: "k thấy hôm qua 3 trận thông ak", time: "1 ngày", isMe: false },
  { id: 2, sender: "Me", content: "chs thường ok k thế hiện đâu đậm cấp", isMe: true },
  { id: 3, sender: "Me", content: "Lên rank đi chs nè mỗi kịch tính", isMe: true },
  { id: 4, sender: "Vũ Minh Non", content: "có chút clb", isMe: false },
  { id: 5, sender: "Me", content: "hay lại xuống vàng 2 thế này giới bị", isMe: true },
  { id: 6, sender: "Me", content: "trình là gì", isMe: true },
];

const ChatComponent = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Sidebar bên trái */}
      <Sider width={300} style={{ backgroundColor: "#fff", borderRight: "1px solid #f0f0f0" }}>
        <Title level={5} style={{ padding: "10px 15px" }}>
          Đoạn chat
        </Title>
        <Input.Search placeholder="Tìm kiếm trên Messenger" style={{ padding: "0 15px 10px" }} />
        <List
          dataSource={chatList}
          renderItem={(item) => (
            <List.Item style={{ padding: "10px 15px", cursor: "pointer" }}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text>{item.name}</Text>}
                description={<Text type="secondary">{item.message}</Text>}
              />
              <Text type="secondary">{item.time}</Text>
            </List.Item>
          )}
        />
      </Sider>

      {/* Khu vực chat chính */}
      <Layout>
        <Content style={{ backgroundColor: "#e5e7eb", display: "flex", flexDirection: "column" }}>
          <Flex justify="space-between" align="center" style={{ padding: "10px 15px", backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0" }}>
            <Flex align="center" gap={10}>
              <Avatar src="https://via.placeholder.com/40" />
              <Title level={5} style={{ margin: 0 }}>
                Vũ Minh Non
              </Title>
              <Badge dot style={{ color: "#52c41a" }} />
            </Flex>
            <Space>
              <Button type="text" icon={<PhoneOutlined />} />
              <Button type="text" icon={<InfoCircleOutlined />} />
              <Button type="text" icon={<MoreOutlined />} />
            </Space>
          </Flex>

          <div style={{ flex: 1, padding: "20px", overflowY: "auto", backgroundImage: "url('https://via.placeholder.com/800x600?text=Background')", backgroundSize: "cover" }}>
            <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: "20px" }}>
              1 ngày
            </Text>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.isMe ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                {!msg.isMe && <Avatar src="https://via.placeholder.com/30" style={{ marginRight: "10px" }} />}
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
                  <Text>{msg.content}</Text>
                </div>
              </div>
            ))}
          </div>

          <Flex align="center" gap={10} style={{ padding: "10px 15px", backgroundColor: "#fff", borderTop: "1px solid #f0f0f0" }}>
            <Button type="text" icon={<PaperClipOutlined />} />
            <Input
              placeholder="Aa"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSendMessage}
              style={{ flex: 1, borderRadius: "20px" }}
            />
            <Button type="text" icon={<SmileOutlined />} />
            <Button type="primary" shape="circle" icon={<SendOutlined />} onClick={handleSendMessage} />
          </Flex>
        </Content>
      </Layout>

      {/* Panel thông tin bên phải */}
      <Sider width={300} style={{ backgroundColor: "#fff", borderLeft: "1px solid #f0f0f0" }}>
        <Flex justify="center" align="center" style={{ padding: "20px 15px", borderBottom: "1px solid #f0f0f0" }}>
          <Avatar src="https://via.placeholder.com/60" size={60} />
        </Flex>
        <Title level={5} style={{ textAlign: "center", margin: 0 }}>
          Vũ Minh Non
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