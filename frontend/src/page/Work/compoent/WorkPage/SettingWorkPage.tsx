import { Button, Col, Flex, List, Menu, Row, Typography } from 'antd';
import CustomPop from '../../../../component/PopConfirm/PopConfirm';
import { useState } from 'react';
import { LockOutlined, GlobalOutlined } from '@ant-design/icons';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { deleteWorkspaceAPI } from '../../../../services/WorkSpace/workSapce.service';



const { Title, Text, Paragraph } = Typography
const SettingWorkPage = () => {
    const currentUser = localStorage.getItem("user_id")
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const { data, dataMember } = useOutletContext<{ data: any, dataMember:any }>();

    const { idWorkspace } = useParams();
    const navigate = useNavigate();

    const deleteWorkspace = async () => {
        await deleteWorkspaceAPI(idWorkspace);
        navigate("/");
    }

    const options = [
        {
            key: "1",
            label: ' Riêng tư',
            icon: <LockOutlined />

        },
        {
            key: "2",
            label: "Công khai",
            icon: <GlobalOutlined />
        },
    ];
    return (
        <>
            <Row justify="center">
                <Col span={20}>
                    <Title style={{ margin: "8px" }} level={4}>
                        Các cài đặt không gian làm việc
                        <List
                            header={<Text strong style={{ fontSize: "16px" }}>Khả năng hiển thị trong không gian làm việc</Text>}
                            dataSource={[""]}
                            renderItem={() => (
                                <List.Item style={{ margin: 0 }}>
                                    <Row>
                                        <Col span={18} style={{ marginRight: "10px" }}>
                                            <Paragraph style={{ textAlign: "justify", alignItems: "center" }}>
                                                Công khai - Đây là Không gian làm việc công khai. Bất kỳ ai có đường dẫn tới Không gian làm việc đều có thể nhìn thấy Không gian làm việc và Không gian làm việc có thể được tìm thấy trên các công cụ tìm kiếm như Google. Chỉ những người được mời vào Không gian làm việc mới có thể thêm và chỉnh sửa các bảng của Không gian làm việc.
                                            </Paragraph>
                                        </Col>
                                        <Col span={4}>
                                            <CustomPop title={
                                                <>
                                                    <Text>Chọn khả năng hiển thị trong không gian làm việc</Text>
                                                </>
                                            } content={
                                                <>
                                                    <Flex>
                                                        <Menu mode="vertical" style={{ flex: 1, border: 0 }}>
                                                            {options.map((item) => (
                                                                <Menu.Item
                                                                    key={item.key}
                                                                    icon={item.icon}
                                                                    onClick={() => setSelectedOption(item?.label)}
                                                                >
                                                                    {item.label}
                                                                </Menu.Item>
                                                            ))}
                                                        </Menu>
                                                    </Flex>
                                                </>
                                            }>
                                                <Button color='default' variant='filled'>Thay đổi</Button>
                                            </CustomPop>
                                        </Col>
                                    </Row>

                                </List.Item>
                            )}
                        />
                    </Title>
                    {
                         dataMember.find((m:any)=> m.user_id == currentUser)?.role == "own" && (<Button color='default' variant='filled' onClick={deleteWorkspace}>
                            <Text strong>
                                Xóa không gian làm việc
                            </Text>
                        </Button>)
                    }
                </Col>
            </Row>

        </>
    )
}

export default SettingWorkPage