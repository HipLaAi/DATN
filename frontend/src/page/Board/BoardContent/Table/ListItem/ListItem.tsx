import { Avatar, Button, Col, Flex, List, Row, Select, Typography } from 'antd'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { updateCardByColumnIDAPI } from '../../../../../services/Card/Card.service';
import DateModal from '../../../../../component/CardDialog/DateModal/DateModal';
import CustomPop from '../../../../../component/PopConfirm/PopConfirm';

import { PlusCircleOutlined } from '@ant-design/icons';
dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

const { Text } = Typography
const ListItem = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModalDate = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [value, setValue] = useState(props?.item?.column_id);

  const onChange = async (columnID: string, cardID: string) => {
    await updateCardByColumnIDAPI(cardID, {
      column_id: columnID
    })
    setValue(columnID);
    props.setCheckUpdateColumn((value: boolean) => !value)
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const handleOpenModal = (cardId: any) => {
    props.handleToggleModal()
    props.fetchCardById(cardId)
  }

  console.log(dayjs('2024-12-20 14:20:39', dateFormat))

  return (
    <>
      <List.Item>
        <Row style={{ width: "100%" }}>
          <Col style={{ cursor: "pointer" }} span={8} onClick={() => handleOpenModal(props?.item?.card_id)}>
            <Text strong>{props.item.name}</Text>
          </Col>
          <Col span={6}>
            <Select
              showSearch
              placeholder="Chọn danh sách"
              optionFilterProp="label"
              onChange={(value) => onChange(value, props?.item?.card_id)}
              onSearch={onSearch}
              value={value}
              options={
                props?.column.map((item: any, index: number) => ({
                  label: item.name || `Option ${index + 1}`,
                  value: item.column_id || index,
                }))
              }
            />
          </Col>
          <Col span={4}>
            <Flex justify="start">
              {
                props?.item?.userjoin?.map((item: any, key: any) => (
                  <Avatar src={item.avatar?.replace("D:\\DA4\\frontend\\", "")} key={key} title={item.name}>
                  </Avatar>
                ))
              }
            </Flex>
          </Col>
          <Col span={6}>
            <CustomPop title=""
              content={<DateModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                start_date={props?.item?.start_date}
                end_date={props?.item?.end_date}
                timer={props?.item?.timer}
                card_id={props?.item?.card_id}
                isModalDate={false}
                setUpdateDate={props.setUpdateDate} />}
            >
              <Button onClick={handleOpenModalDate}>
                {props?.item?.end_date
                  ? dayjs(props.item.end_date).format("YYYY-MM-DD HH:mm:ss") // Chuyển từ ISO sang datetime
                  : <PlusCircleOutlined />}
              </Button>
            </CustomPop>
          </Col>
        </Row>
      </List.Item>
    </>
  )
}

export default ListItem
