import styles from './Home.module.scss';
import classNames from "classnames/bind";
import Table from "../../component/SymbolicTable/SymbolicTable";
import { Typography, Button, Flex } from 'antd';
import { FaRegClock } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';
import { URL } from '../../utils/url';
import { useState } from 'react';
import ModalCreateColumn from '../Work/compoent/Modal/ModalCreateBoard';

const { Title } = Typography;


const cx = classNames.bind(styles);

const Home = () => {
  const { workSpaceMember, workSpaceGuest } = useOutletContext<{ workSpaceMember: any[], workSpaceGuest: any[] }>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentIdWorkSpace, setCurrentIdWorkSpace] = useState<number>()
  const showModal = (workSapceId: any) => {
    setIsModalOpen(true);
    setCurrentIdWorkSpace(workSapceId)
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ModalCreateColumn isOpenModal={isModalOpen} handleCancel={handleCancel} id={currentIdWorkSpace} />
      <div className={cx('home-page')}>
        <div className={cx('home-content')}>
          {/* <div className={cx('home-content-top')}>
            <Title level={5} className={cx('home-content-title')}>
              <FaRegClock />
              Đã xem gần đây
            </Title>
            <div className={cx('home-content-top-main')}>
              <Table title='Setting Up Project' />
            </div>
          </div> */}

          <div className={cx('home-content-middle')}>
            <Title level={4} className={cx('home-content-title')}>
              Các không gian làm việc
            </Title>
            {
              workSpaceMember?.map((items: any, index: any) => (
                <div key={items.workspace_id}>
                  <div className={cx('home-content-action')}>
                    <Title level={5} className={cx('home-content-title')}>
                      <FaRegClock />
                      {items.workspace_name}
                    </Title>
                    <Flex align='center' justify='end' gap={10}>
                      <Button type='text' className={cx('btn')}>Bảng</Button>
                      <Button type='text' className={cx('btn')}>Dạng xem</Button>
                      <Button type='text' className={cx('btn')}>Thành viên</Button>
                      <Button type='text' className={cx('btn')}>Cài đặt</Button>
                    </Flex>
                  </div>
                  <div className={cx('home-content-middle-main')}>
                    {
                      items?.boards?.map((item: any) => (
                        <Table key={item.board_id} path={`/workspace/${items.workspace_id}${URL.BOARD + item.board_id}`} title={item.name} background={item?.background?.replace("D:\\DA4\\frontend\\", "")} />
                      ))
                    }
                    <Button style={{ width: "23.5%", padding: "50px" }} onClick={() => showModal(items.workspace_id)}>Tạo bảng</Button>
                  </div>
                </div>
              )
              )
            }
          </div>
          <div className={cx('home-content-bottom')}>
            <Title level={4} className={cx('home-content-title')}>
              Các không gian làm việc khách
            </Title>
            {
              workSpaceGuest?.map((items: any) => (
                <div>
                  <Title key={items?.workspace_id} level={5} className={cx('home-content-title')}>
                    <FaRegClock />
                    {items.workspace_name}
                  </Title>
                    {
                      items.boards.map((item: any) => (
                        <div key={item.board_id} className={cx('home-content-bottom-main')}>
                          <Table path={`/workspace/${items.workspace_id}${URL.BOARD + item.board_id}`} title={item.name} background={item?.background?.replace("D:\\DA4\\frontend\\", "")} />
                        </div>
                      ))
                    }
                </div>
              ))
            }
          </div>

          <Button type='text' className={cx('btn', 'btn-view-all')}>Xem tất cả bẳng đã đóng</Button>

        </div>
      </div>
    </>
  );
};

export default Home;