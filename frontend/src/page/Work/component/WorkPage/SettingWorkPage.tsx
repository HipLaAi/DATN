import { Button, Col, Divider, Flex, List, Menu, Radio, Row, Typography, Modal } from 'antd';
import CustomPop from '../../../../component/PopConfirm/PopConfirm';
import { useEffect } from 'react';
import { LockOutlined, GlobalOutlined } from '@ant-design/icons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { deleteWorkspaceAPI } from '../../../../services/WorkSpace/workSapce.service';
import { IoPeople } from 'react-icons/io5';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { boardReload } from '../../../../features/reloadSlice';
import { updateSettingWorkspaceAPI } from '../../../../services/Setting/settingWorkspace.service';

const { Title, Text, Paragraph } = Typography
const SettingWorkPage = () => {
    const
        {
            data,
            scrollToTop,
            idWorkspace,
            setting,
            updateInformationWorkspace,
            handleInputChange,
            handleRadioChange
        } = useOutletContext<{
            data: any,
            scrollToTop: any,
            idWorkspace: any,
            setting: any,
            updateInformationWorkspace: any,
            handleInputChange: any,
            handleRadioChange: any
        }>();
    const navigate = useNavigate();
    const { confirm } = Modal;
    const dispatch = useDispatch();

    const updateData = async (key: string, value: string) => {
        const newData = { ...data, [key]: value };
        handleInputChange(key, value);
        await updateInformationWorkspace(newData);
    };

    const updateSetting = async (action: any, key: string, value: string) => {
        const newData = {
            setting: setting?.setting
                .filter((item: any) => item.action === action)
                .map((item: any) => ({
                    action: item.action,
                    permission: {
                        ...item.permission,
                        [key]: value,
                    },
                    settingworkspace_id: item.settingworkspace_id,
                })),
        };

        handleRadioChange(action, key, value);
        await updateSettingWorkspaceAPI(idWorkspace, newData.setting[0]);
    }

    useEffect(() => {
        scrollToTop();
    }, [idWorkspace])

    const showDeleteConfirm = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa không gian làm việc này?',
            icon: <ExclamationCircleFilled />,
            content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                deleteWorkspace();
            },
            onCancel() {
            },
        });
    };

    const deleteWorkspace = async () => {
        await deleteWorkspaceAPI(idWorkspace);
        dispatch(boardReload());
        navigate("/board");
    }

    const optionStatus = [
        {
            key: "private",
            label: ' Riêng tư',
            icon: <LockOutlined style={{ color: "red" }} />,
            description: "Đây là Không gian làm việc riêng tư. Chỉ những người trong Không gian làm việc có thể truy cập hoặc nhìn thấy Không gian làm việc.",

        },
        {
            key: "public",
            label: "Công khai",
            icon: <GlobalOutlined style={{ color: "green" }} />,
            description: "Đây là Không gian làm việc công khai. Bất kỳ ai có đường dẫn tới Không gian làm việc đều có thể nhìn thấy Không gian làm việc và Không gian làm việc có thể được tìm thấy trên các công cụ tìm kiếm như Google. Chỉ những người được mời vào Không gian làm việc mới có thể thêm và chỉnh sửa các bảng của Không gian làm việc"
        },
    ];

    const optionShare = [
        {
            key: "all member",
            label: "Tất cả các thành viên Không gian làm việc",
            icon: <GlobalOutlined style={{ color: "green" }} />,
            description: "Tất cả các thành viên trong Không gian làm việc đều có thể mời hoặc chia sẻ thông tin Không gian làm việc.",

        },
        {
            key: "just admin",
            label: "Chỉ các quản trị viên Không gian làm việc",
            icon: <LockOutlined style={{ color: "red" }} />,
            description: "Chỉ các quản trị viên mới có thể thể mời hoặc chia sẻ thông tin Không gian làm việc."
        },
    ];

    return (
        <>
            <Row justify="center" style={{ padding: "0 130px 50px" }}>
                <Col span={20} style={{ marginBottom: "50px" }}>
                    <Title level={4}>
                        Các cài đặt không gian làm việc
                        {/* Trạng thái */}
                        <List
                            header={<Text strong style={{ fontSize: "16px" }}>Khả năng hiển thị trong không gian làm việc</Text>}
                            dataSource={[""]}
                            renderItem={() => (
                                <List.Item style={{ margin: 0 }}>
                                    <Row justify={"space-between"} style={{ width: "100%" }}>
                                        <Col span={18} style={{ width: "80%" }}>
                                            <Paragraph
                                                style={{
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {optionStatus.map((item) =>
                                                    (item?.key == data?.status) ? (
                                                        <div key={item.key}>
                                                            {item.icon} {item.label} - {item.description}
                                                        </div>
                                                    ) : null
                                                )}
                                            </Paragraph>
                                        </Col>
                                        <Col span={2} style={{ display: "flex", justifyContent: "end", width: "20%" }}>
                                            {
                                                data?.role === "own" ? (
                                                    <CustomPop
                                                        title={
                                                            <>
                                                                <Text >Chọn khả năng hiển thị trong không gian làm việc</Text>
                                                            </>
                                                        } content={
                                                            <>
                                                                <Flex style={{ width: "320px", padding: 0 }}>
                                                                    <Menu
                                                                        style={{ width: "100%" }}
                                                                        mode="none"
                                                                        selectable={true}
                                                                        defaultSelectedKeys={[data?.status]}
                                                                    >
                                                                        {optionStatus.map((item) => (
                                                                            <Menu.Item
                                                                                key={item.key}
                                                                                style={{
                                                                                    padding: "12px 16px",
                                                                                    height: "auto",
                                                                                    whiteSpace: "normal",
                                                                                    lineHeight: 1.5
                                                                                }}
                                                                                onClick={() => updateData("status", item.key)}
                                                                            >
                                                                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                                                                    <span style={{ marginRight: 12, fontSize: 14 }}>{item.icon}</span>
                                                                                    <div>
                                                                                        <div style={{ fontWeight: 500, marginBottom: 4, fontSize: 11 }}>{item.label}</div>
                                                                                        <div style={{
                                                                                            color: "#666",
                                                                                            fontSize: 11,
                                                                                            lineHeight: 1.4,
                                                                                            whiteSpace: "normal"
                                                                                        }}>
                                                                                            {item.description}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Menu.Item>
                                                                        ))}
                                                                    </Menu>
                                                                </Flex>
                                                            </>
                                                        }>
                                                        <Button color='default' variant='filled' style={{ userSelect: "none" }}>Thay đổi</Button>
                                                    </CustomPop>
                                                ) : (
                                                    <Button
                                                        color='default'
                                                        variant='filled'
                                                        disabled
                                                        title="Bị hạn chế quyền"
                                                    >
                                                        Thay đổi
                                                    </Button>
                                                )}
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />

                        {/* Hạn chế tạo bảng */}
                        <List
                            header={<Text strong style={{ fontSize: "16px" }}>Chính sách hạn chế tạo bảng</Text>}
                            dataSource={setting ? [setting] : []}
                            renderItem={(item: any) => (
                                item?.setting?.map((item: any, index: any) => (
                                    item?.action == "createboard" ? (
                                        <List.Item style={{ margin: 0 }} key={item?.settingworkspace_id}>
                                            <Row justify={"space-between"} style={{ width: "100%" }}>
                                                <Col span={18} style={{ width: "80%" }}>
                                                    {
                                                        Object.entries(item?.permission).map(([key, value]) => (
                                                            <Paragraph
                                                                key={key}
                                                                style={{
                                                                    fontWeight: 400,
                                                                    fontSize: "14px",
                                                                }}
                                                            >
                                                                {key === "public" && (
                                                                    <>
                                                                        {value === "all member" && ("Bất kỳ thành viên Không gian làm việc nào cũng có thể tạo ")}
                                                                        {value === "just admin" && ("Chỉ các quản trị viên của Không gian làm việc mới có thể tạo ")}
                                                                        {value === "no one" && ("Không ai có thể tạo ")}
                                                                        <GlobalOutlined style={{ color: "green" }} />
                                                                        {` bảng thông tin công khai`}
                                                                    </>
                                                                )}
                                                                {key === "workspace" && (
                                                                    <>
                                                                        {value === "all member" && ("Bất kỳ thành viên Không gian làm việc nào cũng có thể tạo ")}
                                                                        {value === "just admin" && ("Chỉ các quản trị viên của Không gian làm việc mới có thể tạo ")}
                                                                        {value === "no one" && ("Không ai có thể tạo ")}
                                                                        <IoPeople size={18} style={{ color: "#ffbe18", display: "inline" }} />
                                                                        {` bảng thông tin hiển thị trong Không gian làm việc`}
                                                                    </>
                                                                )}
                                                                {key === "private" && (
                                                                    <>
                                                                        {value === "all member" && ("Bất kỳ thành viên Không gian làm việc nào cũng có thể tạo ")}
                                                                        {value === "just admin" && ("Chỉ các quản trị viên của Không gian làm việc mới có thể tạo ")}
                                                                        {value === "no one" && ("Không ai có thể tạo ")}
                                                                        <LockOutlined style={{ color: "red" }} />
                                                                        {` bảng thông tin riêng tư`}
                                                                    </>
                                                                )}
                                                            </Paragraph>
                                                        ))
                                                    }
                                                </Col>
                                                <Col span={2} style={{ display: "flex", justifyContent: "end", width: "20%" }}>
                                                    {
                                                        data?.role === "own" ? (
                                                            <CustomPop title={
                                                                <>
                                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                                        <Text>Chính Sách Hạn Chế Tạo Bảng</Text>
                                                                    </div>
                                                                </>
                                                            } content={
                                                                <>
                                                                    <div style={{ width: 320, padding: '8px 0' }}>
                                                                        {
                                                                            Object.entries(item?.permission).map(([key, value]) => (
                                                                                <>
                                                                                    <Divider style={{ margin: '5px 0' }} />
                                                                                    <div style={{ padding: '8px 16px' }}>
                                                                                        <Text strong style={{ display: 'block', marginBottom: 8 }}>
                                                                                            Ai có thể tạo bảng thông tin
                                                                                            {key === "public" && (" công khai")}
                                                                                            {key === "workspace" && (" Không gian làm việc")}
                                                                                            {key === "private" && (" riêng tư")} ?
                                                                                        </Text>
                                                                                        <Radio.Group
                                                                                            value={value}
                                                                                            onChange={(e) => updateSetting("createboard", key, e.target.value)}
                                                                                            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                                                                        >
                                                                                            <Radio value="all member">Bất kỳ thành viên Không gian làm việc nào</Radio>
                                                                                            <Radio value="just admin">Chỉ các quản trị viên của Không gian làm việc</Radio>
                                                                                            <Radio value="no one">Không ai</Radio>
                                                                                        </Radio.Group>
                                                                                    </div>
                                                                                </>
                                                                            ))
                                                                        }

                                                                    </div>
                                                                </>
                                                            }
                                                                position={"left"}>
                                                                <Button title='Quyền bị hạn chế' color='default' variant='filled'>Thay đổi</Button>
                                                            </CustomPop>
                                                        ) : (
                                                            <Button
                                                                color='default'
                                                                variant='filled'
                                                                disabled
                                                                title="Bị hạn chế quyền"
                                                            >
                                                                Thay đổi
                                                            </Button>
                                                        )

                                                    }
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    ) : (
                                        <>
                                        </>
                                    )
                                ))
                            )}
                        />

                        {/* Hạn chế xóa bảng */}
                        <List
                            header={<Text strong style={{ fontSize: "16px" }}>Chính sách hạn chế tạo bảng</Text>}
                            dataSource={setting ? [setting] : []}
                            renderItem={(item: any) => (
                                item?.setting?.map((item: any, index: any) => (
                                    item?.action == "deleteboard" ? (
                                        <List.Item style={{ margin: 0 }} key={item?.settingworkspace_id}>
                                            <Row justify={"space-between"} style={{ width: "100%" }}>
                                                <Col span={18} style={{ width: "80%" }}>
                                                    {
                                                        Object.entries(item?.permission).map(([key, value]) => (
                                                            <Paragraph
                                                                key={key}
                                                                style={{
                                                                    fontWeight: 400,
                                                                    fontSize: "14px",
                                                                }}
                                                            >
                                                                {key === "public" && (
                                                                    <>
                                                                        {value === "all member" && ("Bất kỳ thành viên Không gian làm việc nào cũng có thể tạo ")}
                                                                        {value === "just admin" && ("Chỉ các quản trị viên của Không gian làm việc mới có thể tạo ")}
                                                                        {value === "no one" && ("Không ai có thể tạo ")}
                                                                        <GlobalOutlined style={{ color: "green" }} />
                                                                        {` bảng thông tin công khai`}
                                                                    </>
                                                                )}
                                                                {key === "workspace" && (
                                                                    <>
                                                                        {value === "all member" && ("Bất kỳ thành viên Không gian làm việc nào cũng có thể tạo ")}
                                                                        {value === "just admin" && ("Chỉ các quản trị viên của Không gian làm việc mới có thể tạo ")}
                                                                        {value === "no one" && ("Không ai có thể tạo ")}
                                                                        <IoPeople size={18} style={{ color: "#ffbe18", display: "inline" }} />
                                                                        {` bảng thông tin hiển thị trong Không gian làm việc`}
                                                                    </>
                                                                )}
                                                                {key === "private" && (
                                                                    <>
                                                                        {value === "all member" && ("Bất kỳ thành viên Không gian làm việc nào cũng có thể tạo ")}
                                                                        {value === "just admin" && ("Chỉ các quản trị viên của Không gian làm việc mới có thể tạo ")}
                                                                        {value === "no one" && ("Không ai có thể tạo ")}
                                                                        <LockOutlined style={{ color: "red" }} />
                                                                        {` bảng thông tin riêng tư`}
                                                                    </>
                                                                )}
                                                            </Paragraph>
                                                        ))
                                                    }
                                                </Col>
                                                <Col span={2} style={{ display: "flex", justifyContent: "end", width: "20%" }}>
                                                    {
                                                        data?.role === "own" ? (
                                                            <CustomPop title={
                                                                <>
                                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                                        <Text>Chính Sách Hạn Chế Tạo Bảng</Text>
                                                                    </div>
                                                                </>
                                                            } content={
                                                                <>
                                                                    <div style={{ width: 320, padding: '8px 0' }}>
                                                                        {
                                                                            Object.entries(item?.permission).map(([key, value]) => (
                                                                                <>
                                                                                    <Divider style={{ margin: '5px 0' }} />
                                                                                    <div style={{ padding: '8px 16px' }}>
                                                                                        <Text strong style={{ display: 'block', marginBottom: 8 }}>
                                                                                            Ai có thể tạo bảng thông tin
                                                                                            {key === "public" && (" công khai")}
                                                                                            {key === "workspace" && (" Không gian làm việc")}
                                                                                            {key === "private" && (" riêng tư")} ?
                                                                                        </Text>
                                                                                        <Radio.Group
                                                                                            value={value}
                                                                                            onChange={(e) => updateSetting("deleteboard", key, e.target.value)}
                                                                                            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                                                                        >
                                                                                            <Radio value="all member">Bất kỳ thành viên Không gian làm việc nào</Radio>
                                                                                            <Radio value="just admin">Chỉ các quản trị viên của Không gian làm việc</Radio>
                                                                                            <Radio value="no one">Không ai</Radio>
                                                                                        </Radio.Group>
                                                                                    </div>
                                                                                </>
                                                                            ))
                                                                        }

                                                                    </div>
                                                                </>
                                                            }
                                                                position={"left"}>
                                                                <Button title='Quyền bị hạn chế' color='default' variant='filled'>Thay đổi</Button>
                                                            </CustomPop>
                                                        ) : (
                                                            <Button
                                                                color='default'
                                                                variant='filled'
                                                                disabled
                                                                title="Bị hạn chế quyền"
                                                            >
                                                                Thay đổi
                                                            </Button>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    ) : (
                                        <>
                                        </>
                                    )
                                ))
                            )}
                        />

                        {/* Chia sẻ các bảng với khách */}
                        <List
                            header={<Text strong style={{ fontSize: "16px" }}>Chia sẻ các bảng với khách</Text>}
                            dataSource={setting ? [setting] : []}
                            renderItem={(item: any) => (
                                item?.setting?.map((item: any, index: any) => (
                                    item?.action == "invitemember" ? (
                                        <List.Item style={{ margin: 0 }}>
                                            <Row justify={"space-between"} style={{ width: "100%" }}>
                                                <Col span={18} style={{ width: "80%" }}>
                                                    <Paragraph
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        {optionShare.map((option) =>
                                                            (option?.key === item?.permission?.status) ? (
                                                                <div key={option.key}>
                                                                    {option.icon} {option.label} - {option.description}
                                                                </div>
                                                            ) : null
                                                        )}
                                                    </Paragraph>
                                                </Col>
                                                <Col span={2} style={{ display: "flex", justifyContent: "end", width: "20%" }}>
                                                    {
                                                        data?.role === "own" ? (
                                                            <CustomPop
                                                                title={
                                                                    <>
                                                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                                                            <Text>Chia Sẻ Không gian làm việc</Text>
                                                                        </ div>
                                                                    </>
                                                                } content={
                                                                    <>
                                                                        <Flex style={{ width: "320px", padding: 0 }}>
                                                                            <Menu
                                                                                style={{ width: "100%" }}
                                                                                mode="none"
                                                                                selectable={true}
                                                                                defaultSelectedKeys={[item?.permission?.status]}
                                                                            >
                                                                                {optionShare.map((item) => (
                                                                                    <Menu.Item
                                                                                        key={item.key}
                                                                                        style={{
                                                                                            padding: "12px 16px",
                                                                                            height: "auto",
                                                                                            whiteSpace: "normal",
                                                                                            lineHeight: 1.5
                                                                                        }}
                                                                                        onClick={() => updateSetting("invitemember", "status", item.key)}
                                                                                    >
                                                                                        <div style={{ display: "flex", alignItems: "flex-start" }}>
                                                                                            <span style={{ marginRight: 12, fontSize: 14 }}>{item.icon}</span>
                                                                                            <div>
                                                                                                <div style={{ fontWeight: 500, marginBottom: 4, fontSize: 11 }}>{item.label}</div>
                                                                                                <div style={{
                                                                                                    color: "#666",
                                                                                                    fontSize: 11,
                                                                                                    lineHeight: 1.4,
                                                                                                    whiteSpace: "normal"
                                                                                                }}>
                                                                                                    {item.description}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Menu.Item>
                                                                                ))}
                                                                            </Menu>
                                                                        </Flex>
                                                                    </>
                                                                }>
                                                                <Button color='default' variant='filled'>Thay đổi</Button>
                                                            </CustomPop>
                                                        ) : (
                                                            <Button
                                                                color='default'
                                                                variant='filled'
                                                                disabled
                                                                title="Bị hạn chế quyền"
                                                            >
                                                                Thay đổi
                                                            </Button>
                                                        )
                                                    }

                                                </Col>
                                            </Row>
                                        </List.Item>
                                    ) : (
                                        <>
                                        </>
                                    ))
                                )
                            )}
                        />
                    </Title>
                    {
                        data?.role === "own" && (
                            <Button
                                color="default"
                                variant="filled"
                                onClick={showDeleteConfirm}
                            >
                                <Text strong>Xóa không gian làm việc</Text>
                            </Button>
                        )
                    }
                </Col>
            </Row >
        </>
    )
}

export default SettingWorkPage