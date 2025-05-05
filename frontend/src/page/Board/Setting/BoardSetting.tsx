import React, { useState } from 'react';
import { Avatar, Button, Flex, Menu, Select, Typography } from 'antd';
import CustomPop from '../../../component/PopConfirm/PopConfirm';
import { GlobalOutlined, LockOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { updateSettingBoardAPI } from '../../../services/Setting/settingBoard.service';

const { Title, Text } = Typography;

const BoardSetting = (props: any) => {
    const { setting, handleSettingBoardChange } = props;
    const { id } = useParams()

    const optionMember = [
        {
            key: "just admin",
            label: ' Quản trị viên',
            description: "Chỉ cho phép các quản trị viên thêm và loại bỏ thành viên khỏi bảng này.",

        },
        {
            key: "all guest",
            label: "Tất cả thành viên của bảng",
            description: "Cho phép mọi thành viên và quản trị viên thêm và loại bỏ thành viên khỏi bảng này."
        },
    ];

    const optionCreate = [
        {
            key: "just admin",
            label: ' Quản trị viên',
            description: "Chỉ cho phép các quản trị viên tạo danh sách và thẻ trong bảng này.",

        },
        {
            key: "all guest",
            label: "Tất cả thành viên của bảng",
            description: "Cho phép mọi thành viên và quản trị viên tạo danh sách và thẻ trong bảng này."
        },
    ];

    const optionDelete = [
        {
            key: "just admin",
            label: ' Quản trị viên',
            description: "Chỉ cho phép các quản trị viên xóa danh sách và thẻ trong bảng này.",

        },
        {
            key: "all guest",
            label: "Tất cả thành viên của bảng",
            description: "Cho phép mọi thành viên và quản trị viên xóa danh sách và thẻ trong bảng này."
        },
    ];

    const optionComment = [
        {
            key: "just admin",
            label: ' Quản trị viên',
            description: "Chỉ cho phép các quản trị viên nhận xét trong bảng này.",

        },
        {
            key: "all guest",
            label: "Tất cả thành viên của bảng",
            description: "Cho phép mọi thành viên và quản trị viên nhận xét trong bảng này."
        },
    ];

    const optionMove = [
        {
            key: "just admin",
            label: ' Quản trị viên',
            description: "Chỉ cho phép các quản trị viên di chuyển danh sách và thẻ trong bảng này.",

        },
        {
            key: "all guest",
            label: "Tất cả thành viên của bảng",
            description: "Cho phép mọi thành viên và quản trị viên di chuyển danh sách và thẻ trong bảng này."
        },
    ];

    const updateData = async (key: string, value: string) => {
        if (id) {
            const newData = {
                action: key,
                permission: value
            };
            handleSettingBoardChange(key, value);
            await updateSettingBoardAPI(id, newData);
        }
    };

    return (
        <div style={{ margin: 0, padding: 0, border: "none", backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity, 1))" }}>
            <Flex vertical={true} gap={30} style={{ margin: "20px 0" }}>
                <Title level={5}>Quyền</Title>

                {/* Thêm xóa thành viên bảng */}
                <CustomPop
                    title={
                        <>
                            <Text >Thêm và xóa thành viên</Text>
                        </>
                    } content={
                        <>
                            <Flex style={{ width: "250px", padding: 0 }}>
                                <Menu
                                    style={{ width: "100%" }}
                                    mode="none"
                                    selectable={true}
                                    defaultSelectedKeys={
                                        setting?.map((item: any) =>
                                            item?.action === "guest" && item?.permission
                                        )
                                    }
                                >
                                    {optionMember.map((item) => (
                                        <Menu.Item
                                            key={item.key}
                                            style={{
                                                padding: "12px 16px",
                                                height: "auto",
                                                whiteSpace: "normal",
                                                lineHeight: 1.5,
                                                pointerEvents: "auto",
                                            }}
                                            onClick={() => updateData("guest", item.key)}
                                        >
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
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </Flex>
                        </>
                    }>
                    <Button
                        type="dashed"
                        style={{
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            justifyContent: "start",
                        }}
                    >
                        Thêm và xóa thành viên
                        <span style={{ fontSize: "12px", color: "gray" }}>
                            {
                                setting?.map((item: any) =>
                                    item?.action === "guest"
                                        ? item?.permission === "all guest"
                                            ? "Thành viên"
                                            : item?.permission === "just admin"
                                                ? "Quản trị viên"
                                                : ""
                                        : ""
                                )
                            }
                        </span>
                    </Button>
                </CustomPop>

                {/* Tạo danh sách và thẻ */}
                <CustomPop
                    title={
                        <>
                            <Text >Tạo danh sách và thẻ</Text>
                        </>
                    } content={
                        <>
                            <Flex style={{ width: "250px", padding: 0 }}>
                                <Menu
                                    style={{ width: "100%" }}
                                    mode="none"
                                    selectable={true}
                                    defaultSelectedKeys={
                                        setting?.map((item: any) =>
                                            item?.action === "create" && item?.permission
                                        )
                                    }
                                >
                                    {optionCreate.map((item) => (
                                        <Menu.Item
                                            key={item.key}
                                            style={{
                                                padding: "12px 16px",
                                                height: "auto",
                                                whiteSpace: "normal",
                                                lineHeight: 1.5,
                                                pointerEvents: "auto",
                                            }}
                                            onClick={() => updateData("create", item.key)}
                                        >
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
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </Flex>
                        </>
                    }>
                    <Button
                        type="dashed"
                        style={{
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            justifyContent: "start",
                        }}
                    >
                        Tạo danh sách và thẻ
                        <span style={{ fontSize: "12px", color: "gray" }}>
                            {
                                setting?.map((item: any) =>
                                    item?.action === "create"
                                        ? item?.permission === "all guest"
                                            ? "Thành viên"
                                            : item?.permission === "just admin"
                                                ? "Quản trị viên"
                                                : ""
                                        : ""
                                )
                            }
                        </span>
                    </Button>
                </CustomPop>

                {/* Xóa danh sách và thẻ */}
                <CustomPop
                    title={
                        <>
                            <Text >Xóa danh sách và thẻ</Text>
                        </>
                    } content={
                        <>
                            <Flex style={{ width: "250px", padding: 0 }}>
                                <Menu
                                    style={{ width: "100%" }}
                                    mode="none"
                                    selectable={true}
                                    defaultSelectedKeys={
                                        setting?.map((item: any) =>
                                            item?.action === "delete" && item?.permission
                                        )
                                    }
                                >
                                    {optionDelete.map((item) => (
                                        <Menu.Item
                                            key={item.key}
                                            style={{
                                                padding: "12px 16px",
                                                height: "auto",
                                                whiteSpace: "normal",
                                                lineHeight: 1.5,
                                                pointerEvents: "auto",
                                            }}
                                            onClick={() => updateData("delete", item.key)}
                                        >
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
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </Flex>
                        </>
                    }>
                    <Button
                        type="dashed"
                        style={{
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            justifyContent: "start",
                        }}
                    >
                        Xóa danh sách và thẻ
                        <span style={{ fontSize: "12px", color: "gray" }}>
                            {
                                setting?.map((item: any) =>
                                    item?.action === "delete"
                                        ? item?.permission === "all guest"
                                            ? "Thành viên"
                                            : item?.permission === "just admin"
                                                ? "Quản trị viên"
                                                : ""
                                        : ""
                                )
                            }
                        </span>
                    </Button>
                </CustomPop>

                {/* Di chuyển danh sách và thẻ */}
                <CustomPop
                    title={
                        <>
                            <Text >Di chuyển danh sách và thẻ</Text>
                        </>
                    } content={
                        <>
                            <Flex style={{ width: "250px", padding: 0 }}>
                                <Menu
                                    style={{ width: "100%" }}
                                    mode="none"
                                    selectable={true}
                                    defaultSelectedKeys={
                                        setting?.map((item: any) =>
                                            item?.action === "move" && item?.permission
                                        )
                                    }
                                >
                                    {optionMove.map((item) => (
                                        <Menu.Item
                                            key={item.key}
                                            style={{
                                                padding: "12px 16px",
                                                height: "auto",
                                                whiteSpace: "normal",
                                                lineHeight: 1.5,
                                                pointerEvents: "auto",
                                            }}
                                            onClick={() => updateData("move", item.key)}
                                        >
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
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </Flex>
                        </>
                    }>
                    <Button
                        type="dashed"
                        style={{
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            justifyContent: "start",
                        }}
                    >
                        Di chuyển danh sách và thẻ
                        <span style={{ fontSize: "12px", color: "gray" }}>
                            {
                                setting?.map((item: any) =>
                                    item?.action === "move"
                                        ? item?.permission === "all guest"
                                            ? "Thành viên"
                                            : item?.permission === "just admin"
                                                ? "Quản trị viên"
                                                : ""
                                        : ""
                                )
                            }
                        </span>
                    </Button>
                </CustomPop>

                {/* Nhận xét */}
                <CustomPop
                    title={
                        <>
                            <Text >Nhận xét</Text>
                        </>
                    } content={
                        <>
                            <Flex style={{ width: "250px", padding: 0 }}>
                                <Menu
                                    style={{ width: "100%" }}
                                    mode="none"
                                    selectable={true}
                                    defaultSelectedKeys={
                                        setting?.map((item: any) =>
                                            item?.action === "comment" && item?.permission
                                        )
                                    }
                                >
                                    {optionComment.map((item) => (
                                        <Menu.Item
                                            key={item.key}
                                            style={{
                                                padding: "12px 16px",
                                                height: "auto",
                                                whiteSpace: "normal",
                                                lineHeight: 1.5,
                                                pointerEvents: "auto",
                                            }}
                                            onClick={() => updateData("comment", item.key)}
                                        >
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
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </Flex>
                        </>
                    }>
                    <Button
                        type="dashed"
                        style={{
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            justifyContent: "start",
                        }}
                    >
                        Nhận xét
                        <span style={{ fontSize: "12px", color: "gray" }}>
                            {
                                setting?.map((item: any) =>
                                    item?.action === "comment"
                                        ? item?.permission === "all guest"
                                            ? "Thành viên"
                                            : item?.permission === "just admin"
                                                ? "Quản trị viên"
                                                : ""
                                        : ""
                                )
                            }
                        </span>
                    </Button>
                </CustomPop>
            </Flex>
        </div>
    );
};

export default BoardSetting;
