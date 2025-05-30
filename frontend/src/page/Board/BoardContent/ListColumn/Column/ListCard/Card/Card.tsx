import { Avatar, Button, Card as CardAntd, Checkbox, Col, Flex, Input, Radio, Typography } from "antd";
import { ClockCircleOutlined, CommentOutlined, EditOutlined, EyeOutlined, FileTextOutlined, MinusOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '../../../../BoardContent.module.scss';
import { Card as CardModel } from "../../../../../../../model/CardModel";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useOutletContext } from "react-router-dom";
import CustomPop from "../../../../../../../component/PopConfirm/PopConfirm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateInformationCard } from "../../../../../../../services/Card/Card.service";
import { Title } from "@radix-ui/react-dialog";
import dayjs from "dayjs";

const cx = classNames.bind(styles);

interface Props {
  action?: boolean;
  card: CardModel;
}
const { Text } = Typography

const Card: React.FC<Props> = ({ action = false, card }) => {
  const {
    handleToggleModal,
    fetchCardById
  } = useOutletContext<{ handleToggleModal: any, fetchCardById: any }>()
  const [toggleEditCard, setToggleEditCard] = useState<boolean>(false)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.card_id, data: { ...card } });
  const [cardName, setCardName] = useState(card?.name);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '3px solid #81ecec' : undefined,
    width: "100%",
    padding: card?.FE_PlaceholderCard ? "0px" : "10px",
    visibility: card?.FE_PlaceholderCard ? "hidden" : "visibility",
    // display: card?.FE_PlaceholderCard ? "none" : "block",
  };

  const handleOpenModal = (cardId: any) => {
    handleToggleModal()
    fetchCardById(cardId)
  }

  const handleEditCard = (e: any) => {
    e.stopPropagation()
    setToggleEditCard(!toggleEditCard)
  }

  const cardDetailReload = useSelector(
    (state: any) => state.reload.cardDetailReload
  );

  //Hàm cập nhật thông tin (tên) thẻ
  const handleUpdateInformationCard = async () => {
    setToggleEditCard(!toggleEditCard)
    try {
      await updateInformationCard(card?.card_id, {
        name: cardName,
        description: card?.description
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCardById(card.card_id)
  }, [cardDetailReload])

  const currentDate = dayjs(); // Ngày hiện tại
  const endDate = dayjs(card?.end_date);

  // Xác định màu sắc
  const backgroundColor =
    card?.status === "true"
      ? "rgb(15 206 15)"
      : endDate.isBefore(currentDate)
        ? "#ff5a5c"
        : "yellow";

  return (
    <>
      <CardAntd
        ref={setNodeRef} style={style} {...attributes} {...listeners}
        className={cx('list-card-item')}

        styles={{
          body: {
            padding: '0px'
          }
        }}
        // cover={card?.background ?
        //   <img
        //     alt="example"
        //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //   /> : null
        // }
        onClick={() => handleOpenModal(card.card_id)}
      >
        <Flex align="center" justify="space-between" gap="10px">
          {
            card?.status === 'true' ? (
              <Checkbox
                disabled
                checked={true}
                style={{
                  backgroundColor: '#1cf11c',
                  borderRadius: "5px",
                  height: "15px"
                }}
              />
            ) : (
              <></>
            )
          }

          {
            toggleEditCard ? (
              <Input value={cardName}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setCardName(e.target.value)}
                onPressEnter={handleUpdateInformationCard}
              />
            ) : (
              <>
                <Text style={{ marginLeft: "5px" }}>{cardName}</Text>
              </>
            )
          }

          <CustomPop>
            <Button
              type="text"
              shape="circle"
              className={cx("btn-edit")}
              onClick={(e) => handleEditCard(e)}
            >
              <EditOutlined />
            </Button>
          </CustomPop>
        </Flex>
        {/* {
          action ? (
            <div className={cx('flex', 'card-action')}>
              <EyeOutlined />
              <div className={cx("card-action-deadline")}>
                4th12
              </div>
              <CommentOutlined />
              <FileTextOutlined />
            </div>
          ) : <></>
        } */}
        <Flex justify="end" vertical={true} gap={10}>
          <Flex>
            {
              card?.userjoin?.map((item: any, key: any) => (
                <Avatar src={item.avatar?.replace("D:\\DA4\\frontend\\", "")} key={key}>
                  <UserOutlined />
                </Avatar>
              ))
            }
          </Flex>
          <Flex gap={10} wrap="wrap">
            {
              card?.label?.map((item: any, key: any) => (
                <Button
                  key={key}
                  type="text"
                  style={{
                    backgroundColor: item?.background,
                    width: "50px",
                    height: "10px",
                    wordWrap: "break-word",
                  }}
                >
                </Button>
              ))
            }
          </Flex>
          {
            card?.end_date ? (
              <>
                <Flex
                  gap={10}
                  wrap="wrap"
                  style={{
                    backgroundColor,
                    padding: "1px 5px",
                    borderRadius: "8px",
                    alignItems: "center",
                    width: "150px"
                  }}
                >
                  <ClockCircleOutlined />
                  <span>{dayjs(card?.start_date).format("DD/MM")}</span>
                  -
                  <span>{dayjs(card?.end_date).format("DD/MM")}</span>
                </Flex>
              </>
            ) : (
              <></>
            )
          }
        </Flex>
      </CardAntd >

    </>
  );
};

export default Card;
