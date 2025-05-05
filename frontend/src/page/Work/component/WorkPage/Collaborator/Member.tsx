import { Avatar, Button, List, Select, Typography, Divider, Flex, Modal } from "antd";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { deleteMemberAPI, getMemberByWorkspaceIdAPI, updateRoleMemberAPI } from "../../../../../services/WorkSpace/workSapce.service";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useToast } from "../../../../../hooks/use-toast";

const { Title, Text } = Typography

const Member = () => {
    const [dataMember, setDataMember] = useState<any>([])
    const { data, idWorkspace } = useOutletContext<{ data: any, idWorkspace: any }>();
    const { confirm } = Modal;
    const { toast } = useToast();

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
                handleDeleteMember(userID);
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
            style:{color: color}
        });
    };

    // Hàm lấy danh sách thành viên có trong không gian làm việc
    const fetchGetMember = async () => {
        const response = await getMemberByWorkspaceIdAPI(idWorkspace);
        setDataMember(response)
    }

    // API xóa thành viên khỏi không gian làm việc
    const handleDeleteMember = async (userID: any) => {

        if (!checkOwn(userID)) {
            return;
        }

        try {
            await deleteMemberAPI(idWorkspace, {
                user_id: userID
            })
            var newDataMember = [...dataMember];
            newDataMember = newDataMember.filter((item: any) => item.user_id !== userID);
            setDataMember(newDataMember);
            showUpdateConfirm("Rời khỏi bảng thành công", "", "green");
        } catch (error) {
            showUpdateConfirm("Lỗi", "Không thể thực hiện.", "red");
        }
    }

    // API cập nhật quyền của thành viên
    const handleUpdateMember = async (userID: any, value: any) => {
        if (!checkOwn(userID)) {
            return;
        }

        try {
            await updateRoleMemberAPI({
                workspace_id: idWorkspace,
                user_id: userID,
                role: value,
            });
            setDataMember(
                dataMember.map((item: any) =>
                    item.user_id === userID ? { ...item, role: value } : item
                )
            );
            showUpdateConfirm("Cập nhật quyền thành công", "", "green");
        } catch (error) {
            showUpdateConfirm("Lỗi", "Không thể cập nhật quyền.", "red");
        }
    };

    // hàm kiểm tra số lượng quản trị viên
    const checkOwn = (userID: any): boolean => {
        const countOwnRoles = dataMember.filter((item: any) => item.role === "own").length;

        const currentUser = dataMember.find((item: any) => item.user_id === userID);

        if (countOwnRoles === 1 && currentUser?.role === "own") {
            showUpdateConfirm(
                "Lỗi",
                "Phải có ít nhất một Quản trị viên trong không gian làm việc.",
                "red"
            );
            return false;
        }

        return true;
    };


    useEffect(() => {
        fetchGetMember();
    }, [])

    return (
        <>
            <Title level={4}>Thành viên trong không gian làm việc ({dataMember?.length})</Title>
            <Divider></Divider>
            <List
                dataSource={dataMember}
                renderItem={(item: any) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item?.avatar} />}
                            title={item.name}
                            description={item.email}
                        />
                        <Flex gap={10}>
                            {
                                data?.role == "own" ? (
                                    <Select
                                        value={item.role}
                                        style={{ width: "110px" }}
                                        onChange={(value) => handleUpdateMember(item?.user_id, value)}
                                    >
                                        <Select.Option value="own">Quản trị</Select.Option>
                                        <Select.Option value="member">Thành viên</Select.Option>
                                    </Select>
                                ) : (
                                    <>
                                        <Select
                                            disabled
                                            value={item.role}
                                            style={{ width: "110px" }}
                                        >
                                            <Select.Option value="own">Quản trị</Select.Option>
                                            <Select.Option value="member">Thành viên</Select.Option>
                                        </Select>
                                    </>
                                )
                            }
                            <Button
                                onClick={() => showDeleteConfirm(item.user_id)}
                                type="dashed"
                                danger
                            >
                                Rời khỏi bảng
                            </Button>
                        </Flex>
                    </List.Item>
                )}
            />
        </>
    )
}

export { Member }
