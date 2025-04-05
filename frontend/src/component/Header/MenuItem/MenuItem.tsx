import { Avatar, Button, Card, Flex, Input, MenuProps, Space } from "antd";
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IoMdMore } from "react-icons/io";
import { mockData } from "../../../api/mock-data";
import { FiMoreVertical } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const { Text, Title } = Typography


export const worksapcesMenuItem: MenuProps['items'] = [
  {
    label:
      <Text strong style={{ fontSize: "12px" }}>
        Không gian làm việc hiện tại
      </Text>,
    key: '0',
    disabled: true
  },
  {
    label:
      <>
        <Link to="work" >
          <Flex align="center" justify="center" gap={10}>
            <img src="src/assets/image/avatar.jpg" alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
            <Text strong> Các không gian làm việc</Text>
          </Flex>
        </Link >
      </>,
    key: '1',
  },

  {
    type: 'divider',
  },

  {
    label:
      <Text strong style={{ fontSize: "12px" }}>
        Các không gian làm việc của bạn
      </Text>,
    key: '2',
    disabled: true
  },
  {
    label:
      <>
        <Link to="work" >
          <Flex align="center" justify="center" gap={10}>
            <img src="src/assets/image/avatar.jpg" alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
            <Text strong> Các không gian làm việc</Text>
          </Flex>
        </Link >
      </>,
    key: '3',
  },
];

export const starMenuItem: MenuProps['items'] = [
  {
    label:
      <>
        <Space direction="vertical">
          <Link to="work" >
            <Flex align="center" justify="start" gap={10}>
              <img src="src/assets/image/avatar.jpg" alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
              <Flex vertical gap="2px">
                <Text strong> Đồ án 4</Text>
                <Text strong type="secondary" style={{ fontSize: "12px" }}> Không gian làm việc</Text>
              </Flex>
            </Flex>
          </Link >
        </Space>
      </>,
    key: '0',
  },
];

export const recentlyMenuItem: MenuProps["items"] = [
  {
    label:
      <>
        <Link to="work" >
          <Flex align="center" justify="center" gap={10}>
            <img src="src/assets/image/avatar.jpg" alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
            <Text strong> Các không gian làm việc</Text>
          </Flex>
        </Link >
      </>,
    key: '0',
  },
  {
    label:
      <>
        <Link to="work" >
          <Flex align="center" justify="center" gap={10}>
            <img src="src/assets/image/avatar.jpg" alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
            <Text strong> Các không gian làm việc</Text>
          </Flex>
        </Link >
      </>,
    key: '1',
  },
  {
    label:
      <>
        <Link to="work" >
          <Flex align="center" justify="center" gap={10}>
            <img src="src/assets/image/avatar.jpg" alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
            <Text strong> Các không gian làm việc</Text>
          </Flex>
        </Link >
      </>,
    key: '3',
  },
]

export const notificationMenuItem: MenuProps["items"] = [
  {
    label:
      <>
        <Flex justify="space-between" align="center">
          <Title level={4} style={{ marginTop: "10px" }}>Thông Báo</Title>
          <IoMdMore />
        </Flex>
      </>,
    key: '0',
    disabled: true
  },
  {
    type: 'divider',
  },
  ...mockData.board.columns[0].cards.map((item: any, index: any) => ({
    key: `${index + 3}`, // Key bắt đầu từ 3 (bỏ qua 2 phần tử đầu)
    label: (
      <Flex
        style={{
          width: "360px",
          backgroundColor: "gray",
          borderRadius: "5px",
        }}
        vertical
      >
        <Flex
          vertical
          style={{
            backgroundColor: "pink",
            padding: "10px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
          gap="5px"
        >
          <Link to="work" style={{ display: "block", width: "100%" }}>
            <Card
              style={{ width: "100%" }}
              bodyStyle={{
                padding: "10px",
              }}
            >
              <Flex vertical justify="start" gap={10}>
                {item.title}
                <div
                  style={{
                    backgroundColor: "red",
                    width: "fit-content",
                    padding: "2px 5px",
                    borderRadius: "5px",
                  }}
                >
                  {item.date}
                </div>
              </Flex>
            </Card>
          </Link>
          <Flex
            align="center"
            justify="start"
            gap="5px"
            style={{ marginLeft: "8px" }}
          >
            <Text strong>{item.project}:</Text>
            <Text>{item.status}</Text>
          </Flex>
        </Flex>
        <Flex
          gap="5px"
          align="center"
          style={{ marginLeft: "20px", padding: "10px 0" }}
        >
          <Text strong>Nhắc nhở:</Text>
          <Text>{item.reminder}</Text>
        </Flex>
      </Flex>
    ),
  })),

]

export const chatMenuItems = (data: any[], action:(converSation:any)=>void): MenuProps["items"] => [
    {
      label: <>
        <Flex
          style={{
            width: "360px",
            borderRadius: "5px",
          }}
          vertical
        >
          <Flex align="center" gap="10px">
            <Button type="text" shape="circle"><FiMoreVertical /></Button>
            <Input placeholder="Tìm kiếm" prefix={<IoSearchOutline size={15} />} style={{ flex: 1, borderRadius: "100px" }} />
          </Flex>
        </Flex>
      </>,
      key: '0',
      disabled: true
    },
    ...data.map((item, index) => ({
      label: <>
        <Flex
          style={{
            width: "360px",
            borderRadius: "5px",
          }}
          vertical
        >
          <>
            <Flex align="center" gap="20px" onClick={()=>action(item)}>
              {
                item?.avatar ? (
                  <Avatar
                    src={item?.avatar.replace("D:\\DA4\\frontend\\", "")}
                    size="large"

                  />) : (
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    size="large"
                    icon={<UserOutlined />}
                  />)
              }
              <Flex justify="center" align="start" vertical style={{ flex: 1 }}>
                <Title level={5} style={{ margin: "0px" }}>{item.name}</Title>
                <Text strong type="secondary">{item.message}</Text>
              </Flex>
            </Flex>
          </>
        </Flex>
      </>,
      key: `${index}`,
    })),
  ]


export const userMenuItem: MenuProps["items"] = [
  {
    label: <>
      <Text strong>Tài khoản</Text>
    </>,
    key: '0',
    disabled: true
  },
  {
    label: <>
      <Flex
        style={{
          borderRadius: "5px",
          width: "260px",
        }}
        vertical
      >
        <Link to="/login">
          <Text>Đăng xuất </Text>
        </Link>
      </Flex>
    </>,
    key: '1',
  },

]



