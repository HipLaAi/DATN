import { useDebounce } from '@uidotdev/usehooks';
import { Avatar, Flex, Input, List, Modal, Spin, Typography, Tag, Button } from 'antd';
import { useEffect, useState } from 'react';
import { search } from '../../../../services/User/user.service';
import { createMemberdAPI } from '../../../../services/WorkSpace/workSapce.service';

const { Title, Text } = Typography;

const ModalCreateMember = (props: any) => {
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchEmail, 500);

  const fetchSearchUser = async () => {
    setLoading(true);
    try {
      const response = await search({ email: debouncedSearch });
      setData(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (debouncedSearch.length > 2) {
      fetchSearchUser();
    }
  }, [debouncedSearch]);

  const handleItemClick = (item: any) => {
    const isSelected = selectedUsers.some(user => user.email === item.email);

    if (!isSelected) {
      setSelectedUsers([...selectedUsers, item]);
    }

    setSearchEmail("");
  };

  const handleRemoveUser = (email: string) => {
    setSelectedUsers(selectedUsers.filter(user => user.email !== email)); // Loại bỏ mục được click
  };
  const handleCreateMember = async()=> {
    const response = await createMemberdAPI({
      user_id:selectedUsers.map(item=>item.user_id).toString(),
      workspace_id:props.id
    })
    props.handleToggleModal()
  }
  return (
    <>
      <Modal
        title={
          <Flex justify="center">
            <Title level={4} style={{ margin: "8px" }}>Mời vào không gian làm việc</Title>
          </Flex>
        }
        open={props.toggleModal}
        onCancel={props.handleToggleModal}
        footer={null}
      >
        <Flex vertical align="center">
          <Flex wrap gap="10px" style={{ marginBottom: '10px' }}>
            {selectedUsers.map(user => (
              <Tag
                key={user.email}
                closable
                onClose={() => handleRemoveUser(user.email)}
                style={{ cursor: 'pointer', padding: " 5px 10px" }}
              >
                <Text strong>{user.name}</Text>
              </Tag>
            ))}
          </Flex>
          <Flex gap="10px" style={{ width: "100%" }}>          
            <Input
              placeholder="Địa chỉ email"
              style={{ width: "100%" }}
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            {
              (selectedUsers.length >0) && <Button type='primary' onClick={handleCreateMember}>Mời</Button>
            }
          </Flex>


          {!loading ? (
            debouncedSearch.length > 2 && (
              <List
                style={{ width: "100%" }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item: any) => (
                  <List.Item onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                    <Flex align='center' gap="10px">
                      <Avatar src={item.avatar.replace("D:\\DA4\\frontend\\", "")} />
                      <Text strong>{item.name}</Text>
                    </Flex>
                  </List.Item>
                )}
              />
            )
          ) : (
            <Spin style={{ marginTop: "10px" }} />
          )}
        </Flex>
      </Modal>
    </>
  );
};

export default ModalCreateMember;
