import { Col, Row, Flex, Button, Dropdown, Avatar, Typography, Menu, Radio, Space } from "antd";
import style from './BoardBar.module.scss';
import classNames from "classnames/bind";
import { FaRegStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { DeleteOutlined, DeleteRowOutlined, InfoCircleOutlined, MailOutlined, MessageOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import CustomPop from "../../../component/PopConfirm/PopConfirm";
import { useEffect, useState } from "react";
import ModalCreateGuest from "../Modal/ModalCreateGuest";
import { search } from "../../../services/User/user.service";
import { createGuestdAPI, deleteBoardAPI, deleteGuestAPI } from "../../../services/Board/board.sevice";

const cx = classNames.bind(style);
const { Title, Text } = Typography


const BoardBar = (props: any) => {
  const { idWorkspace, id } = useParams()
  const { board } = props;
  const [guest, setGuest] = useState(props.board?.guest);
  const [openModal, setOpenModal] = useState(false);
  const userName = localStorage.getItem("user_name");
  const userID = localStorage.getItem("user_id");

  const { handleFillter, handleCreateConversation } = useOutletContext<{ handleFillter: any, handleCreateConversation: any }>();
  const [selectedValue, setSelectedValue] = useState<number | string | null>("");

  const handleReset = () => {
    props.setCheckUpdateColumn((value: any) => !value);
    setSelectedValue("");
    handleFillter(id, "");
  }

  const handleSelect = (id: any, value: any) => {
    setSelectedValue(value);
    handleFillter(id, value);
  };

  useEffect(() => {
    setGuest(props.board?.guest);
  }, [props.board?.guest])

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleCreateMember = async (selectedUsers: any) => {
    const response = await createGuestdAPI({
      user_id: selectedUsers.map((item: any) => item.user_id).toString(),
      board_id: id
    })
    const newGuest = [...guest]
    newGuest.push(response);
    setGuest(newGuest);
    handleOpenModal();
  }

  const navigate = useNavigate();

  const handleDeleteGuest = async () => {
    await deleteGuestAPI(id, {
      user_id: userID
    })
    navigate("/");
  }

  const handleDeleteBoard = async () => {
    await deleteBoardAPI(id);
    navigate("/");
  }

  return (
    <>
      <ModalCreateGuest
        handleOpenModal={handleOpenModal}
        openModal={openModal}
        loading={loading}
        data={data}
        handleCreateMember={handleCreateMember}
        fetchSearchUser={fetchSearchUser} />
      <Row justify='space-around' className={cx('board-bar')}>
        <Col span={10}>
          <Flex align="center" gap={10}>
            <Title level={4} style={{ margin: "8px" }} editable>{board?.name}</Title>
            <FaRegStar size={18} />
            <IoPeople size={18} />
            <Link to={"/workspace/" + idWorkspace + "/board/" + id}>
              <Button type="text">
                <Text strong>Bảng</Text>
              </Button>
            </Link>
            <Link to={"/workspace/" + idWorkspace + "/board/" + id + "/table"}>
              <Button type="text">
                <Text strong>Hàng</Text>
              </Button>
            </Link>
            <Link to={"/workspace/" + idWorkspace + "/board/" + id + "/calender"}>
              <Button type="text">
                <Text strong>Lịch</Text>
              </Button>
            </Link>
            <Link to={"/workspace/" + idWorkspace + "/board/" + id + "/dashboard"}>
              <Button type="text">
                <Text strong>Bảng điều khiển</Text>
              </Button>
            </Link>
          </Flex>
        </Col>
        <Col span={13}>
          <Flex justify="end" align="center" gap={5}>
            {/* <Dropdown trigger={['click']}>
              <Button type="text" shape="circle">
                <MdOutlineRocket size={18} />
              </Button>
            </Dropdown> */}
            <CustomPop title={<>
              <Flex justify="center">
                <Text>Lọc</Text>
              </Flex>
            </>} content={
              <>
                <Flex vertical gap="10px" style={{ marginBottom: "20px" }}>
                  <Text strong>Thành viên</Text>
                  <Radio.Group
                    value={selectedValue}
                    onChange={(e) => handleSelect(id, e.target.value)}>
                    <Space direction="vertical">
                      <Radio value={null}>
                        <Flex justify="center" gap="10px" align="center">
                          <Avatar icon={<UserOutlined />} />
                          <Text>Không có thành viên tham gia</Text>
                        </Flex>
                      </Radio>
                      {
                        guest?.map((item: any, index: any) => (
                          <Radio value={item.user_id}>
                            <Flex justify="center" gap="10px" align="center">
                              <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                              {item.name}
                            </Flex>
                          </Radio>
                        ))
                      }
                    </Space>
                  </Radio.Group>
                </Flex>
                <Flex vertical gap="10px">
                  <Button
                    color="default" variant="filled"
                    onClick={handleReset}>
                    Bỏ lọc
                  </Button>
                </Flex>

              </>
            } >
              <Button type="text" title="Bộ lọc">
                <IoFilterSharp size={18} />
                <Text strong>Bộ lọc</Text>
              </Button>
            </CustomPop>


            <Button type="text" shape="circle" onClick={() => handleOpenModal()} title="Mời tham gia">
              <PlusOutlined size={18} />
            </Button>

            {/* <Avatar.Group>
              {
                guest?.map((item: any) => (
                  <Tooltip title={item?.name} placement="top">
                    <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                  </Tooltip>
                ))
              }

            </Avatar.Group> */}


            <Avatar.Group>
              {
                guest?.map((item: any) => (
                  item.user_id != userID ? (
                    <CustomPop title=""
                      content={
                        <>
                          <Menu
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={[
                              {
                                key: '0',
                                label: <>
                                  <Flex justify="center">
                                    <Text strong>{item.name}</Text>
                                  </Flex>
                                  <Flex justify="center">
                                    <Text strong>{item.email}</Text>
                                  </Flex>
                                </>,
                                disabled: true
                              },
                              {
                                type: "divider"
                              },
                              {
                                key: '1',
                                label: "",
                                type: "group",
                                children: [
                                  {
                                    key: '2',
                                    icon: <MessageOutlined size={18} />,
                                    label:
                                      <>
                                        <Flex style={{ width: "100%", height: "100%", cursor: "pointer" }}
                                          onClick={() => handleCreateConversation(item.user_id)}>
                                          <Text>Nhắn tin</Text>
                                        </Flex>
                                      </>,
                                  }
                                ]
                              }

                            ]}
                          />
                        </>
                      }>
                      <Button type="text" shape="circle" title={item?.name}>
                        <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                      </Button>
                    </CustomPop>
                  ) : (
                    <>
                      <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                    </>
                  )
                ))
              }
            </Avatar.Group>
            <CustomPop title=""
              content={
                <>
                  <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={[
                      {
                        key: '0',
                        label: <>
                          <Flex justify="center">
                            <Text strong>Menu</Text>
                          </Flex>
                        </>,
                        disabled: true
                      },
                      {
                        type: "divider"
                      },
                      {
                        key: '1',
                        label: "",
                        type: "group",
                        children: [
                          {
                            key: '2',
                            icon: <DeleteRowOutlined size={18} />,
                            label:
                              <>
                                <Text onClick={handleDeleteGuest}>Rời bảng</Text>
                              </>,
                          },
                          board?.guest.find((item: any) => item.name == userName).role == "own" ? (
                            {

                              key: '3',
                              icon: <DeleteOutlined size={18} />,
                              label:
                                <>
                                  <Text onClick={handleDeleteBoard}>Xóa bảng</Text>
                                </>,
                            }
                          ) : (
                            {
                              type: "divider"
                            }
                          )
                        ]
                      }

                    ]}
                  />
                </>
              }>
              <Button type="text" shape="circle">
                <IoIosMore size={18} />
              </Button>
            </CustomPop>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default BoardBar;
