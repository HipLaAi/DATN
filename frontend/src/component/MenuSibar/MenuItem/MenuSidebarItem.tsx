import { Flex } from "antd"
import type { MenuProps } from 'antd';
import { Typography } from 'antd';
import { FaTrello } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6"
import { MdOutlineTableView } from "react-icons/md";
import { MdOutlineTableChart } from "react-icons/md";
import { Link } from "react-router-dom";
import { URL } from '../../../utils/url';
import {
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { groupBy } from "lodash";


type MenuItem = Required<MenuProps>['items'][number];
const { Text } = Typography


export const MenuSideBarItem = (data: any[]): MenuItem[] => [
  {
    key: 'grp',
    type: 'group',
    children: [
      {
        key: '13',
        icon:
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '40px',
            }}
          >
            <FaTrello size={20} />
          </div>,
        label:
          <>
            <Text strong>Bảng</Text>
          </>
      },
      {
        key: '14',
        icon:
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '45px',
            }}
          >
            <MdOutlineTableChart size={100} />
          </div>,
        label:
          <>
            <Text strong>Trang chủ</Text>
          </>
      },
    ],
  },
  {
    type: 'divider'
  },
  ...data.map((workspace, index) => ({
    key: `sub-${index}`,
    icon:
      <>
        <div
          style={{
            width: '40px',
            height: '40px',
            marginTop: '10px'
          }}
        >
          <img
            src={workspace?.logo.replace("D:\\DA4\\frontend\\", "")}
            alt=""
            style={{
              width: '30px',
              height: '30px',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
        </div>
      </>,
    label: (
      <>
        <Text strong>{workspace.workspace_name}</Text>
      </>
    ),
    children: [
      {
        key: `${index}-1`,
        icon: <TableOutlined size={18} />,
        label: (
          <>
            <Link to={"workspace/" + workspace.workspace_id}>Bảng</Link>
          </>
        ),
      },
      {
        key: `${index}-3`,
        icon: <UserOutlined size={14} />,
        label: (
          <>
            <Link to={"workspace/" + workspace.workspace_id + "/member"}>Thành viên</Link>
          </>
        ),
      },
      {
        key: `${index}-2`,
        icon: <SettingOutlined size={14} />,
        label: (
          <>
            <Link to={"workspace/" + workspace.workspace_id + "/setting"}>Cài đặt</Link>
          </>
        ),
      },
    ],
  })),
];