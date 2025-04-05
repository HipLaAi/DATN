import React, { useEffect, useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Avatar, Badge, Calendar, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import { useOutletContext, useParams } from 'react-router-dom';
import { getAllCardByBoardIdAPI } from '../../../../services/Card/Card.service';
import dayjs from 'dayjs';

const Schedule: React.FC = () => {

  const { id } = useParams();
  const [card, setCard] = useState<any[]>([])
  const {handleToggleModal, fetchCardById} = useOutletContext<{handleToggleModal: any, fetchCardById: any}>();

  const handleOpenModal = (cardId: any) => {
    handleToggleModal()
    fetchCardById(cardId)
  }

  const fetchData = async () => {
    const card = await getAllCardByBoardIdAPI(id);
    setCard(card);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const getListData = (value: Dayjs) => {
    return card.filter((card) => {
      const cardStart = dayjs(card.start_date);
      const cardEndDate = dayjs(card.end_date);
      return (value.isSame(cardStart, 'day') || value.isAfter(cardStart, 'day')) &&
        (value.isSame(cardEndDate, 'day') || value.isBefore(cardEndDate, 'day'));
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <div style={{ position: "relative", height: "100%" }}>
        {listData?.map((item, index) => (
          <div
            key={item.card_id}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f6ffed",
              border: "1px solid #b7eb8f",
              borderRadius: "8px",
              padding: "4px 8px",
              marginBottom: "4px",
            }}
            onClick={() => handleOpenModal(item.card_id)}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "#52c41a",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            ></span>
            <span style={{ flex: 1 }}>{item.name}</span>
            <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
              {item?.userjoin?.map((user: any) => (
                <Tooltip title={user?.name}>
                  <Avatar src={user?.avatar?.replace("D:\\DA4\\frontend\\", "")}></Avatar>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };


  return <Calendar cellRender={cellRender} style={{
    marginTop: "10px", marginBottom: "10px",
    padding: "5px", borderRadius: "5px",
    overflowY: "auto", height: "85.5vh"
  }} />;
};

export default Schedule;