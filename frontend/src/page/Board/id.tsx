import { createGuestdAPI, getBoarByIdAPI, updateBoarDetailsdAPI } from "../../services/Board/board.sevice";
import BoardBar from "./BoardBar/BoardBar";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { Board } from "../../model/BoardModel";
import { createColumndAPI, deleteColumndAPI, updateColumndAPI } from "../../services/Column/Column.service";
import { Column } from "../../model/ColumnModel";
import { Card } from "../../model/CardModel";
import { createCardAPI, getCardByIddAPI } from "../../services/Card/Card.service";
import CardDialog from "../../component/CardDialog/CardDialog";
import { generatePlaceholderCard } from "../../utils/format";
import { isEmpty } from "lodash";
import { ToastContainer } from "react-toastify";

const BoardDetials = () => {
    const { boardFilter } = useOutletContext<{ boardFilter: any }>();
  const { id } = useParams()
  const [board, setBoard] = useState<Board>()
  const [cardData, setCardData] = useState<Card>()
  const fetchBoardDetailsAPI = async () => {
    const response: Board = await getBoarByIdAPI(id);
    response?.column?.forEach(column => {
      if (isEmpty(column.card)) {
        column.card = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column).column_id]
      }
    })
    setBoard(response)
  }
  //column
  const moveCard = (
    overColumn: any,
    activeDraggingCardId: any,
    nextColumns: Column[],
    activeColumn: any,
  ) => {
    const moveCardData = {
      column_id: overColumn.column_id,
      card_id: activeDraggingCardId,
      card_id_order_old: nextColumns.find(column => column.column_id === activeColumn.column_id)?.card.map(c => c.card_id).toString(),
      card_id_order_new: nextColumns.find(column => column.column_id === overColumn.column_id)?.card.map(c => c.card_id).toString()
    }
    const newBoard = { ...board }
    newBoard.column = nextColumns
    setBoard(newBoard as Board)
    updateColumndAPI(moveCardData)
  }
  //board
  const createNewColumn = async (columnData: Column) => {
    const response = await createColumndAPI({
      ...columnData,
      board_id: id
    })
    const newBoard = { ...board }
    if (!newBoard.column) {
      newBoard.column = []
    }
    response.card = [generatePlaceholderCard(response)]
    newBoard.column?.push(response)
    newBoard.columnOrderIds?.push(response.column_id)
    setBoard(newBoard as Board)
  }
  const moveColumn = (sortedColumn: Column[]) => {
    const sortedColumnIds = sortedColumn.map(c => c.column_id)
    const newBoard = { ...board }
    newBoard.column = sortedColumn
    newBoard.columnOrderIds = sortedColumnIds
    setBoard(newBoard as Board)
    const dataUpdate = {
      column_id_order: sortedColumnIds,
      board_id: board?.board_id
    }
    updateBoarDetailsdAPI(dataUpdate)
  }
  const deleteColumn = async (columnId: string) => {
    const newBoard = { ...board }
    newBoard.column = newBoard.column?.filter((c) => c.column_id !== columnId)
    setBoard(newBoard as Board)
    await deleteColumndAPI(columnId)
  }
  //card
  const createNewCard = async (cardData: Card) => {
    const response = await createCardAPI({
      ...cardData,
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.column?.find(column => column.column_id === response.column_id)
    if (columnToUpdate) {
      if (!columnToUpdate?.card) {
        columnToUpdate.card = []
      }
      const { column_id, ...cardWithoutColumnId } = response;
      if (columnToUpdate.card.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.card = [cardWithoutColumnId]
        columnToUpdate.cardOrderIds = [cardWithoutColumnId]
      } else {
        columnToUpdate.card?.push(cardWithoutColumnId)
        columnToUpdate.cardOrderIds?.push(cardWithoutColumnId?.card_id)
      }
    }
    setBoard(newBoard as Board)
  }
  const fetchCardById = async (cardId: Card) => {
    const result = await getCardByIddAPI(cardId);
    setCardData(result)
  }
  const deleteCard = async (cardId: string) => {
    console.log(cardId)
  }

  const [toggleModel, setToggleModal] = useState(false);

  const [checkUpdateColumn, setCheckUpdateColumn] = useState(false);

  useEffect(() => {
    fetchBoardDetailsAPI()
  }, [id, toggleModel, checkUpdateColumn])


  const handleToggleModal = () => {
    setToggleModal(!toggleModel);
  };
  
  const handleCreateGuest = async () => {
    const response = await createGuestdAPI({
      board_id: board?.board_id
    })
  }

  console.log(board?.guest);

  return (
    <>
      <ToastContainer />
      <CardDialog
        board= {board}
        isModalOpen={toggleModel}
        cardData={cardData}
        handleToggleModal={handleToggleModal}
      />
      <BoardBar board={board} handleCreateGuest={handleCreateGuest} setCheckUpdateColumn={setCheckUpdateColumn}/>
      <Row justify="center" style={{
        backgroundImage: `url(${board?.background?.replace("D:\\DA4\\frontend\\", "").replaceAll("\\", "\\\\")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        objectFit: "cover"
      }}>
        <Col span={23} >
          <Outlet context={{
            board: board,
            boardFilter: boardFilter,
            fetchCardById: fetchCardById,
            createNewCard: createNewCard,
            moveCard: moveCard,
            deleteCard: deleteCard,
            createNewColumn: createNewColumn,
            moveColumn: moveColumn,
            deleteColumn: deleteColumn,
            handleToggleModal: handleToggleModal,
            setCheckUpdateColumn: setCheckUpdateColumn
          }} />
        </Col>
      </Row>
    </>
  );
};

export default BoardDetials;
