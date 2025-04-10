import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Col, Row, Flex, Button, Input, Avatar, Badge } from "antd";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BsTrello } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import MenuHeader from "../DropDow/Dropdow";
import { notificationMenuItem, recentlyMenuItem, starMenuItem, userMenuItem, worksapcesMenuItem } from "./MenuItem/MenuItem";
import { FaRegBell } from "react-icons/fa";
import ModalHeader from "./ModalHeader/ModalHeader";
import { useState } from "react";
import Conversation from "../ConverStation/ConverStation";

const cx = classNames.bind(styles);

const Header = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalHeader handleCancel={handleCancel} handleOk={handleOk} isOpenModal={isModalOpen} />
      <div className={cx('trello-header')}>
        <Row align="middle" justify="center" wrap={false}>
          <Col span={2}>
            <Flex align="center" justify="center" gap={15}>
              <BsGrid3X3Gap size={18} />
              <Link to='/'>
                <Flex align="center" gap={5}>
                  <BsTrello size={18} style={{ transform: "rotate(90deg)", transformOrigin: "center" }} />
                  <h2 className={cx('trello-title')}>
                    Task
                  </h2>
                </Flex>
              </Link>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex gap={5} align="center">
              <MenuHeader title="Các không gian làm việc" items={worksapcesMenuItem} />
              <MenuHeader title="Đánh dấu sao" items={starMenuItem} />
              <MenuHeader title="Gần đây" items={recentlyMenuItem} />
              <Button type="primary" onClick={showModal}>Tạo mới không gian làm việc</Button>
            </Flex>
          </Col>
          <Col span={10}>
            <Flex align="center" justify="flex-end" gap={10} style={{ paddingRight: "10px" }}>
              <Input placeholder="Tìm kiếm" prefix={<IoSearchOutline size={15} />} style={{ maxWidth: "200px" }} />
              <MenuHeader Icon={
                <Badge dot>
                  <FaRegBell size={18} />
                </Badge>} items={notificationMenuItem} />
              <Conversation handleOPenChat={props.handleOPenChat} resetConverSation={props.resetConverSation}/>
              <MenuHeader Icon={<Avatar shape="circle" size="small" src={avatar} title={name} />} items={userMenuItem} />
            </Flex>
          </Col>
        </Row>
      </div >
    </>
  );
};

export default Header;
