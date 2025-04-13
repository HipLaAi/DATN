import type { MenuProps } from 'antd';
import { Typography } from 'antd';
import { MdOutlineTableChart } from "react-icons/md";
import { Link } from "react-router-dom";
import { URL } from '../../../utils/url';
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
          <Link to={'/'}>
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
          <Link to={'/'}>
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
          <Link to={'/'}>
            <WechatFilled style={{ fontSize: '18px' }} />
          </Link>,
        label:
          <>
            <Text strong>Tin nhắn</Text>
          </>
      },
      {
        key: '4',
        icon:
          <Link to={'/'}>
            <EyeFilled style={{ fontSize: '18px' }} />
          </Link>,
        label:
          <>
            <Text strong>Theo dõi</Text>
          </>
      },
      {
        key: '5',
        icon:
          <Link to={'/'}>
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
            src={workspace?.logo.replace("D:\\Đồ Án Tốt Nghiệp\\Project\\frontend\\", "")}
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