import classNames from "classnames/bind";
import styles from "./Work.module.scss";
import { LockOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { CiLock } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { Avatar, Typography, Button, Row, Col, Select, Flex, Input } from 'antd';
import Table from "../../component/SymbolicTable/SymbolicTable";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { getMemberByWorkspaceIdAPI, getWorkSpacedByIdAPI } from "../../services/WorkSpace/workSapce.service";
import { useEffect, useState } from "react";
import ModalCreateBoard from "./compoent/Modal/ModalCreateBoard";
import { URL } from "../../utils/url";
import ModalCreateMember from "./compoent/Modal/ModalCreateMember";

const { Title, Text } = Typography;
const cx = classNames.bind(styles);


const Work = () => {
  const { idWorkspace } = useParams()
  const [data, setData] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const {dataMember} = useOutletContext<{dataMember: any}>();

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchWorkSapceDetails = async () => {
    const reponse = await getWorkSpacedByIdAPI(idWorkspace)
    setData(reponse)
  }
  useEffect(() => {
    fetchWorkSapceDetails()
  }, [])


  return (
    <>
      <ModalCreateBoard isOpenModal={isModalOpen} handleCancel={handleCancel} id={idWorkspace} />
      <ModalCreateMember toggleModal={toggleModal} handleToggleModal={handleToggleModal} id={idWorkspace} />
      <div className={cx('work-page')}>
        <Row justify='center'>
          <Col span={16}>
            <div className={cx('work-page-top')}>
              <div className={cx('user')}>
                <Avatar src={data?.logo.replace("D:\\DA4\\frontend\\", "")} alt="Logo" />
                <div className={cx('user-profile')}>
                  <Title editable level={4}>{data?.name}</Title>
                  <Text strong>
                    {data?.status === "Công khai" && <UnlockOutlined />}
                    {data?.status === "Riêng tư" && <LockOutlined />}
                    {data?.status === "Không gian làm việc" && <UnlockOutlined />}
                    {data?.status}
                  </Text>
                </div>
              </div>
              <Button type="primary" onClick={handleToggleModal}><IoPersonAddOutline />Mời các thành viên vào không gian làm việc</Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Outlet context={{
          data: data,
          showModal: showModal,
          dataMember:dataMember
        }}
        />
      </div>
    </>
  );
};

export default Work;
