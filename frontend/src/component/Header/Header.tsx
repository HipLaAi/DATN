import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Col, Row, Flex, Button, Input, Avatar } from "antd";
import { BsTrello } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import MenuHeader from "../DropDow/Dropdow";
import { userMenuItem } from "./MenuItem/MenuItem";
import ModalHeader from "./ModalHeader/ModalHeader";
import { useState } from "react";
import Conversation from "../ConverStation/ConverStation";
import Notification from "../Notification/Notification";
import { SheetSide } from "../../components/side-form";

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
              <SheetSide side="bottom"></SheetSide>
              <Input placeholder="Tìm kiếm" prefix={<IoSearchOutline size={15} />} style={{ maxWidth: "400px" }} />
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
