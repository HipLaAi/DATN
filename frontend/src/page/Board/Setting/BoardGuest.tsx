import React, { useState } from 'react';
import { Avatar, Button, Card, Flex, Modal, Select, Typography } from 'antd';
import { ExclamationCircleFilled, UserOutlined } from '@ant-design/icons';
import { deleteGuestAPI, updateRoleGuestAPI } from '../../../services/Board/board.sevice';
import { toast, ToastOptions } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { boardDetailReload } from '../../../features/reloadSlice';

const { Title, Text } = Typography;
const { Option } = Select;

const BoardGuest = (props: any) => {
    const { board } = props;
    const dispatch = useDispatch();
    const { confirm } = Modal;

    // Modal xác nhận xóa
    const showDeleteConfirm = (userID: any) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa không gian làm việc này?',
            icon: <ExclamationCircleFilled />,
            content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDeleteGuest(userID);
            },
            onCancel() {
            },
        });
    };

    // Modal thông báo
    const handleNotification = (message: string, status: "success" | "error") => {
        const toastOptions: ToastOptions = {
            toastId: message,
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        };

        const toastActions = {
            success: () => toast?.success(message, toastOptions),
            error: () => toast?.error(message, toastOptions),
        };

        toastActions[status]?.();
    };

    // API cập nhật quyền của thành viên
    const handleUpdateGuest = async (userID: any, value: any) => {
        if (!checkOwn(userID)) {
            return;
        }

        try {
            await updateRoleGuestAPI({
                board_id: board?.board_id,
                user_id: userID,
                role: value,
            });
            dispatch(boardDetailReload());
            handleNotification("Cập nhật thành công.", "success");
        } catch (error) {
            handleNotification("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
        }
    };

    // API xóa thành viên
    const handleDeleteGuest = async (userID: any) => {
        if (!checkOwn(userID)) {
            return;
        }
        try {
            await deleteGuestAPI(board?.board_id, {
                user_id: userID
            })
            dispatch(boardDetailReload());
            handleNotification("Xóa thành công.", "success");
        } catch (error) {
            handleNotification("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
        }
    }

    // hàm kiểm tra số lượng quản trị viên
    const checkOwn = (userID: any): boolean => {
        const countOwnRoles = board?.guest.filter((item: any) => item.role === "own").length;

        const currentUser = board?.guest.find((item: any) => item.user_id === userID);

        if (countOwnRoles === 1 && currentUser?.role === "own") {
            handleNotification("Phải có ít nhất một Quản trị viên trong bảng.", "error");
            return false;
        }

        return true;
    };

    return (
        <div style={{ margin: 0, padding: 0, border: "none", backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity, 1))" }}>
            <Flex align="center" gap={8} style={{ display: 'flex', alignItems: 'center', margin: "20px 0" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <UserOutlined />
                </div>
                <Title level={5} style={{ margin: 0 }}>
                    Thành viên trong bảng
                </Title>
            </Flex>
            {
                board?.guest.map((item: any, index: any) => (
                    <div style={{ margin: "10px 0", width: "100%" }}>
                        <Flex gap={10} key={index} >
                            <Avatar src={item?.avatar} style={{ width: "100px", height: "70px" }} shape="square" />
                            <Flex vertical style={{ width: "100%" }}>
                                <Text strong>{item?.name}</Text>
                                <Text type="secondary">{item?.email}</Text>
                                <Flex gap={10} style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Select
                                        value={item?.role}
                                        placeholder="Quyền"
                                        style={{ width: '100%', margin: "5px 0" }}
                                        getPopupContainer={(trigger: any) => trigger.parentNode}
                                        onChange={(value) => handleUpdateGuest(item?.user_id, value)}
                                    >
                                        <Option key={"own"} value={"own"}>
                                            Quản trị viên
                                        </Option>
                                        <Option key={"guest"} value={"guest"}>
                                            Thành viên
                                        </Option>
                                    </Select>
                                    <Button danger onClick={() => showDeleteConfirm(item?.user_id)}>-</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>

                ))
            }

        </div>
    );
};

export default BoardGuest;
