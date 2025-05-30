import { Avatar, Button, Card, Flex, Input, MenuProps, Space } from "antd";
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { FullscreenOutlined, UserOutlined } from '@ant-design/icons';
import { IoMdMore } from "react-icons/io";
import { mockData } from "../../../api/mock-data";
import { FiMoreVertical } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { URL } from "../../../utils/url";
import { logout } from "../../../services/User/user.service";

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

const regex = /^([^,]+),(\d+),([^,]+),(\d+)\s(.+)$/;

function parseInput(input: string): any {
  const match = input.match(regex);
  if (match) {
    return {
      workspaceName: match[1].trim(),
      workspaceId: parseInt(match[2], 10),
      tableName: match[3].trim(),
      tableId: parseInt(match[4], 10),
      message: match[5].trim(),
    };
  }
  return null;
}

const extractLink = (input: string): { content: string; link: string | null } => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const match = input.match(linkRegex);

  if (match) {
    const link = match[0];
    const content = input
      .replace(linkRegex, "")
      .replace(/link:/i, "")
      .trim();
    return {
      content,
      link,
    };
  }

  return {
    content: input.replace(/link:/i, "").trim(),
    link: null,
  };
};

export const notificationMenuItems = (data: any[]): MenuProps["items"] => [
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
  ...data.map((item: any, index: any) => {
    const parsed = parseInput(item.message);
    if (!parsed) {
      const parsed = extractLink(item.message);
      return {
        key: `${index + 3}`,
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
              <a href={parsed.link || "#"} target="_blank" rel="noopener noreferrer">
                <Card
                  style={{ width: "100%" }}
                  bodyStyle={{
                    padding: "10px",
                  }}
                >
                  <Text strong>Tham gia cuộc họp</Text>
                  <Flex vertical justify="start" gap={10}>
                    <div
                      style={{
                        backgroundColor: "red",
                        width: "fit-content",
                        padding: "2px 5px",
                        borderRadius: "5px",
                      }}
                    >
                      {parsed.content}
                    </div>
                  </Flex>
                </Card>
              </a >
            </Flex>
          </Flex>
        ),
      };
    }

    return {
      key: `${index + 3}`,
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
            {
              parsed.tableId === 0 ? (
                <Link
                  to={URL.WORKSPACE.BUILDER.TABLE(parsed.workspaceId)}
                  style={{ display: "block", width: "100%" }}
                >
                  <Card
                    style={{ width: "100%" }}
                    bodyStyle={{
                      padding: "10px",
                    }}
                  >

                    <Text strong>{parsed.workspaceName}</Text>
                    <Flex vertical justify="start" gap={10}>
                      <div
                        style={{
                          backgroundColor: "red",
                          width: "fit-content",
                          padding: "2px 5px",
                          borderRadius: "5px",
                        }}
                      >
                        {parsed.message}
                      </div>
                    </Flex>
                  </Card>
                </Link>
              ) : (
                <Link
                  to={URL.BOARD.BUILDER.LIST(parsed.workspaceId, parsed.tableId)}
                  style={{ display: "block", width: "100%" }}
                >
                  <Card
                    style={{ width: "100%" }}
                    bodyStyle={{
                      padding: "10px",
                    }}
                  >

                    <Text strong>{parsed.tableName}</Text>
                    <Flex vertical justify="start" gap={10}>
                      <div
                        style={{
                          backgroundColor: "red",
                          width: "fit-content",
                          padding: "2px 5px",
                          borderRadius: "5px",
                        }}
                      >
                        {parsed.message}
                      </div>
                    </Flex>
                  </Card>
                </Link>
              )
            }

          </Flex>
        </Flex>
      ),
    };
  }),
  {
    label:
      <>
        <div style={{ height: "30px" }}>
        </div>
      </>,
    key: '0',
    disabled: true
  },
]

export const chatMenuItems = (data: any[], action: (converSation: any) => void): MenuProps["items"] => [
  {
    label: <>
      <Flex
        style={{
          width: "360px",
          borderRadius: "5px",
        }}
        vertical
      >
        <Flex align="center" justify="space-between">
          <Title level={4}>Đoạn chat</Title>
          <Link to={URL.HOME.MESSAGE}>
            <Button type="text" shape="circle">
              <FullscreenOutlined />
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>,
    key: '0',
    disabled: false
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
          <Flex align="center" gap="20px" onClick={() => action(item)}>
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

const handleLogout = async () => {
  localStorage.clear();
  window.location.href = URL.AUTH.LOGIN;
  await logout();
};

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
        <Link to={URL.AUTH.LOGIN}
          onClick={() => {
            handleLogout();
          }}>
          <Text>Đăng xuất </Text>
        </Link>
      </Flex>
    </>,
    key: '1',
  },

];



