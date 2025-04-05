import classNames from 'classnames/bind';
import styles from '../BoardContent.module.scss';
import ListCard from './Column/ListCard/ListCard';
import { Column as ColumnModel } from '../../../../model/ColumnModel';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Flex, Input, InputRef, Menu, Typography } from 'antd';
import { Button } from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { TbCopy } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IoMdMore } from "react-icons/io";
import CustomPop from '../../../../component/PopConfirm/PopConfirm';


const cx = classNames.bind(styles);
const { Text } = Typography
interface Props {
  column: ColumnModel;
}

const Column: React.FC<Props> = ({ column }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column?.column_id, data: { ...column } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    height: '100%',
  };
  const { createNewCard, deleteColumn } = useOutletContext<{ createNewCard: any, deleteColumn:any }>()
  const [openNewCardform, setOpenNewCardForm] = useState(false)
  const [cardName, setCardName] = useState<string | "">("")
  const inputRef = useRef<InputRef>(null)
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardform)
  }

  const handleAddNewCard = () => {
    const cardData = {
      name: cardName,
      column_id: column.column_id
    }
    createNewCard(cardData);
    setCardName("")
    inputRef.current?.focus()
  }
  const handleDeleteColumn = (columnId:string)=> {
    deleteColumn(columnId)
  }
  return (
    <>
      <div ref={setNodeRef}  {...attributes} style={style}>
        <div className={cx('column')} {...listeners}>
          <Flex justify='space-between' align='center' style={{ marginBottom: "5px" }}>
            <Input value={column?.name} data-no-dnd="true" className={cx("column-title")} />
            <CustomPop title="" content={
              <>
                <Menu
                  style={{ width: 256 }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  items={[
                    {
                      key: '0',
                      label: <>
                        <Flex justify="center">
                          <Text strong>Thao tác</Text>
                        </Flex>
                      </>,
                      disabled: true
                    },
                    {
                      type: "divider"
                    },
                    {
                      key: '1',
                      label: "",
                      type: "group",
                      children: [
                        {
                          key: '0',
                          icon: <DeleteOutlined />,
                          label:
                            <>
                              <Flex style={{width:"100%"}}>
                                <Text style={{width:"100%"}} onClick={()=>handleDeleteColumn(column.column_id)}>Xóa cột</Text>
                              </Flex>
                            </>,
                        }
                      ]
                    }

                  ]}
                />
              </>
            }>
              <Button type='text' shape='circle'>
                <IoMdMore />
              </Button>
            </CustomPop>
          </Flex>
          <ListCard cards={column?.card} />
          <div className={cx('column-action')}>
            {
              !openNewCardform
                ? (<>
                  <Button iconPosition='start' type='text' icon={<IoMdAdd />} onClick={toggleOpenNewCardForm}>Thêm thẻ</Button>
                  <Button type='text' icon={<TbCopy />} />
                </>)
                : (<Flex gap="10px" justify='center' align='center'>
                  <Input
                    ref={inputRef}
                    placeholder="Nhập tên thẻ"
                    autoFocus variant="outlined"
                    data-no-dnd="true"
                    size="large" style={{ width: "100%" }}
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                  <Button type='primary' data-no-dnd="true" onClick={handleAddNewCard}>Thêm thẻ</Button>
                  <CloseOutlined onClick={toggleOpenNewCardForm} />
                </Flex>)
            }
          </div>
        </div>
      </div>
    </>

  );
};

export default Column;
