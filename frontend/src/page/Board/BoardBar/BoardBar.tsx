import { Col, Row, Flex, Button, Dropdown, Avatar, Typography, Menu, Radio, Space, Input } from "antd";
import style from './BoardBar.module.scss';
import classNames from "classnames/bind";
import { FaRegStar } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { DeleteOutlined, DeleteRowOutlined, GlobalOutlined, InfoCircleOutlined, LeftOutlined, LockOutlined, MailOutlined, MessageOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import CustomPop from "../../../component/PopConfirm/PopConfirm";
import { useEffect, useState } from "react";
import ModalCreateGuest from "../Modal/ModalCreateGuest";
import { search } from "../../../services/User/user.service";
import { createGuestdAPI, deleteBoardAPI, deleteGuestAPI, updateIBoardAPI } from "../../../services/Board/board.sevice";
import decodeJWT from "../../../services/Auth/auth.service ";
import { SheetSide } from "../../../components/side-form";
import MenuComponent from "../Setting/MenuComponent";
import BoardInfo from "../Setting/BoardInfo";
import BoardSetting from "../Setting/BoardSetting";
import { useDispatch } from "react-redux";
import { boardReload } from "../../../features/reloadSlice";
import BoardLabel from "../Setting/BoardLabel";

const cx = classNames.bind(style);
const { Title, Text } = Typography


const BoardBar = (props: any) => {
  const { idWorkspace, id } = useParams()
  const { board, workSpaceMember, handleDataBoardChange, setting, handleSettingBoardChange } = props;
  const [guest, setGuest] = useState(props.board?.guest);
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem('accessToken') as string;
  const userInfo = decodeJWT(token);
  const userID = userInfo.user_id;
  const [activeMenu, setActiveMenu] = useState<string>("Menu");
  const [isEditing, setIsEditing] = useState(false);
  const { handleFillter, handleCreateConversation } = useOutletContext<{ handleFillter: any, handleCreateConversation: any }>();
  const [selectedValue, setSelectedValue] = useState<number | string | null>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [nameBoard, setNameBoard] = useState(board?.name);

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

  const handleDeleteGuest = async () => {
    await deleteGuestAPI(id, {
      user_id: userID
    })
  }

  const handleDeleteBoard = async () => {
    await deleteBoardAPI(id);
  }
  // Load tên bảng
  useEffect(() => {
    if (board?.name) {
      setNameBoard(board.name);
    }
  }, [board?.name]);

  // xử lý cập nhật tên bảng
  const handleNameBoard = async () => {
    if (nameBoard.trim() === "") {
      setNameBoard(board?.name);
      setIsEditing(false);
      return;
    }
    try {
      await updateIBoardAPI(id, {
        name: nameBoard,
        workspace_id: board?.workspace_id,
        status: board?.status,
        description: board?.description,
      });
      dispatch(boardReload());
      handleDataBoardChange("name", nameBoard);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsEditing(false);
    }
  };

  // Xử lý load các content của menu
  const renderContent = () => {
    switch (activeMenu) {
      case "Thông tin bảng":
        return <BoardInfo
          board={board}
          workSpaceMember={workSpaceMember}
          handleDataBoardChange={handleDataBoardChange}
        />;
      case 'Cài đặt':
        return <BoardSetting
          setting={setting}
          handleSettingBoardChange={handleSettingBoardChange}
        />;
      case 'Nhãn':
        return <BoardLabel />;
      default:
        return null;
    }
  };

  // xử lý cập nhật trạng thái của bảng
  const handleStatusBoard = async (value: any) => {
    try {
      await updateIBoardAPI(id, {
        name: board?.name,
        workspace_id: board?.workspace_id,
        status: value,
        description: board?.description,
      });
      handleDataBoardChange("status", value);
      dispatch(boardReload());
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const optionStatus = [
    {
      key: "private",
      label: 'Riêng tư',
      icon: <LockOutlined style={{ color: "red" }} />,
      description: "Các thành viên bảng thông tin và các quản trị viên của không gian làm việc có thể xem và sửa bảng thông tin này.",

    },
    {
      key: "workspace",
      label: 'Không gian làm việc',
      icon: <IoPeople style={{ color: "#ffbe18" }} />,
      description: "Tất cả các thành viên của không gian làm việc có thể xem và sửa bảng thông tin này.",

    },
    {
      key: "public",
      label: "Công khai",
      icon: <GlobalOutlined style={{ color: "green" }} />,
      description: "Bất kỳ ai đều có thể xem bảng thông tin này, chỉ thành viên bảng mới có thể chỉnh sửa bảng thông tin này."
    },
  ];

  return (
    <>
      <ModalCreateGuest
        handleOpenModal={handleOpenModal}
        openModal={openModal}
        loading={loading}
        data={data}
        handleCreateMember={handleCreateMember}
        fetchSearchUser={fetchSearchUser} />
      <Row justify="space-between" className={cx('board-bar')}>
        <Col span={16} style={{ padding: 0 }}>
          <Flex align="center" gap={10}>
            <div style={{ width: "auto" }}>
              {
                !isEditing ? (
                  <Title
                    level={4}
                    style={{ margin: "0 8px", maxWidth: "250px", width: "100%", cursor: "pointer" }}
                    ellipsis={{ tooltip: true }}
                    onClick={() => setIsEditing(true)}
                  >
                    {nameBoard}
                  </Title>
                ) : (
                  <Input
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      maxWidth: "400px"
                    }}
                    spellCheck={false}
                    value={nameBoard}
                    onChange={(e: any) => setNameBoard(e.target.value)}
                    onBlur={handleNameBoard}
                    onPressEnter={handleNameBoard}
                  />
                )
              }
            </div>
            <FaRegStar size={18} />
            {
              board?.role === "own" ? (
                <CustomPop
                  title={
                    <>
                      <Text >Chọn khả năng hiển thị bảng</Text>
                    </>
                  } content={
                    <>
                      <Flex style={{ width: "320px", padding: 0 }}>
                        <Menu
                          style={{ width: "100%" }}
                          mode="none"
                          selectable={true}
                          defaultSelectedKeys={[board?.status]}
                        >
                          {optionStatus.map((item) => (
                            <Menu.Item
                              key={item.key}
                              style={{
                                padding: "12px 16px",
                                height: "auto",
                                whiteSpace: "normal",
                                lineHeight: 1.5
                              }}
                              onClick={() => handleStatusBoard(item.key)}
                            >
                              <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <span style={{ marginRight: 12, fontSize: 14 }}>{item.icon}</span>
                                <div>
                                  <div style={{ fontWeight: 500, marginBottom: 4, fontSize: 11 }}>{item.label}</div>
                                  <div style={{
                                    color: "#666",
                                    fontSize: 11,
                                    lineHeight: 1.4,
                                    whiteSpace: "normal"
                                  }}>
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            </Menu.Item>
                          ))}
                        </Menu>
                      </Flex>
                    </>
                  }>
                  <Button
                    color='default'
                    variant='filled'
                    style={{ userSelect: "none" }}
                    icon={
                      board?.status === "public" ? (
                        <GlobalOutlined size={18} style={{ color: "green" }} />
                      ) : board?.status === "private" ? (
                        <LockOutlined size={18} style={{ color: "red" }} />
                      ) : board?.status === "workspace" ? (
                        <IoPeople size={18} style={{ color: "#ffbe18" }} />
                      ) : null
                    }
                  />
                </CustomPop>
              ) : (
                <Button
                  color='default'
                  variant='filled'
                  disabled
                  title="Bị hạn chế quyền"
                  icon={
                    board?.status === "public" ? (
                      <GlobalOutlined size={18} style={{ color: "green" }} />
                    ) : board?.status === "private" ? (
                      <LockOutlined size={18} style={{ color: "red" }} />
                    ) : board?.status === "workspace" ? (
                      <IoPeople size={18} style={{ color: "#ffbe18" }} />
                    ) : null
                  }
                />
              )}

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
        <Col span={8}>
          <Flex justify="end" align="center" gap={5}>

            {/* <Dropdown trigger={['click']}>
              <Button type="text" shape="circle">
                <MdOutlineRocket size={18} />
              </Button>
            </Dropdown> */}

            {/* Bộ lọc */}
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

            {/* Nút thêm khách */}
            <Button type="text" shape="circle" onClick={() => handleOpenModal()} title="Mời tham gia">
              <PlusOutlined size={18} />
            </Button>

            {/* Hiển thị khách tham gia bảng */}
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

            {/* Hiển thị sheet setting */}
            <div style={{ position: "relative" }}>
              <SheetSide
                side="right"
                width={320}
                // height="90vh"
                triggerIcon={<IoIosMore size={18} />}
                // triggerText="Quản lý thành viên"
                triggerProps={{ type: "text" }}
                title={activeMenu}
                // description="Thêm/xóa thành viên khỏi workspace"
                // showFooter
                contentClassName="bg-gray-50"
              >
                {
                  activeMenu !== "Menu" ? (
                    <>
                      <Button
                        type="text"
                        icon={<LeftOutlined style={{ fontSize: "12px" }} />}
                        onClick={() => setActiveMenu("Menu")}
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "5px",
                        }}
                      />
                      {renderContent()}
                    </>

                  ) : (
                    <MenuComponent setActiveMenu={setActiveMenu} />
                  )
                }
              </SheetSide>
            </div>

          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default BoardBar;
