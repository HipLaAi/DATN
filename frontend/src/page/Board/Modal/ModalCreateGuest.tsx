import { useDebounce } from '@uidotdev/usehooks';
import { Avatar, Flex, Input, List, Modal, Spin, Typography, Tag, Button } from 'antd';
import { useEffect, useState } from 'react';
import { search } from '../../../services/User/user.service';
import { useParams } from 'react-router-dom';
import { createGuestdAPI } from '../../../services/Board/board.sevice';

const { Title, Text } = Typography;

const ModalCreateGuest = (props: any) => {
    const [searchEmail, setSearchEmail] = useState<string>("");
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const debouncedSearch = useDebounce(searchEmail, 500);

    useEffect(() => {
        if (debouncedSearch.length > 2) {
            props.fetchSearchUser(debouncedSearch);
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

    return (
        <>
            <Modal
                title={
                    <Flex justify="center">
                        <Title level={4} style={{ margin: "8px" }}>Mời tham gia vào bảng</Title>
                    </Flex>
                }
                open={props.openModal}
                onCancel={props.handleOpenModal}
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
                            (selectedUsers.length > 0) && <Button type='primary' onClick={() => props.handleCreateMember(selectedUsers)}>Mời</Button>
                        }
                    </Flex>


                    {!props.loading ? (
                        debouncedSearch.length > 2 && (
                            <List
                                style={{ width: "100%" }}
                                itemLayout="horizontal"
                                dataSource={props.data}
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

export default ModalCreateGuest;
