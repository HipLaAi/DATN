import React, { useEffect, useState } from 'react';
import { createMeet, getAuthUrl } from '../../services/Meeting/Meeting.service';
import { Avatar, Button, Col, Flex, Input, List, Modal, Spin, Tag, Typography } from 'antd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../component/ui/tabs';
import { PlusCircleOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import { useDebounce } from '@uidotdev/usehooks';
import { search } from '../../services/User/user.service';
import { createNotificationAPI } from '../../services/Notification/Notification.service';

const { Text, Title } = Typography;

const VideoCallComponent: React.FC = () => {
  const getCurrentDateTime = (): string => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const vnDate = new Date(utc + 7 * 3600000);
    const year = vnDate.getFullYear();
    const month = String(vnDate.getMonth() + 1).padStart(2, '0');
    const day = String(vnDate.getDate()).padStart(2, '0');
    const hours = String(vnDate.getHours()).padStart(2, '0');
    const minutes = String(vnDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getCurrentDateTimePlusOneHour = (): string => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    let vnDate = new Date(utc + 7 * 3600000);
    vnDate = new Date(vnDate.getTime() + 1 * 3600000);
    const year = vnDate.getFullYear();
    const month = String(vnDate.getMonth() + 1).padStart(2, '0');
    const day = String(vnDate.getDate()).padStart(2, '0');
    const hours = String(vnDate.getHours()).padStart(2, '0');
    const minutes = String(vnDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const today = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [summary, setSummary] = useState(today);
  const [startTime, setStartTime] = useState(getCurrentDateTime);
  const [endTime, setEndTime] = useState(getCurrentDateTimePlusOneHour);
  const [meetLink, setMeetLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchEmail, 500);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const userName = localStorage.getItem('name') as string;

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

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      fetchSearchUser(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleItemClick = (item: any) => {
    const isSelected = selectedUsers.some(user => user.email === item.email);

    if (!isSelected) {
      setSelectedUsers([...selectedUsers, item]);
    }

    setSearchEmail("");
  };

  const handleRemoveUser = (email: string) => {
    setSelectedUsers(selectedUsers.filter(user => user.email !== email));
  };

  const handleAuth = async () => {
    try {
      const authUrl = await getAuthUrl();
      window.open(authUrl, 'GoogleAuth', 'width=500,height=600');
    } catch (error) {
      console.error('Failed to get auth URL:', error);
    }
  };

  const creatMeet = async () => {
    try {
      const emails = selectedUsers.map(user => ({ email: user.email }));
      const link = await createMeet({ summary, startTime, endTime, attendees: emails });
      setMeetLink(link);
      setIsModalOpen(true);

      for (const item of selectedUsers) {
        await createNotificationAPI({
          user_id: item?.user_id.toString(),
          message: `${userName} đã mời bạn tham gia vào cuộc họp được diễn ra từ ${startTime} đến ${endTime} link: ${link}`
        })

      }

    } catch (error) {
      console.error('Failed to create meeting:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleAuth();
      await delay(1000);
      await creatMeet();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalInvite = () => {
    setModal(false);
  };

  return (
    <>
      <Flex style={{ padding: "20px", height: "500px" }} align="center" justify="center" gap={40}>

        <Flex vertical style={{ width: "40%" }}>
          <Flex vertical style={{ padding: "20px" }}>
            <Title level={2}>Tính năng họp và gọi video dành cho tất cả mọi người</Title>
            <Text strong>Kết nối, cộng tác ở mọi nơi</Text>
          </Flex>
          <Input.Search
            placeholder="Nhập đường liên kết"
            style={{ padding: "0 15px 10px" }}
            onPressEnter={(e: any) => {
              const url = e.target.value;
              if (url) {
                window.open(url, "_blank", "noopener,noreferrer");
              }
            }}
          />
        </Flex>

        <Flex vertical style={{ width: "40%", height: "100%", marginTop: "300px" }}>
          <Tabs defaultValue="quickly" >
            <TabsList style={{ width: "100%", justifyContent: "center" }}>
              <TabsTrigger style={{ fontSize: "24px" }} value="quickly" className="focus:outline-none focus:underline transition-all duration-300">
                Tạo nhanh
              </TabsTrigger>
              <TabsTrigger style={{ fontSize: "24px" }} value="custom" className="focus:outline-none focus:underline transition-all duration-300">
                Tùy chỉnh
              </TabsTrigger>
            </TabsList>
            <TabsContent value="quickly" style={{ width: "100%", justifyContent: "center", display: "flex" }}>
              <Button
                onClick={handleSubmit}
                icon={<VideoCameraAddOutlined />}
                loading={isLoading}
              >
                Tạo cuộc họp mới
              </Button>
            </TabsContent>
            <TabsContent value="custom">
              <Flex vertical gap={10}>
                <Col>
                  <Title level={5}>Tiêu đề cuộc họp</Title>
                  <Input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                  ></Input>
                </Col>
                <Col>
                  <Title level={5}>Thời gian bắt đầu</Title>
                  <Input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  ></Input>
                </Col>
                <Col>
                  <Title level={5}>Thời gian kết thúc</Title>
                  <Input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  ></Input>
                </Col>
                <Col>
                  <Title level={5}>Mời người tham gia</Title>
                  <Flex wrap gap="10px" style={{ marginBottom: '10px' }}>
                    <Button icon={<PlusCircleOutlined />} onClick={() => setModal(true)}></Button>
                    {selectedUsers.map(user => (
                      <Tag
                        key={user.email}
                        closable
                        onClose={() => handleRemoveUser(user.email)}
                        style={{ cursor: 'pointer', padding: " 5px 10px" }}
                      >
                        <Text strong>{user.name}</Text>
                      </Tag>
                    ))}
                  </Flex>
                </Col>
                <Flex style={{ width: "100%", justifyContent: "center" }}>
                  <Button loading={isLoading} type="primary" onClick={handleSubmit} icon={<VideoCameraAddOutlined />}>Tạo cuộc họp mới</Button>
                </Flex>
              </Flex>
              {/* <div className="mt-6 p-4 border rounded w-80">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Tiêu đề cuộc họp:</label>
                    <input
                      type="text"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="border p-2 rounded w-full"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Thời gian bắt đầu:</label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="border p-2 rounded w-full"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Thời gian kết thúc:</label>
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="border p-2 rounded w-full"
                      required
                    />
                  </div>

                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Tạo cuộc họp
                  </button>
                </form> */}



              {/* {meetLink && (
                  <div className="mt-4">
                    <p>Link cuộc họp:</p>
                    <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      {meetLink}
                    </a>
                  </div>
                )} */}
              {/* </div> */}
            </TabsContent>
            {meetLink && (
              <Modal
                title="Tham gia cuộc họp"
                visible={isModalOpen}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                footer={[
                  <Button key="close" type="primary" onClick={handleCloseModal}>
                    Đóng
                  </Button>,
                ]}
              >
                <p style={{ marginBottom: "20px" }}>Hãy gửi đường liên kết này tới những người mà bạn muốn họp cùng. Bạn nhớ lưu lại đường liên kết để có thể sử dụng sau.</p>
                <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {meetLink}
                </a>
              </Modal>
            )}

            <Modal
              title={
                <Flex justify="center">
                  <Title level={4} style={{ margin: "8px" }}>Mời tham gia cuộc họp</Title>
                </Flex>
              }
              open={modal}
              onCancel={handleCloseModalInvite}
              footer={null}
            >
              <Flex vertical align="center">
                <Flex wrap gap="10px" style={{ marginBottom: '10px' }}>
                  {selectedUsers.map(user => (
                    <Tag
                      key={user.email}
                      closable
                      onClose={() => handleRemoveUser(user.email)}
                      style={{ cursor: 'pointer', padding: " 5px 10px" }}
                    >
                      <Text strong>{user.name}</Text>
                    </Tag>
                  ))}
                </Flex>
                <Flex gap="10px" style={{ width: "100%" }}>
                  <Input
                    placeholder="Địa chỉ email"
                    style={{ width: "100%" }}
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                  {
                    (selectedUsers.length > 0) && <Button type='primary'>Mời</Button>
                  }
                </Flex>


                {!loading ? (
                  debouncedSearch.length > 2 && (
                    <List
                      style={{ width: "100%" }}
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item: any) => (
                        <List.Item onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                          <Flex align='center' gap="10px">
                            <Avatar src={item.avatar} />
                            <Text strong>{item.name}</Text>
                          </Flex>
                        </List.Item>
                      )}
                    />
                  )
                ) : (
                  <Spin style={{ marginTop: "10px" }} />
                )}
              </Flex>
            </Modal>
          </Tabs>
        </Flex>

      </Flex>
    </>
  );
};

export default VideoCallComponent;
