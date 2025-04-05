import { useRef, useState } from "react";
import classNames from 'classnames/bind';
import styles from '../BoardContent.module.scss';
import { Flex, Row, Col, Button, Input } from "antd";
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useOutletContext } from "react-router-dom";
import { CloseOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import Column from "./Column";
import { Column as ColumnModel } from "../../../../model/ColumnModel";

const cx = classNames.bind(styles);
interface Props {
  columns: ColumnModel[];
}

const ListColumn: React.FC<Props> = ({ columns }) => {
  const [openNewColumnform, setOpenNewColumnFomr] = useState(false);
  const { createNewColumn } = useOutletContext<{ createNewColumn: any }>()
  const [title, setTitle] = useState<string | "">("")
  const inputRef = useRef<InputRef>(null);
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnFomr(!openNewColumnform)
  }
  const handleAddNewColumn = () => {

    const newColumnData = {
      name: title,
      status: "public"
    }
    createNewColumn(newColumnData);
    setTitle("");
    inputRef.current?.focus(); 
  }
  return (
    <>
      <SortableContext items={columns.map(column => column?.column_id) ?? []} strategy={horizontalListSortingStrategy}>
        <Row justify='center' style={{ height: '100%' }}>
          <Col span={24} style={{ height: '100%' }}>
            <Flex gap={20} className={cx('list-column')}>
              {
                columns?.map(((column) => <Column key={column.column_id} column={column} />))
              }

              {openNewColumnform
                ? (<Flex
                justify="center"
                  vertical
                  gap="10px"
                  className={cx("column")}
                  style={{ height: "fit-content" }}>
                  <Input placeholder="Nhập tên danh sách"
                  ref={inputRef}
                    variant="outlined"
                    data-no-dnd="true"
                    size="large"
                    autoFocus
                    required
                    style={{ width: "95%", marginTop: "5px" }}
                    value={title} onChange={(e) => setTitle(e.target.value)}
                  />
                  <Flex gap="10px">
                    <Button type='primary' data-no-dnd="true" style={{ width: "40%" }} onClick={handleAddNewColumn}>Thêm danh sách</Button>
                    <CloseOutlined onClick={toggleOpenNewColumnForm} />
                  </Flex>
                </Flex>)
                : <Button onClick={toggleOpenNewColumnForm}>+ Thêm danh sách khác</Button>
              }
            </Flex>
          </Col>
        </Row>
      </SortableContext>
    </>
  );
};

export default ListColumn;
