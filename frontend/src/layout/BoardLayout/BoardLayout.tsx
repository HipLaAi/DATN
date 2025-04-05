import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import styles from "./BoardLayout.module.scss";
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Layout, Menu, theme, Flex, Avatar, Typography, Button } from 'antd';
import {
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import HeaderBoard from '../../component/Header/Header';
import ChatApp from '../../component/Chat/Chat';
import { getMemberByWorkspaceIdAPI, getWorkSpacedByIdAPI } from '../../services/WorkSpace/workSapce.service';
import { getBoardByCustomAPI } from '../../services/Board/board.sevice';
import { createconverSationAPI } from '../../services/ConverSation/Conversation.sevice';
import { values } from 'lodash';

const cx = classNames.bind(styles);
const { Title } = Typography;
const { Sider, Content } = Layout;
const BoardLayout = () => {
  const { idWorkspace } = useParams();
  const [isopenChat, setIsOpenChat] = useState(false)
  const [converSation, setConverSation] = useState<any>()
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const fetchdata = async () => {
    try {
      const results = await getWorkSpacedByIdAPI(idWorkspace);
      setData(results);
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    fetchdata();
  }, [])

  const handleOPenChat = (converSation: any) => {
    setIsOpenChat(true)
    setConverSation(converSation)
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();




  const [dataMember, setDataMember] = useState<any>([])
  const fetchGetMember = async () => {
    const response = await getMemberByWorkspaceIdAPI(idWorkspace);
    setDataMember(response)
  }

  useEffect(() => {
    fetchGetMember()
  }, [])


  let items = [{}];
  const user_id = localStorage.getItem("user_id")

  if (dataMember.find((item: any) => (item.user_id == user_id))?.role === "own" ||
    dataMember.find((item: any) => (item.user_id == user_id))?.role === "member") {
    items = [
      {
        key: '1',
        icon: <TableOutlined />,
        label: <Link to={`workspace/${idWorkspace}`}>Bảng</Link>,
      },
      {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to={`workspace/${idWorkspace}/member`}>Thành viên</Link>,
      },
      {
        key: '3',
        icon: <SettingOutlined />,
        label: <Link to={`workspace/${idWorkspace}/setting`}>Cài đặt</Link>,

      },
    ];
  }

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
      user_id_1: user_id,
      user_id_2: userID
    })
    handleOPenChat(reponse || []);
    setResetConverSation((value: any) => !value);
  }

  return (
    <>
      <HeaderBoard handleOPenChat={handleOPenChat} resetConverSation={resetConverSation}/>
      {
        isopenChat && <ChatApp converSation={converSation} setIsOpenChat={setIsOpenChat}/>
      }
      <Layout className={cx('layout')}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme='light' width={260} className={cx('sidebar')}>
          {
            collapsed ? (
              <Flex align='center' justify='center'>
                <Button onClick={() => setCollapsed(!collapsed)} type='text' className={cx('btn')}><RiArrowDropRightLine size={30} /> </Button>
              </Flex>
            ) : (
              <Flex align='center' className={cx('sidebar-top')} gap={5}>
                <Avatar shape='circle' size="default" src={data?.logo?.replace("D:\\DA4\\frontend\\", "")} />
                <div>
                  <Title level={5} style={{ margin: 0 }}>
                    {data?.name}
                  </Title>
                </div>
                <Button onClick={() => setCollapsed(!collapsed)} type='text' className={cx('btn')}><RiArrowDropLeftLine size={30} /> </Button>
              </Flex>
            )
          }
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            items={items}
            className={cx('sidebar-menu')}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              background: colorBgContainer
            }}
          >
            <Outlet context={{
              dataMember: dataMember,
              handleFillter: handleFillter,
              boardFilter: boardFilter,
              handleCreateConversation: handleCreateConversation
            }} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default BoardLayout;
