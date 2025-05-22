import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Col, Row, Flex, Button, Input, Avatar, List, Spin } from "antd";
import { BsTrello } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import MenuHeader from "../DropDow/Dropdow";
import { userMenuItem } from "./MenuItem/MenuItem";
import ModalHeader from "./ModalHeader/ModalHeader";
import { useEffect, useState } from "react";
import Conversation from "../ConverStation/ConverStation";
import Notification from "../Notification/Notification";
import { SheetSide } from "../../components/side-form";
import { CalendarOutlined } from "@ant-design/icons";
import Calendar from "../Calendar/Calendar";
import { useDebounce } from "@uidotdev/usehooks";
import { getSearchAPI } from "../../services/WorkSpace/workSapce.service";
import { URL } from "../../utils/url";

const cx = classNames.bind(styles);

const Header = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [board, setBoard] = useState<any[]>([]);
  const [workspace, setWorkspace] = useState<any[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  const fetchSearchUser = async (debouncedSearch: any) => {
    setLoading(true);
    try {
      const response = await getSearchAPI({ search: debouncedSearch });
      setBoard(response?.board ? response?.board : []);
      setWorkspace(response?.workspace ? response?.workspace : []);
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigateWorkspace = (workspaceID: any) => {
    navigate(URL.WORKSPACE.BUILDER.TABLE(workspaceID))
    setSearch("");
  }

  const navigateBoard = (workspaceID: any, boardID: any) => {
    navigate(URL.BOARD.BUILDER.LIST(workspaceID, boardID))
    setSearch("");
  }

  const events = [
    {
      id: 1,
      title: "Meeting",
      startTime: "2025-04-08T10:00:00",
      endTime: "2025-04-08T12:00:00",
      day: 2, // Tuesday
    },
    {
      id: 2,
      title: "Lunch",
      startTime: "2025-04-08T13:00:00",
      endTime: "2025-04-08T14:00:00",
      day: 2, // Tuesday
    },
  ];

  return (
    <>
      {/* Modal tạo không gian làm việc */}
      <ModalHeader handleCancel={handleCancel} handleOk={handleOk} isOpenModal={isModalOpen} />
      {/* Thanh công cụ */}
      <div className={cx('trello-header')}>
        <Row align="middle" justify="center" wrap={false}>
          {/* Logo */}
          <Col span={6}>
            <Flex align="center" style={{ marginLeft: "30px" }}>
              <Link to='/'>
                <Flex align="center" gap={10}>
                  <BsTrello size={18} style={{ transform: "rotate(90deg)", transformOrigin: "center" }} />
                  <h2 className={cx('trello-title')}>
                    Task
                  </h2>
                </Flex>
              </Link>
            </Flex>
          </Col>
          {/* Tìm kiếm, lịch, tạo không gian làm việc */}
          <Col span={12}>
            <Flex align="center" justify="center" gap={10}>

              <SheetSide
                side="bottom"
                // width={500}
                // height="90vh"
                triggerIcon={<CalendarOutlined size={20} />}
                // triggerText="Quản lý thành viên"
                // triggerProps={{ type: "default", size: "large" }}
                // title="Quản lý thành viên"
                // description="Thêm/xóa thành viên khỏi workspace"
                // showFooter
                contentClassName="bg-gray-50"
              >
                <Calendar events={events} />
              </SheetSide>

              <Input
                placeholder="Tìm kiếm"
                prefix={<IoSearchOutline size={15} />}
                style={{ maxWidth: "400px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                spellCheck={false}
              />

              {/* test */}
              {!loading ? (
                debouncedSearch.length > 2 && (
                  <div
                    style={{
                      width: "400px",
                      position: "fixed",
                      top: "40px",
                      left: "480px",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",
                      zIndex: "1000"
                    }}
                  >
                    {workspace && workspace.length > 0 ? (
                      <>
                        <span>Không gian làm viêc</span>
                        <List
                          itemLayout="horizontal"
                          dataSource={workspace}
                          renderItem={(item: any) => (
                            <List.Item
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigateWorkspace(item?.workspace_id)}
                            >
                              <Flex align='center' gap="10px">
                                <Avatar src={item.logo} />
                                <span>{item.name}</span>
                              </Flex>
                            </List.Item>
                          )}
                        />
                      </>
                    ) : (
                      <></>
                    )
                    }
                    {board && board.length > 0 ? (
                      <>
                        <span>Bảng</span>
                        <List
                          itemLayout="horizontal"
                          dataSource={board}
                          renderItem={(item: any) => (
                            <List.Item
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigateBoard(item?.workspace_id, item?.board_id)}
                            >
                              <Flex align='center' gap="10px">
                                <Avatar src={item.background} />
                                <Flex vertical>
                                  <span>{item.board_name}</span>
                                  <span style={{ fontSize: "10px" }}>{item.workspace_name}</span>
                                </Flex>
                              </Flex>
                            </List.Item>
                          )}
                        />
                      </>
                    ) : (
                      <></>
                    )
                    }
                  </div>
                )
              ) : (
                <Spin style={{ marginTop: "10px" }} />
              )}





              <Button type="primary" onClick={showModal}>Tạo mới không gian làm việc</Button>
            </Flex>
          </Col>
          {/* Thông báo, chat, thông tài tài khoản */}
          <Col span={6}>
            <Flex align="center" justify="flex-end" gap={10} style={{ paddingRight: "10px" }}>
              <Notification />
              <Conversation handleOPenChat={props.handleOPenChat} resetConverSation={props.resetConverSation} />
              <MenuHeader
                Icon={<Avatar shape="circle" size="small" src={avatar} title={name} />}
                items={userMenuItem} />
            </Flex>
          </Col>
        </Row>
      </div >
    </>
  );
};

export default Header;
