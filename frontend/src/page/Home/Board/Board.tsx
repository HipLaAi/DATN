import styles from './Board.module.scss';
import classNames from "classnames/bind";
import SymbolicTable from "../../../component/SymbolicTable/SymbolicTable";
import { Typography, Button, Flex, Avatar } from 'antd';
import { FaRegClock } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';
import { URL } from '../../../utils/url';
import { useState } from 'react';
import ModalCreateBoard from '../../Work/component/Modal/ModalCreateBoard';

const { Title } = Typography;

const cx = classNames.bind(styles);

const Board = () => {
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
      <ModalCreateBoard isOpenModal={isModalOpen} handleCancel={handleCancel} idWorkspace={currentIdWorkSpace} />
      <div className={cx('home-page')}>
        <div className={cx('home-content')}>
          <div className={cx('home-content-middle')}>
            <Title level={4} className={cx('home-content-title')}>
              Các không gian làm việc của bạn
            </Title>
            {
              workSpaceMember?.map((items: any, index: any) => (
                <div key={items.workspace_id}>
                  <div className={cx('home-content-action')}>
                    <Avatar src={items.logo} shape="square" style={{ minWidth: "35px", marginRight: "10px" }} />
                    <Title level={5} className={cx('home-content-title')}>
                      {items.workspace_name}
                    </Title>
                    <Flex align='center' justify='end' gap={12}>
                      <Button type='text' className={cx('btn')}>Bảng</Button>
                      <Button type='text' className={cx('btn')}>Thành viên</Button>
                      <Button type='text' className={cx('btn')}>Cài đặt</Button>
                    </Flex>
                  </div>
                  <div className={cx('home-content-middle-main')}>
                    {
                      items?.boards?.map((item: any) => (
                        <SymbolicTable key={item.board_id} path={URL.BOARD.BUILDER.LIST(items.workspace_id, item.board_id)} title={item.name} background={item?.background?.replace("D:\\DA4\\frontend\\", "")} />
                      ))
                    }
                    <Button style={{ height: "100%" }} onClick={() => showModal(items.workspace_id)}>Tạo bảng</Button>
                  </div>
                </div>
              )
              )
            }
          </div>

          {
            workSpaceGuest && workSpaceGuest.length > 0 ? (
              <div className={cx('home-content-middle')}>
                <Title level={4} className={cx('home-content-title')}>
                  Các không gian làm việc khách
                </Title>
                {
                  workSpaceGuest?.map((items: any, index: any) => (
                    <div key={items.workspace_id}>
                      <div className={cx('home-content-action')}>
                        <Avatar src={items.logo} shape="square" style={{ minWidth: "35px", marginRight: "10px" }} />
                        <Title level={5} className={cx('home-content-title')}>
                          {items.workspace_name}
                        </Title>
                        <Flex align='center' justify='end' gap={12}>
                          <Button type='text' className={cx('btn')}>Bảng</Button>
                          <Button type='text' className={cx('btn')}>Thành viên</Button>
                          <Button type='text' className={cx('btn')}>Cài đặt</Button>
                        </Flex>
                      </div>
                      <div className={cx('home-content-middle-main')}>
                        {
                          items?.boards?.map((item: any) => (
                            <SymbolicTable key={item.board_id} path={URL.BOARD.BUILDER.LIST(items.workspace_id, item.board_id)} title={item.name} background={item?.background?.replace("D:\\DA4\\frontend\\", "")} />
                          ))
                        }
                        {/* <Button style={{ height: "100%" }} onClick={() => showModal(items.workspace_id)}>Tạo bảng</Button> */}
                      </div>
                    </div>
                  )
                  )
                }
              </div>
            ) : (
              <></>
            )
          }


          {/* <div className={cx('home-content-bottom')}>
            {
              workSpaceGuest && workSpaceGuest.length > 0 ? (
                <>
                  <Title level={4} className={cx('home-content-title')}>
                    Các không gian làm việc khách
                  </Title>
                  {workSpaceGuest?.map((items: any) => (
                    <div>
                      <Title key={items?.workspace_id} level={5} className={cx('home-content-title')}>
                        <FaRegClock />
                        {items.workspace_name}
                      </Title>
                      {
                        items.boards.map((item: any) => (
                          <div key={item.board_id} className={cx('home-content-bottom-main')}>
                            <SymbolicTable key={item.board_id} path={URL.BOARD.BUILDER.LIST(items.workspace_id, item.board_id)} title={item.name} background={item?.background?.replace("D:\\DA4\\frontend\\", "")} />
                          </div>
                        ))
                      }
                    </div>
                  ))}
                </>
              ) : (
                <div></div>
              )
            }
          </div> */}

          {/* <Button type='text' className={cx('btn', 'btn-view-all')}>Xem tất cả bẳng đã đóng</Button> */}

        </div>
      </div>
    </>
  );
};

export default Board;