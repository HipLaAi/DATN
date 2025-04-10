import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import styles from "./BoardLayout.module.scss";
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Layout, Menu, theme, Flex, Avatar, Typography, Button } from 'antd';
import HeaderBoard from '../../component/Header/Header';
import ChatApp from '../../component/Chat/Chat';
import { getMemberByWorkspaceIdAPI, getWorkSpaceGuestByIdUserAPI, getWorkSpaceMemberByIdUserAPI } from '../../services/WorkSpace/workSapce.service';
import { getBoardByCustomAPI } from '../../services/Board/board.sevice';
import { createconverSationAPI } from '../../services/ConverSation/Conversation.sevice';
import MenuSibar from '../../component/MenuSibar/MenuSibar';
import decodeJWT from '../../services/Auth/auth.service ';

const cx = classNames.bind(styles);
const { Title } = Typography;
const { Sider, Content } = Layout;
const BoardLayout = () => {

  const { idWorkspace } = useParams();
  const [isopenChat, setIsOpenChat] = useState(false)
  const [converSation, setConverSation] = useState<any>()
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken') as string;
  const userInfo = decodeJWT(token);
  const [dataMember, setDataMember] = useState<any>([])
  const [workSpaceMember, setWorkSpaceMember] = useState<any[]>([])
  const [workSpaceGuest, setWorkSpaceGuest] = useState<any[]>([])


  // Hàm xử lý mở hộp thoại
  const handleOPenChat = (converSation: any) => {
    setIsOpenChat(true)
    setConverSation(converSation)
  }

  // Xử lý background
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  // Hàm lấy danh sách thành viên có trong không gian làm việc
  const fetchGetMember = async () => {
    const response = await getMemberByWorkspaceIdAPI(idWorkspace);
    setDataMember(response)
  }

  // Hàm lấy không gian làm việc thành viên theo ID người dùng hiện tại
  const fetchWorkSapceMemberByUserID = async () => {
    try {
      const response = await getWorkSpaceMemberByIdUserAPI()
      if (!response.message) {
        setWorkSpaceMember(response)
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigate("/login")
      }
    }
  }

  // Hàm lấy không gian làm việc khách theo ID người dùng hiện tại
  const fetchWorkSapceGuestByUserID = async () => {
    try {
      const response = await getWorkSpaceGuestByIdUserAPI()
      if (!response.message) {
        setWorkSpaceGuest(response)
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    fetchGetMember(),
      fetchWorkSapceMemberByUserID(),
      fetchWorkSapceGuestByUserID()
  }, [])

  const [boardFilter, setBoardFilter] = useState<any[]>([]);

  const handleFillter = async (boardID: any, userID: any) => {
    if (userID == "") {
      setBoardFilter([]);
    } else {
      const reponse = await getBoardByCustomAPI(boardID, {
        user_id: userID
      })
      setBoardFilter(reponse);
    }
  }

  const [resetConverSation, setResetConverSation] = useState(false);

  const handleCreateConversation = async (userID: any) => {
    const reponse = await createconverSationAPI({
      user_id_1: userInfo.user_id,
      user_id_2: userID
    })
    handleOPenChat(reponse || []);
    setResetConverSation((value: any) => !value);
  }

  return (
    <>
      <HeaderBoard handleOPenChat={handleOPenChat} resetConverSation={resetConverSation} />
      {
        isopenChat && <ChatApp converSation={converSation} setIsOpenChat={setIsOpenChat} />
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
              dataMember: dataMember,
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
