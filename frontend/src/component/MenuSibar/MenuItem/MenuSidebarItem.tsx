import type { MenuProps } from 'antd';
import { Typography } from 'antd';
import { Link } from "react-router-dom";
import {
  DatabaseFilled,
  EyeFilled,
  HomeFilled,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
  VideoCameraFilled,
  WechatFilled,
} from '@ant-design/icons';
import { URL } from "../../../utils/url";

type MenuItem = Required<MenuProps>['items'][number];
const { Text } = Typography

export const MenuSideBarItem = (data: any[]): MenuItem[] => [
  {
    key: 'grp',
    type: 'group',
    children: [
      {
        key: '1',
        icon:
          <Link to={URL.HOME.HOME}>
            <HomeFilled style={{ fontSize: '18px' }} />
          </Link>,
        label:
          <>
            <Text strong>Trang chủ</Text>
          </>
      },
      {
        key: '2',
        icon:
          <Link to={URL.HOME.BOARD}>
            <DatabaseFilled style={{ fontSize: '18px' }} />
          </Link>,
        label:
          <>
            <Text strong>Bảng</Text>
          </>
      },
      {
        key: '3',
        icon:
          <Link to={URL.HOME.MESSAGE}>
            <WechatFilled style={{ fontSize: '18px' }} />
          </Link>,
        label:
          <>
            <Text strong>Tin nhắn</Text>
          </>
      },
      // {
      //   key: '4',
      //   icon:
      //     <Link to={URL.HOME.FOLLOW}>
      //       <EyeFilled style={{ fontSize: '18px' }} />
      //     </Link>,
      //   label:
      //     <>
      //       <Text strong>Theo dõi</Text>
      //     </>
      // },
      {
        key: '5',
        icon:
          <Link to={URL.HOME.VIDEO}>
            <VideoCameraFilled style={{ fontSize: '18px' }} />
          </Link>,
        label:
          <>
            <Text strong>Video</Text>
          </>
      },
    ],
  },
  {
    type: 'divider'
  },
  ...data.map((workspace, index) => ({
    key: `${workspace.workspace_id}`,
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
            src={workspace?.logo}
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
        key: `${workspace.workspace_id}-1`,
        icon: <TableOutlined size={18} />,
        label: (
          <>
            <Link to={URL.WORKSPACE.BUILDER.TABLE(workspace.workspace_id)}>Bảng</Link>
          </>
        ),
      },
      {
        key: `${workspace?.workspace_id}-2`,
        icon: <UserOutlined size={14} />,
        label: (
          <>
            <Link to={URL.WORKSPACE.BUILDER.MEMBER(workspace.workspace_id)}>Thành viên</Link>
          </>
        ),
      },
      {
        key: `${workspace?.workspace_id}-3`,
        icon: <SettingOutlined size={14} />,
        label: (
          <>
            <Link to={URL.WORKSPACE.BUILDER.SETTING(workspace.workspace_id)}>Cài đặt</Link>
          </>
        ),
      },
    ],
  })),
];