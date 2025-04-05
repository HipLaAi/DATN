import React, { useEffect, useState } from 'react';
import { Col, List, Row, Typography } from "antd";
import ListItem from "./ListItem/ListItem";
import { useOutletContext, useParams } from "react-router-dom";
import { getAllCardByBoardIdAPI } from "../../../../services/Card/Card.service";
import { getAllColumnByBoardIdAPI } from "../../../../services/Column/Column.service";

const { Text } = Typography

const App: React.FC = () => {
  const { id } = useParams();
  const [card, setCard] = useState<any[]>([])
  const [column, setColumnData] = useState<any[]>([])
  const {setCheckUpdateColumn, handleToggleModal, fetchCardById} = useOutletContext<{setCheckUpdateColumn: any, handleToggleModal: any, fetchCardById: any}>();
  const [updateDate, setUpdateDate] = useState(false);

  const fetchData = async () => {
    const card = await getAllCardByBoardIdAPI(id);
    const column = await getAllColumnByBoardIdAPI(id);
    setColumnData(column);
    setCard(card);
  }


  useEffect(() => {
    fetchData();
  }, [handleToggleModal, updateDate])


  return (
    <>
      <div style={{ backgroundColor: "white", marginTop: "10px", marginBottom: "10px", padding: "10px", paddingLeft: "30px", borderRadius: "5px" }}>
        <Row >
          <Col span={8}>
            <Text strong>Thẻ</Text>
          </Col>
          <Col span={6}>
            <Text strong>Danh sách</Text>
          </Col>
          <Col span={4}>
            <Text strong>Thành viên</Text>
          </Col>
          <Col span={6}>
            <Text strong>Ngày hết hạn</Text>
          </Col>
        </Row>
        <List
          style={{
            height: "79.5vh", width: "100%", backgroundColor: "white", overflowY: "auto"
          }}
          itemLayout="horizontal"
          dataSource={card}
          renderItem={(item, index) => (
            <ListItem 
            item={item} 
            column={column} 
            setCheckUpdateColumn={setCheckUpdateColumn} 
            handleToggleModal={handleToggleModal} 
            fetchCardById={fetchCardById} 
            setUpdateDate={setUpdateDate}/>
          )}

        />
      </div>
    </>
  )
};

export default App;
