import React from "react";
import { Menu, Badge, Avatar, Divider } from "antd";
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
} from "@ant-design/icons";

// const items = [
//     {
//         key: "Thông tin bảng",
//         icon: <InfoCircleOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Thông tin bảng
//             </span>
//         ),
//     },
//     {
//         key: "Cài đặt",
//         icon: <SettingOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Cài đặt
//             </span>
//         ),
//     },
//     {
//         key: "Trường tùy chỉnh",
//         icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Trường tùy chỉnh
//             </span>
//         ),
//     },
//     {
//         key: "Hoạt động",
//         icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Hoạt động
//             </span>
//         ),
//     },
//     {
//         key: "Mục lưu trữ",
//         icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Mục lưu trữ
//             </span>
//         ),
//     },
//     {
//         key: "Sao chép bảng",
//         icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Sao chép bảng
//             </span>
//         ),
//     },
//     {
//         key: "Lọc",
//         icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Lọc theo
//             </span>
//         ),
//     },
// {
//     key: "Tạo cuộc họp",
//     icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//     label: (
//         <span style={{ fontSize: "16px" }}>
//             Tạo cuộc họp
//         </span>
//     ),
// },
// {
//     key: "Tạo cuộc họp",
//     icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//     label: (
//         <span style={{ fontSize: "16px" }}>
//             Tin nhắn nhóm
//         </span>
//     ),
// },
// {
//     key: "Tạo cuộc họp",
//     icon: <ToolOutlined style={{ fontSize: "16px" }} />,
//     label: (
//         <span style={{ fontSize: "16px" }}>
//             Thay đổi hình nền
//         </span>
//     ),
// },
// {
//     key: "Nhãn",
//     icon: <TagsOutlined style={{ fontSize: "16px" }} />,
//     label: (
//         <span style={{ fontSize: "16px" }}>
//             Nhãn
//         </span>
//     ),
// },
// {
//     key: "Theo dõi",
//     icon: <EyeOutlined style={{ fontSize: "16px" }} />,
//     label: (
//         <span style={{ fontSize: "16px" }}>
//             Theo dõi
//         </span>
//     ),
// },
//     {
//         key: "In, xuất và chia sẻ",
//         icon: <ShareAltOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 In, xuất và chia sẻ
//             </span>
//         ),
//     },
//     {
//         key: "Xóa bảng",
//         icon: <TableOutlined style={{ fontSize: "16px" }} />,
//         label: (
//             <span style={{ fontSize: "16px" }}>
//                 Xóa bảng
//             </span>
//         ),
//     },
// ];

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
                label: "In, xuất và chia sẻ",
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
}

const MenuComponent: React.FC<MenuComponentProps> = ({ setActiveMenu }) => {
    return (
        // <Menu
        //     mode="inline"
        //     style={{ margin: 0, padding: 0, border: "none", backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity, 1))" }}
        //     items={items.map((item) => ({
        //         key: item.key,
        //         icon: item.icon,
        //         onClick: () => setActiveMenu(item.key),
        //         label: (
        //             <div>
        //                 {item.label}
        //             </div>
        //         ),
        //     }))}
        // />
        <Menu
            mode="inline"
            style={{
                margin: 0,
                padding: 0,
                border: "none",
                backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity, 1))",
            }}
        >
            {groupedItems.map((group, index) => (
                <div key={group.group}>
                    {group.items.map((item) => (
                        <Menu.Item
                            style={{ padding: "10px" }}
                            key={item.key}
                            icon={item.icon}
                            onClick={() => setActiveMenu(item.key)}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                    {index < groupedItems.length - 1 && <Divider style={{ margin: "10px" }} />}
                </div>
            ))}
        </Menu>
    );
};

export default MenuComponent;
