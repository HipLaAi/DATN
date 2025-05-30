import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from "./BoardLayout.module.scss";
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Layout, Menu, theme, Flex, Avatar, Typography, Button } from 'antd';
import HeaderBoard from '../../component/Header/Header';
import ChatApp from '../../component/Chat/Chat';
import { getWorkSpaceGuestByIdUserAPI, getWorkSpaceMemberByIdUserAPI } from '../../services/WorkSpace/workSapce.service';
import { getBoardByCustomAPI } from '../../services/Board/board.sevice';
import { createconverSationAPI } from '../../services/ConverSation/Conversation.sevice';
import MenuSibar from '../../component/MenuSibar/MenuSibar';
import decodeJWT from '../../services/Auth/auth.service ';
import { SocketService } from '../../services/Socket/Socket.service';
import ChatAI from '../../component/Chat/ChatAI/ChatAI';
import { CloseOutlined, OpenAIOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { URL } from '../../utils/url';

const cx = classNames.bind(styles);
const { Title } = Typography;
const { Sider, Content } = Layout;
const BoardLayout = () => {

  const [isopenChatAI, setIsOpenChatAI] = useState(false)
  const [isopenChat, setIsOpenChat] = useState(false)
  const [converSation, setConverSation] = useState<any>()
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>()
  const [workSpaceMember, setWorkSpaceMember] = useState<any[]>([])
  const [workSpaceGuest, setWorkSpaceGuest] = useState<any[]>([])

  const boardReload = useSelector(
    (state: any) => state.reload.boardReload
  );

  // Gửi id người dùng hiện tại về server
  useEffect(() => {
    const socket = SocketService.connect();
    if (socket) {
      socket.emit("activeUser", userInfo?.user_id);
    }
  }, [userInfo?.user_id]);

  // Hàm xử lý mở hộp thoại chat AI
  const handleOPenChatAI = () => {
    setIsOpenChatAI((prev) => !prev)
  }

  // Hàm xử lý mở hộp thoại
  const handleOPenChat = (converSation: any) => {
    setIsOpenChat(true)
    setConverSation(converSation)
  }

  // Xử lý background
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  // Hàm lấy không gian làm việc thành viên theo ID người dùng hiện tại
  const fetchWorkSapceMemberByUserID = async () => {
    try {
      const response = await getWorkSpaceMemberByIdUserAPI()
      if (!response.message) {
        setWorkSpaceMember(response)
      }
      else {
        setWorkSpaceMember([])
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  // Hàm lấy không gian làm việc khách theo ID người dùng hiện tại
  const fetchWorkSapceGuestByUserID = async () => {
    try {
      const response = await getWorkSpaceGuestByIdUserAPI()
      if (!response.message) {
        setWorkSpaceGuest(response)
      }
      else {
        setWorkSpaceGuest([])
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    fetchWorkSapceMemberByUserID();
    fetchWorkSapceGuestByUserID();
  }, [boardReload])

  const [boardFilter, setBoardFilter] = useState<any[]>([]);

  const handleFillter = async (boardID: any, userID: any, cardStatus: any) => {
    if (userID == "" && cardStatus == "") {
      setBoardFilter([]);
    } else {
      const reponse = await getBoardByCustomAPI(boardID, {
        user_id: userID,
        card_status: cardStatus,
      })
      setBoardFilter(reponse);
    }
  }

  const [resetConverSation, setResetConverSation] = useState(false);

  const handleCreateConversation = async (userID: any) => {
    const reponse = await createconverSationAPI({
      user_id_1: userInfo?.user_id,
      user_id_2: userID
    })
    handleOPenChat(reponse || []);
    setResetConverSation((value: any) => !value);
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate(URL.AUTH.LOGIN);
      return;
    }

    try {
      const userInfo = decodeJWT(token);
      if (userInfo.role === "user") {
        setUserInfo(userInfo);
      } else {
        navigate(URL.AUTH.LOGIN);
      }
    } catch (error) {
      navigate(URL.AUTH.LOGIN);
    }
  }, []);


  return (
    <>
      {/* Phần header và modal ChatUser */}
      <HeaderBoard handleOPenChat={handleOPenChat} resetConverSation={resetConverSation} />
      {
        isopenChat && <ChatApp converSation={converSation} setIsOpenChat={setIsOpenChat} />
      }

      {/* Phần ChatAI */}
      <Button
        type="primary"
        shape={"circle"}
        size={"large"}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "10"
        }}
        onClick={() => handleOPenChatAI()}
        icon={
          isopenChatAI ? (
            <CloseOutlined style={{ fontSize: "24px" }} />
          ) : (
            <OpenAIOutlined style={{ fontSize: "24px" }} />
          )
        }
      />
      {
        isopenChatAI && <ChatAI workSpaceMember={workSpaceMember} handleOPenChatAI={handleOPenChatAI} />
      }

      <Layout className={cx('layout')}>
        <Sider
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '87.7vh',
          }}
          collapsible
          theme='light'
          width={260}
          className={cx('sidebar', 'custom-scrollbar')}
        >
          <MenuSibar menuData={workSpaceMember ?? []} />
        </Sider>
        <Layout>
          <Content
            style={{
              background: colorBgContainer,
              borderLeft: '0.5px solid rgba(0, 0, 0, 0.2)'
            }}
          >
            <Outlet context={{
              handleFillter: handleFillter,
              boardFilter: boardFilter,
              handleCreateConversation: handleCreateConversation,
              workSpaceMember: workSpaceMember ?? [],
              workSpaceGuest: workSpaceGuest ?? []
            }} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default BoardLayout;
