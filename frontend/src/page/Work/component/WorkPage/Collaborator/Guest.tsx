import styles from "./Guest.module.scss";
import classNames from "classnames/bind";
import { Avatar, Button, Divider, Flex, List, Modal, Radio, Select, Typography } from "antd";
import { useOutletContext } from "react-router-dom";
import { createMemberdAPI, getGuestByWorkspaceIdAPI } from "../../../../../services/WorkSpace/workSapce.service";
import { useEffect, useState } from "react";
import { deleteGuestAPI } from "../../../../../services/Board/board.sevice";
import { useToast } from "../../../../../hooks/use-toast";
import { CheckCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import CustomPop from "../../../../../component/PopConfirm/PopConfirm";

const { Title, Text } = Typography
const cx = classNames.bind(styles);

const Guest = () => {
    const { data, idWorkspace } = useOutletContext<{ data: any, idWorkspace: any }>();
    const [dataGuest, setDataGuest] = useState<any>([])
    const { confirm } = Modal;
    const { toast } = useToast();

    // Modal xác nhận xóa
    const showDeleteConfirm = (boardID: any, userID: any) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa không gian làm việc này?',
            icon: <ExclamationCircleFilled />,
            content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDeleteGuest(boardID, userID);
                showUpdateConfirm("Xóa khách thành công", "", "green")
            },
            onCancel() {
            },
        });
    };

    // Modal xác nhận thêm
    const showAddConfirm = (userID: any) => {
        confirm({
            title: 'Bạn có chắc muốn thêm khách vào không gian làm việc?',
            icon: <CheckCircleOutlined />,
            // content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.',
            okText: 'Xác nhận',
            okType: 'default',
            cancelText: 'Hủy',
            onOk() {
                handleCreateMember(userID);
                showUpdateConfirm("Thêm thành công vào không gian làm việc", "", "green")
            },
            onCancel() {
            },
        });
    };

    // Modal thông báo
    const showUpdateConfirm = (title: any, description: any, color: any) => {
        toast({
            title: title,
            description: description,
            variant: "default",
            duration: 5000,
            style: { color: color }
        });
    };

    // Hàm lấy danh sách khách có trong không gian làm việc
    const fetchGetGuest = async () => {
        const response = await getGuestByWorkspaceIdAPI(idWorkspace);
        setDataGuest(response)
    }

    // Call API Xóa khách
    const handleDeleteGuest = async (boardID: any, userID: any) => {
        if (Array.isArray(boardID)) {
            await Promise.all(
                boardID.map(async (id: any) => {
                    await deleteGuestAPI(id.board_id, { user_id: userID });
                })
            );
            const newDataGuest = dataGuest.filter((item: any) => item.user_id !== userID);
            setDataGuest(newDataGuest);
        } else if (boardID) {
            await deleteGuestAPI(boardID, { user_id: userID });

            const newDataGuest = dataGuest.map((user: any) => {
                if (user.user_id === userID) {
                    return {
                        ...user,
                        board: user.board?.filter((board: any) => board.board_id !== boardID),
                    };
                }
                return user;
            }).filter((user: any) => user.board && user.board.length > 0);

            setDataGuest(newDataGuest);
        }
    };

    // Call API Thêm Thành viên
    const handleCreateMember = async (userID: any) => {
        await createMemberdAPI({
            user_id: userID,
            workspace_id: idWorkspace
        })
        const newDataGuest = dataGuest.filter((item: any) => item.user_id !== userID);
        setDataGuest(newDataGuest);
    }

    useEffect(() => {
        fetchGetGuest();
    }, [])

    return (
        <>
            <Title level={4}>Khách ({dataGuest?.length})</Title>
            <Divider></Divider>
            <List
                dataSource={dataGuest}
                renderItem={(item: any) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item?.avatar} />}
                            title={item.name}
                            description={item.email}
                        />
                        {
                            data?.role == "own" ? (
                                <>
                                    <Flex gap={8}>
                                        <CustomPop title={
                                            <>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        textAlign: "center",
                                                        width: "250px"
                                                    }}
                                                >
                                                    <Text>Bảng thông tin không gian làm việc</Text>
                                                    <span style={{ fontSize: 12, fontWeight: 400 }}>
                                                        {item.name} là thành viên của các bảng Không gian làm việc sau:
                                                    </span>
                                                </div>
                                            </>
                                        } content={
                                            <>
                                                {
                                                    item?.board.map((key: any, index: any) => (
                                                        <Flex
                                                            justify="space-between"
                                                            className={cx("hoverable-flex")}
                                                        >
                                                            <Flex justify="start" gap={8} align="center">
                                                                <Avatar src={key?.background} />
                                                                <span>{key.name}</span>
                                                            </Flex>
                                                            <Button type="primary" danger onClick={() => handleDeleteGuest(key.board_id, item.user_id)}>Gỡ</Button>
                                                        </Flex>
                                                    ))
                                                }
                                            </>
                                        }
                                            position={"bottom"}>
                                            <Button title='Xem bảng thông tin' color='default' variant='filled'>Xem bảng thông tin ({item?.board.length})</Button>
                                        </CustomPop>

                                        <Button
                                            onClick={() => showAddConfirm(item.user_id)}
                                            color='default'
                                            variant='filled'
                                        >
                                            Thêm vào Không gian làm việc
                                        </Button>

                                        <Button
                                            onClick={() => showDeleteConfirm(item?.board, item.user_id)}
                                            type="dashed"
                                            danger
                                        >
                                            Xóa khách
                                        </Button>
                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <Select
                                        disabled
                                        value={item.role}
                                        // onChange={}
                                        style={{ width: "110px" }}
                                    >
                                        <Select.Option value="own">Quản trị</Select.Option>
                                        <Select.Option value="member">Thành viên</Select.Option>
                                        <Select.Option value="guest">Khách</Select.Option>
                                    </Select>
                                </>
                            )
                        }
                    </List.Item>
                )}
            />
        </>
    )
}

export { Guest }
