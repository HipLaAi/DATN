import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BoardContent.module.scss';
import {
  closestCorners,
  CollisionDetection,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  getFirstCollision,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';
import ListColumn from "./ListColumn/ListColumn";
import { Board } from '../../../model/BoardModel';
import { Column as ColumnModel } from '../../../model/ColumnModel';
import { Card as CardModel } from '../../../model/CardModel';
import Column from './ListColumn/Column';
import Card from './ListColumn/Column/ListCard/Card/Card';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { generatePlaceholderCard } from '../../../utils/format';
import { MouseSensor, TouchSensor } from '../../../customLibrary';
const cx = classNames.bind(styles);
type UniqueIdentifier = string | number;
const ACTIVE_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD"
};

const BoardContent: React.FC = () => {
  const { board, moveCard, boardFilter } = useOutletContext<{ board: Board, moveCard: any, boardFilter: any }>();
  const [sortedColumn, setSortedColumn] = useState<ColumnModel[]>([]);
  const [dragItemType, setDragItemType] = useState<string | null>(null);
  const [dragItemId, setDragItemId] = useState<ColumnModel["column_id"] | CardModel["card_id"] | null>(null);
  const [dragItemData, setDragItemData] = useState<ColumnModel | CardModel | null>(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<ColumnModel | null>()
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 500, tolerance: 5 } });
  const sensor = useSensors(pointerSensor, mouseSensor, touchSensor)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const { moveColumn } = useOutletContext<{ moveColumn: any }>()

  useEffect(() => {
    if (!(boardFilter.length == 0)) {
      if (boardFilter?.column) {
        setSortedColumn(boardFilter?.column);
      }
    }
    else if (board?.column) {
      setSortedColumn(board?.column);
    }


  }, [board, boardFilter]);

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };
  const findColumnByCardId = (cardId: UniqueIdentifier) => {
    return sortedColumn.find(column => column?.card?.map(card => card.card_id).includes(cardId as string));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setDragItemId(event?.active?.id.toString());
    setDragItemType(event?.active?.data?.current?.card_id ? ACTIVE_ITEM_TYPE.CARD : ACTIVE_ITEM_TYPE.COLUMN);
    setDragItemData(event?.active?.data?.current as CardModel);
    setOldColumnWhenDraggingCard(findColumnByCardId(event?.active.id))

  };
  const handleDragOver = (event: DragOverEvent) => {
    if (dragItemType === ACTIVE_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;
    if (!active || !over) return;
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
    const { id: overCardId } = over;
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);
    if (!activeColumn || !overColumn) return;
    if (activeColumn.column_id !== overColumn.column_id) {
      setSortedColumn(prevColumns => {
        const overCardIndex = overColumn?.card?.findIndex(card => card.card_id === overCardId);
        let newCardIndex: number;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.card.length + 1;
        const nextColumn = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumn.find(column => column.column_id === activeColumn.column_id)
        const nextOverColumn = nextColumn.find(column => column.column_id === overColumn.column_id)
        if (nextActiveColumn) {
          nextActiveColumn.card = nextActiveColumn.card.filter(card => card.card_id !== activeDraggingCardId)
        }
        if (nextOverColumn) {
          nextOverColumn.card = nextOverColumn.card.filter(card => card.card_id !== activeDraggingCardId)
          nextOverColumn.card.splice(
            newCardIndex,
            0,
            { ...activeDraggingCardData as CardModel, column_id: nextOverColumn.column_id }
          )
        }
        return nextColumn;
      });
    };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;
    if (dragItemType === ACTIVE_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
      const { id: overCardId } = over;
      const activeColumn = oldColumnWhenDraggingCard;
      const overColumn = findColumnByCardId(overCardId);
      if (!activeColumn || !overColumn) return
      if (oldColumnWhenDraggingCard?.column_id !== overColumn.column_id) {
        setSortedColumn(prevColumn => {
          const overCardIndex = overColumn?.card?.findIndex(card => card.card_id === overCardId)

          let newCardIndex
          const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1 : 0
          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card?.length + 1

          const nextColumns = cloneDeep(prevColumn)
          const nextActiveColumn = nextColumns.find(column => column.column_id === activeColumn.column_id)
          const nextOverColumn = nextColumns.find(column => column.column_id === overColumn.column_id)

          if (nextActiveColumn) {
            //kiem tra card dang keo va xoa no khoi column hien tai
            nextActiveColumn.card = nextActiveColumn.card.filter(card => card.card_id !== activeDraggingCardId)
            //Them card placeholder neu column rong
            if (isEmpty(nextActiveColumn.card)) {
              nextActiveColumn.card = [generatePlaceholderCard(nextActiveColumn)]
            }

            //Cap nhat lai mang orderCardIds
            nextActiveColumn.cardOrderIds = nextActiveColumn.card.map(card => card.card_id)
          }

          if (nextOverColumn) {
            //kiem tra card dang keo co ton tai o overColumn chua neu co thi xoa no truoc
            nextOverColumn.card = nextOverColumn.card.filter(card => card.card_id !== activeDraggingCardId)

            //Xoa placeholderCard neu no ton tai trong column dinh keo card toi
            nextOverColumn.card = nextOverColumn.card.filter(card => !card.FE_PlaceholderCard)

            //tiep theo them card dang keo vao overColumn theo vi tri moi
            nextOverColumn.card.splice(
              newCardIndex,
              0,
              { ...activeDraggingCardData as CardModel, column_id: nextOverColumn.column_id })
            nextOverColumn.cardOrderIds = nextOverColumn.card.map(card => card.card_id)
          }

          moveCard(overColumn, activeDraggingCardId, nextColumns, activeColumn, sortedColumn)
          return nextColumns
        })
      }
      else {
        const oldCardIndex = oldColumnWhenDraggingCard?.card?.findIndex(card => card.card_id == dragItemId);
        const newCardIndex = overColumn?.card?.findIndex(c => c.card_id == overCardId);
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard.card, oldCardIndex, newCardIndex)
        setSortedColumn(prveColumn => {
          const nextColumns = cloneDeep(prveColumn)
          const targetColumn = nextColumns.find(column => column.column_id === overColumn.column_id)
          if (targetColumn?.card) {
            targetColumn.card = dndOrderedCards
          }
          moveCard(overColumn, activeDraggingCardId, nextColumns, activeColumn)
          return nextColumns
        })

      }
    }
    if (dragItemType === ACTIVE_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = sortedColumn.findIndex(column => column.column_id === active.id);
        const newIndex = sortedColumn.findIndex(column => column.column_id === over.id);
        const dndSortedColumn = arrayMove(sortedColumn, oldIndex, newIndex);
        setSortedColumn(dndSortedColumn)
        moveColumn(dndSortedColumn)
      }

    }
    setDragItemId(null)
    setDragItemType(null);
    setDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  };


  //custom that toan va cham khi keo tha card giua nhieu column
  //args la cac tham so
  const collisionDetectionStrategy: CollisionDetection = useCallback((args) => {
    //truong hop keo column thi dung thuat toan mac dinh cua collisionDetection la closestCorners hoac closestCenter
    if (dragItemType === ACTIVE_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args }) || []
    }

    //tim cac diem giao nhau voi con tro
    const pointerIntersections = pointerWithin(args)
    // console.log(pointerIntersections)
    if (!pointerIntersections?.length) return lastOverId.current ? [{ id: lastOverId.current }] : [];

    //thuat toan phat hien va cham tra ve cac mang va cham
    // const intersections = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)
    // console.log(intersections)

    //tim overId dau tien trong mang va cham ben tren
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      //tim cot duoc keo den
      const checkColumn = sortedColumn.find(column => column.column_id === overId)
      // console.log(checkColumn)
      // console.log(closestCenter({ ...args }))
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => (
            container.id !== overId && (checkColumn?.cardOrderIds?.includes(container.id))
          ))
        })[0]?.id
        // console.log(overId)
      }
      if (lastOverId?.current) {
        lastOverId.current = overId
      }
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []

  }, [dragItemType, sortedColumn])



  return (
    <>
      <Outlet />
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensor}
        collisionDetection={collisionDetectionStrategy}

      >
        <div className={cx('board-content')}>
          <ListColumn columns={sortedColumn} />
        </div>
        <DragOverlay dropAnimation={dropAnimation}>
          {(!dragItemId || !dragItemType) && null}
          {(dragItemId && dragItemType === ACTIVE_ITEM_TYPE.COLUMN) && <Column column={dragItemData as ColumnModel} />}
          {(dragItemId && dragItemType === ACTIVE_ITEM_TYPE.CARD) && <Card card={dragItemData as CardModel} />}
        </DragOverlay>
      </DndContext>
    </>

  );
};

export default BoardContent;
