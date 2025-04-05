import { Avatar, Button, Card as CardAntd, Flex, Input, Typography } from "antd";
import { CommentOutlined, EditOutlined, EyeOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '../../../../BoardContent.module.scss';
import { Card as CardModel } from "../../../../../../../model/CardModel";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useOutletContext } from "react-router-dom";
import CustomPop from "../../../../../../../component/PopConfirm/PopConfirm";
import { useState } from "react";

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
        cover={card?.background ?
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          /> : null
        }
        onClick={() => handleOpenModal(card.card_id)}

      >
        <Flex align="center" justify="space-between" gap="10px">
          {
            toggleEditCard ? (
              <Input value={card?.name} onClick={(e) => e.stopPropagation()} />
            ) : (
              <>
                <Text style={{ marginLeft: "5px" }}>{card?.name}</Text>
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
        {
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
        }
        <Flex justify="end">
          {
            card?.userjoin?.map((item: any, key: any) => (
              <Avatar src={item.avatar?.replace("D:\\DA4\\frontend\\", "")} key={key}>
                <UserOutlined />
              </Avatar>
            ))
          }
        </Flex>
      </CardAntd >

    </>
  );
};

export default Card;
