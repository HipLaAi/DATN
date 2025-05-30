import React, { useEffect, useState } from "react";
import { Menu, Badge, Avatar, Divider, Flex, Button, Modal } from "antd";
import {
    InfoCircleOutlined,
    AppstoreOutlined,
    InboxOutlined,
    SettingOutlined,
    PictureOutlined,
    CalendarOutlined,
    ToolOutlined,
    TagsOutlined,
    EyeOutlined,
    MailOutlined,
    CopyOutlined,
    ShareAltOutlined,
    TableOutlined,
    DeleteOutlined,
    ExclamationCircleFilled,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import CustomPop from "../../../component/PopConfirm/PopConfirm";
import { getSettingWorkspaceAPI } from "../../../services/Setting/settingWorkspace.service";
import { getWorkSpacedByIdAPI } from "../../../services/WorkSpace/workSapce.service";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoardAPI, deleteGuestAPI } from "../../../services/Board/board.sevice";
import { URL } from "../../../utils/url";
import { useDispatch } from "react-redux";
import { boardReload } from "../../../features/reloadSlice";
import { toast, ToastOptions } from 'react-toastify';
import decodeJWT from "../../../services/Auth/auth.service ";


const groupedItems = [
    {
        group: "Thông tin",
        items: [
            {
                key: "Thông tin bảng",
                icon: <InfoCircleOutlined style={{ fontSize: "16px" }} />,
                label: "Thông tin bảng",
            },
            {
                key: "Cài đặt",
                icon: <SettingOutlined style={{ fontSize: "16px" }} />,
                label: "Cài đặt",
            },
        ],
    },
    {
        group: "Tùy chỉnh",
        items: [
            {
                key: "Trường tùy chỉnh",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Trường tùy chỉnh",
            },
            {
                key: "Hoạt động",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Hoạt động",
            },
            {
                key: "Mục lưu trữ",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Mục lưu trữ",
            },
        ],
    },
    {
        group: "Công cụ",
        items: [
            {
                key: "Sao chép bảng",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Sao chép bảng",
            },
            {
                key: "Lọc",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Lọc theo",
            },
        ],
    },
    {
        group: "Chia sẻ",
        items: [
            {
                key: "In, xuất và chia sẻ",
                icon: <ShareAltOutlined style={{ fontSize: "16px" }} />,
                label: "In, xuất và chia sẻ"
            },
        ],
    },
    {
        group: "Quản lý",
        items: [
            {
                key: "Xóa bảng",
                icon: <TableOutlined style={{ fontSize: "16px" }} />,
                label: "Xóa bảng",
                action: () => alert("Bảng đã được xóa")
            },
            {
                key: "Tạo cuộc họp",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Tạo cuộc họp"
            },
            {
                key: "Tin nhắn nhóm",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Tin nhắn nhóm"
            },
            {
                key: "Thay đổi hình nền",
                icon: <ToolOutlined style={{ fontSize: "16px" }} />,
                label: "Thay đổi hình nền"
            },
            {
                key: "Nhãn",
                icon: <TagsOutlined style={{ fontSize: "16px" }} />,
                label: "Nhãn"
            },
            {
                key: "Theo dõi",
                icon: <EyeOutlined style={{ fontSize: "16px" }} />,
                label: "Theo dõi"
            },
        ],
    },
];


interface MenuComponentProps {
    setActiveMenu: (key: string) => void;
    board: any
}

const MenuComponent: React.FC<MenuComponentProps> = ({ setActiveMenu, board }) => {
    const { idWorkspace } = useParams()
    const [setting, setSetting] = useState<any>();
    const [workspace, setWorkspace] = useState<any>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { confirm } = Modal;

    const getSettingWorkspace = async () => {
        if (idWorkspace) {
            const results = await getSettingWorkspaceAPI(idWorkspace);
            setSetting(results);
        }
    }

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

    // API xóa thành viên
    const handleDeleteGuest = async () => {
        const token = localStorage.getItem('accessToken') as string;
        const userInfo = decodeJWT(token);
        const userID = userInfo.user_id;
        if (!checkOwn(userID)) {
            return;
        }
        try {
            await deleteGuestAPI(board?.board_id, {
                user_id: userID
            })
            handleNotification("Xóa thành công.", "success");
            navigate(URL.HOME.BOARD);
            dispatch(boardReload());
        } catch (error) {
            handleNotification("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
        }
    }


    // Gọi API lấy thông tin không gian làm việc
    const fetchWorkSpaceDetails = async () => {
        const reponse = await getWorkSpacedByIdAPI(idWorkspace)
        setWorkspace(reponse)
    }

    // Gọi API xóa bảng
    const fetchDeleteBoard = async () => {
        try {
            await deleteBoardAPI(board?.board_id);
            dispatch(boardReload());
            navigate(URL.HOME.BOARD);
        } catch (error) {
            console.error(error);
        }
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bảng này?',
            icon: <ExclamationCircleFilled />,
            content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                fetchDeleteBoard();
            },
            onCancel() {
            },
        });
    }

    const showDeleteGuestConfirm = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn rời khỏi bảng này?',
            icon: <ExclamationCircleFilled />,
            content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDeleteGuest();
            },
            onCancel() {
            },
        });
    }

    useEffect(() => {
        getSettingWorkspace();
        fetchWorkSpaceDetails();
    }, [idWorkspace])


    return (
        <Flex vertical gap={10}>
            <Button
                type="text"
                style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    height: "50px",
                    width: "100%",
                    justifyContent: "flex-start"
                }}
                icon={<InfoCircleOutlined />}
                onClick={() => setActiveMenu("Thông tin bảng")}
            >
                Thông tin bảng
            </Button>
            {
                board?.role === "own" ? (
                    <Button
                        type="text"
                        style={{
                            fontSize: "16px",
                            height: "50px",
                            width: "100%",
                            justifyContent: "flex-start"
                        }}
                        icon={<SettingOutlined />}
                        onClick={() => setActiveMenu("Cài đặt")}
                    >
                        Cài đặt
                    </Button>
                ) : (
                    <Button
                        type="text"
                        style={{
                            fontSize: "16px",
                            height: "50px",
                            width: "100%",
                            justifyContent: "flex-start"
                        }}
                        icon={<SettingOutlined />}
                        disabled
                    >
                        Cài đặt
                    </Button>
                )
            }

            <Button
                type="text"
                style={{
                    fontSize: "16px",
                    height: "50px",
                    width: "100%",
                    justifyContent: "flex-start"
                }}
                icon={<TagsOutlined />}
                onClick={() => setActiveMenu("Nhãn")}
            >
                Nhãn
            </Button>
            {
                board?.role === "own" ? (
                    <Button
                        type="text"
                        style={{
                            fontSize: "16px",
                            height: "50px",
                            width: "100%",
                            justifyContent: "flex-start"
                        }}
                        icon={<UserOutlined />}
                        onClick={() => setActiveMenu("Thành viên")}
                    >
                        Thành viên
                    </Button>
                ) : (
                    <Button
                        type="text"
                        style={{
                            fontSize: "16px",
                            height: "50px",
                            width: "100%",
                            justifyContent: "flex-start"
                        }}
                        icon={<UserOutlined />}
                        disabled
                    >
                        Thành viên
                    </Button>
                )
            }
            <Button
                type="text"
                style={{
                    fontSize: "16px",
                    height: "50px",
                    width: "100%",
                    justifyContent: "flex-start"
                }}
                icon={<ShareAltOutlined />}
                onClick={() => setActiveMenu("In, xuất và chia sẻ")}
            >
                In, xuất và chia sẻ
            </Button>
            {
                ["public", "workspace", "private"].includes(board?.status) && board?.role != null &&
                    setting?.setting
                        ?.filter((item: any) => item.action === "deleteboard")
                        ?.some((item: any) =>
                            Object.entries(item.permission).some(([key, value]) => {
                                if (workspace?.role === "own") {
                                    return true
                                }
                                if (key === board?.status) {
                                    if (value === "all member") {
                                        return true
                                    }
                                    if (value === "just admin" && (board?.role === "own")) {
                                        return true;
                                    }
                                }
                                return false;
                            })
                        ) ? (
                    <Button
                        key="delete"
                        type="text"
                        danger
                        onClick={showDeleteConfirm}
                        style={{
                            fontSize: "16px",
                            height: "50px",
                            width: "100%",
                            justifyContent: "flex-start"
                        }}
                        icon={<DeleteOutlined />}
                    >
                        Xóa
                    </Button>
                ) : (
                    <Button
                        key="delete"
                        type="text"
                        danger
                        title="Quyền bị hạn chế"
                        disabled={true}
                        style={{
                            fontSize: "16px",
                            height: "50px",
                            width: "100%",
                            justifyContent: "flex-start"
                        }}
                        icon={<DeleteOutlined />}
                    >
                        Xóa
                    </Button>
                )
            }
            {
                board?.role === "own" || board?.role === "guest" ? (
                    <Button
                        danger
                        type="text"
                        style={{
                            fontSize: "16px",
                            height: "50px",
                            width: "100%",
                            justifyContent: "flex-start"
                        }}
                        icon={<LogoutOutlined />}
                        onClick={showDeleteGuestConfirm}
                    >
                        Rời khỏi bảng
                    </Button>
                ) : (
                    <></>
                )
            }

        </Flex>
    );
};

export default MenuComponent;
