import { Outlet, useNavigate } from 'react-router-dom';
import { Col, Layout, Row } from 'antd';
import styles from './HomeLayout.module.scss';
import classNames from "classnames/bind";
import Header from "../../component/Header/Header";
import MenuSibar from "../../component/MenuSibar/MenuSibar";
import { useEffect, useState } from 'react';
import SplashCursor from '../../component/Reactbits/SplashCursor';

import {
  getWorkSpaceGuestByIdUserAPI,
  getWorkSpaceMemberByIdUserAPI
} from '../../services/WorkSpace/workSapce.service';
import Aurora from '../../component/Reactbits/Aurora/Aurora';

const cx = classNames.bind(styles);
const { Content, Sider } = Layout;

const HomeLayout = () => {
  const navigate = useNavigate()
  const [workSpaceMember, setWorkSpaceMember] = useState<any[]>([])
  const [workSpaceGuest, setWorkSpaceGuest] = useState<any[]>([])
  // const fetchWorkSapceMemberByUserID = async () => {
  //   const response = await getWorkSpaceMemberByIdUserAPI()
  //   if (!response.message) {
  //     setWorkSpaceMember(response)
  //   }
  // }
  // const fetchWorkSapceGuestByUserID = async () => {
  //   const response = await getWorkSpaceGuestByIdUserAPI()
  //   if (!response.message) {
  //     setWorkSpaceGuest(response)
  //   }
  // }
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
    fetchWorkSapceMemberByUserID()
    fetchWorkSapceGuestByUserID()
  }, [])


  return (
    <>
      <Layout className={cx('home-layout')}>
        <Header />
        {/* <SplashCursor /> */}
        <Row justify="center">
          <Col span={18}>
            <Content >
              {/* <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
              /> */}
              <Layout className={cx('home-layout-content')}>
                <Sider width={260} theme='light' className={cx('home-layout-sidebar')}>
                  <MenuSibar menuData={workSpaceMember ?? []} />
                </Sider>
                <Content className={cx('home-layout-content-main')}>
                  <Outlet context={{
                    workSpaceMember: workSpaceMember ?? [],
                    workSpaceGuest: workSpaceGuest ?? []
                  }} />
                </Content>
              </Layout>
            </Content>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default HomeLayout;
