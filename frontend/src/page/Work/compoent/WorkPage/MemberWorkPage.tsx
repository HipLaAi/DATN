import { Col, Row, Typography, Menu, MenuProps, Flex, Divider, List, Avatar, Select } from "antd"
import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext, useParams } from "react-router-dom";
import { deleteMemberAPI, getGuestByWorkspaceIdAPI, getMemberByWorkspaceIdAPI } from "../../../../services/WorkSpace/workSapce.service";
import { Button } from "antd/es/radio";
import { deleteGuestAPI } from "../../../../services/Board/board.sevice";


const { Title, Text } = Typography

type MenuItem = Required<MenuProps>['items'][number];

const MemberWorkPage = () => {
  const { dataMember } = useOutletContext<{ dataMember: any }>();
  const [dataGuest, setDataGuest] = useState<any>([])
  const [dataMembers, setDataMember] = useState<any>(dataMember)
  const { idWorkspace } = useParams();
  const location = useLocation();

  const fetchGetGuest = async () => {
    const response = await getGuestByWorkspaceIdAPI(idWorkspace);
    setDataGuest(response)
  }

  useEffect(() => {
    fetchGetGuest()
  }, [])

  useEffect(() => {
    setDataMember(dataMember)
  }, [dataMember])


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
          label: <Link to={`/workspace/${idWorkspace}/member`}>Thành viên trong không gian làm việc</Link>
        },
        {
          key: '6',
          label: <Link to={`/workspace/${idWorkspace}/guest`}>Khách</Link>
        },
      ],
    },
  ];

  const userID = localStorage.getItem("user_id")
  const isOwn = dataMember?.find((item: any) => item.user_id == userID)

  const handleDeleteGuest = async (boardID: any, userID: any) => {
    await deleteGuestAPI(boardID, {
      user_id: userID,
    });
  
    var newDataGuest = [...dataGuest];
    newDataGuest = newDataGuest.filter((item: any) => item.user_id !== userID);
    setDataGuest(newDataGuest);
  };
  
  const handleDeleteMember = async (userID: any) => {
    await deleteMemberAPI(idWorkspace, {
      user_id: userID
    })

    var newDataMember = [...dataMembers];
    newDataMember = newDataMember.filter((item: any) => item.user_id !== userID);
    setDataMember(newDataMember);
  }

  console.log(dataGuest);

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
                <Title level={4}> Cộng tác trong không gian làm việc</Title>
                <Divider></Divider>
                <List
                  dataSource={location.pathname === `/workspace/${idWorkspace}/member` ? dataMembers : dataGuest}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />}
                        title={item.name}
                        description={item.email}
                      />

                      {
                        isOwn.role == "own" ? (
                          <>
                            <Select
                              value={item.role}
                            // onChange={}
                            // style={{ width: "100%", marginTop: 8 }}
                            >
                              <Select.Option value="own">Quản trị</Select.Option>
                              <Select.Option value="member">Thành viên</Select.Option>
                              <Select.Option value="guest">Khách</Select.Option>
                            </Select>
                            {
                              (item.role == "guest") && (<Button style={{ marginLeft: "10px" }} onClick={() => handleDeleteGuest(item.board_id, item.user_id)}>Xóa khách</Button>)
                            }
                            {
                              (item.role == "member") && (<Button style={{ marginLeft: "10px" }} onClick={() => handleDeleteMember(item.user_id)}>Xóa thành viên</Button>)
                            }
                          </>
                        ) : (
                          <>
                            <Select
                              disabled
                              value={item.role}
                            // onChange={}
                            // style={{ width: "100%", marginTop: 8 }}
                            >
                              <Select.Option value="own">Quản trị</Select.Option>
                              <Select.Option value="member">Thành viên</Select.Option>
                              <Select.Option value="guest">Khách</Select.Option>
                            </Select>
                          </>
                        )
                      }
                    </List.Item>
                  )}
                />
              </Col>
            </Flex>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export { MemberWorkPage }
