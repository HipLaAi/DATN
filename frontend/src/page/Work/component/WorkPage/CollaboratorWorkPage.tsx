import { Col, Row, Typography, Menu, MenuProps, Flex } from "antd"
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { URL } from "../../../../utils/url";

const { Title, Text } = Typography

type MenuItem = Required<MenuProps>['items'][number];

const CollaboratorWorkPage = () => {
  const { data } = useOutletContext<{ data: any }>();
  const { idWorkspace } = useParams();

  const items: MenuItem[] = [
    {
      key: 'grp',
      label: <>
        <Title level={3} style={{ margin: "8px" }}> Người cộng tác</Title>
      </>,
      type: 'group',
      children: [
        {
          key: '5',
          label: <Link to={URL.WORKSPACE.BUILDER.MEMBER(idWorkspace)}>Thành viên trong không gian làm việc</Link>

        },
        {
          key: '6',
          label: <Link to={URL.WORKSPACE.BUILDER.GUEST(idWorkspace)}>Khách</Link>
        },
      ],
    },
  ];

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Row>
            <Flex style={{ width: "100%" }} gap="20px">
              <Col span={7}>
                <Menu
                  style={{ width: "100%" }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  items={items}
                />
              </Col>
              <Col span={16}>
                <Outlet context={{
                  data: data,
                  idWorkspace: idWorkspace
                }} />
              </Col>
            </Flex>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export { CollaboratorWorkPage }
