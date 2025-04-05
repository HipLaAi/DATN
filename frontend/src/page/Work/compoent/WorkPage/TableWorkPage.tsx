import classNames from "classnames/bind";
import styles from "../../Work.module.scss";
import { IoSearchOutline } from "react-icons/io5";
import {  Button, Row, Col, Select, Flex, Input, Typography } from 'antd';
import { useOutletContext, useParams } from "react-router-dom";
import { URL } from "../../../../utils/url";
import SymbolicTable from "../../../../component/SymbolicTable/SymbolicTable";


const { Title, Text } = Typography;
const cx = classNames.bind(styles);
const TableWorkPage = () => {
  const {idWorkspace} = useParams();
  const {data, showModal} = useOutletContext<{data:any, showModal:any}>()
  return (
    <div>
      <Row justify='center'>
        <Col span={22}>
          <Title level={4}
            style={{ margin: '0 0 30px' }}>
            Bảng
          </Title>
          <Flex vertical gap={30}>
            <Flex justify="space-between">
              <Flex gap={10}>
                <Flex vertical>
                  <Text strong>Sắp sếp theo</Text>
                  <Select
                    placeholder="Sắp sếp theo"
                    className={cx('select-tag')}
                    style={{width: "230px"}}
                    options={[
                      { value: 'Hoạt động gần đây nhất', label: 'Hoạt động gần đây nhất' },
                      { value: 'Ít hoạt động nhất gần đây', label: 'Ít hoạt động nhất gần đây' },
                      { value: 'Theo bảng chữ cái A-Z', label: 'Theo bảng chữ cái A-Z' },
                      { value: 'Theo bảng chữ cái Z-A', label: 'Theo bảng chữ cái Z-A' },
                    ]}
                  />
                </Flex>
                <Flex vertical>
                  <Text strong>Lọc theo</Text>
                  <Select
                    style={{width: "150px"}}
                    placeholder="Lọc theo"
                    className={cx('select-tag')}
                    options={[
                      { value: 'Bộ sưu tập', label: 'Bộ sưu tập' },
                    ]}
                  />
                </Flex>
              </Flex>
              <Flex vertical justify="center">
                <Text strong>Tìm kiếm</Text>
                <Input placeholder="Tìm kiếm" prefix={<IoSearchOutline size={15} />} />
              </Flex>
            </Flex>
            <Flex align="center" gap="10px" wrap>
              {
                data?.board && data.board.length > 0
                  ? data.board.map((item: any, index: any) => (
                    <SymbolicTable path={`/workspace/${idWorkspace}${URL.BOARD+ item.board_id}`} key={index} title={item.name} background={item?.background?.replace("D:\\DA4\\frontend\\", "")}/>
                  ))
                  : []
              }
              <Button style={{ width: "23.5%", padding: "50px" }} onClick={showModal}>Tạo bảng</Button>
            </Flex>
            <Button type="text" className={cx('btn')}>Xem tất cả các bảng đã đóng</Button>
          </Flex>
        </Col>
      </Row>
    </div>
  )
}

export default TableWorkPage
