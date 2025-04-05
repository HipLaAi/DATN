import { Button, Col, Modal, Row, Typography, Input, Divider, Avatar, List, Checkbox, Flex, Menu, Upload, Space } from 'antd';
import styles from './CardDialog.module.scss';
import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import DateModal from './DateModal/DateModal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    BookOutlined,
    CheckSquareOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    LinkOutlined,
    UploadOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    UserOutlined
} from '@ant-design/icons';
import CustomPop from './../PopConfirm/PopConfirm';
import { createCheckListAPI, createCheckListNameAPI, deleteCheckListAPI, deleteCheckListNameAPI, updateCheckListAPI } from '../../services/CheckList/CheckList.service';
import { createFileAPI, deleteFileAPI } from '../../services/File/File.sevice';
import { deleteCardByIdAPI, updateInformationCard, updateUserJoinCardAPI, updateUserOutCardAPI } from '../../services/Card/Card.service';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const { Title, Text } = Typography;

const CardDialog = (props: any) => {
    const { cardData } = props
    const userId = localStorage.getItem("user_id")
    const [data, setData] = useState<any>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkListName, setCheckListName] = useState<any>("")
    const [checkList, setCheckList] = useState<any>("")
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [userAvatar, setUserAvatar] = useState<any>(null);
    const [userName, setUserName] = useState<any>(null);
    const [description, setDescription] = useState("");

    const filteredGuests = props?.board?.guest?.filter(
        (guest: any) => !data?.userjoin?.some((user: any) => user.user_id === guest.user_id)
    );

    useEffect(() => {
        const avatar = localStorage.getItem("user_avatar");
        const name = localStorage.getItem("user_name");
        if (avatar && name) {
            setUserAvatar(avatar);
            setUserName(name);
        }
    }, []);

    const handleUploadChange = async (info: any) => {
        // Lấy danh sách file từ event
        const formData = new FormData()
        // const { fileList } = info;

        // Cập nhật state
        setUploadedFiles(info);

        // Log danh sách file nếu cần
        if (info && typeof info != "string") {
            formData.append("files", info)
            formData.append("card_id", data.card_id)
        }
        const responese = await createFileAPI(formData)
        const newData = { ...data }
        newData.file.push(responese)
        setData(newData)
    };

    const handleDescriptionChange = (value: any) => {
        setDescription(value);
    };
    const handleCreateCheckListName = async () => {
        const response = await createCheckListNameAPI({
            name: checkListName,
            card_id: cardData.card_id
        })
        const newData = { ...data }
        response.checklist = []
        newData.checklistname.push(response)
        setCheckListName("")
        setData(newData)
    }
    const handleCreateCheckList = async (idCheckListName: any) => {
        const response = await createCheckListAPI({
            checklistname_id: idCheckListName,
            name: checkList
        })
        const newData = { ...data }
        newData.checklistname.find((ckl: any) => ckl.checklistname_id == idCheckListName)?.checklist?.push(response)
        setCheckList("")
        setData(newData)
    }
    const handleDeleteCheckListName = (id: string) => {
        const newData = { ...data }
        newData.checklistname = newData.checklistname.filter((c: any) => c.checklistname_id != id)
        setData(newData)
        deleteCheckListNameAPI(id)
    }
    const handleDeleteCheckList = (idCheckList: string, idCheckListName: string) => {
        const newData = { ...data }
        const checkListNameIndex = newData.checklistname.findIndex((c: any) => c.checklistname_id == idCheckListName)
        newData.checklistname[checkListNameIndex].checklist = newData.checklistname[checkListNameIndex].checklist.filter((i: any) => i.checklist_id != idCheckList)
        setData(newData)

        deleteCheckListAPI(idCheckList)
    }

    const handleUseJoinCard = async (user_id: any) => {
        handleToast("Thành công tham gia vào thẻ!", user_id)
        const respone = await updateUserJoinCardAPI(data.card_id, {
            user_id: user_id,
        })
        const newData = { ...data }
        if (!newData.userjoin) {
            newData.userjoin = []
        }
        newData.userjoin.push(respone)
        setData(newData)
    }
    const handleUseOutCard = async (user_id: any) => {
        handleToast("Rời khỏi thẻ thành công!", user_id)
        const respone = await updateUserOutCardAPI(data.card_id, {
            user_id: user_id,
        })
        const newData = { ...data }
        newData.userjoin = newData.userjoin.filter((user: any) => user.user_id != respone.user_id)
        setData(newData)
    }

    const handleUpdateInformationCard = async () => {
        await updateInformationCard(data.card_id, {
            name: data.name,
            description: description
        })
        handleToast("Cập nhật thông tin thành công", data.card_id)
    }

    const handleToast = (message: any, id: any) => {
        toast.success(message, {
            toastId: message + id,
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    const handleDelete = async () => {
        await deleteCardByIdAPI(data.card_id);
        handleToast("Xóa thẻ thành công!", data.card_id)
        props.handleToggleModal();
    }

    const handleUpdateCheckList = async (id: any, user_id: any, name: any, timer: any, status: any) => {

        const data = {
            user_id: user_id,
            name: name,
            timer: timer,
            status: status,
            card_id: cardData.card_id
        }

        const reponse = await updateCheckListAPI(id, data);
        setData(reponse);
        handleToast("Cập nhật danh sách công việc thành công", id + user_id + status + name)
    }

    const handleDeleteFile = async (id: any) => {
        await deleteFileAPI(id);
        const newData = { ...data }
        newData.file = newData.file.filter((file: any) => file.file_id != id)
        setData(newData)
    }

    useEffect(() => {
        setDescription(props.cardData?.description);
    }, [props.cardData?.description])

    useEffect(() => {
        if (cardData) {
            setData(cardData)
        }

    }, [cardData?.card_id])
    if (!cardData) {
        return
    }


    return (
        <>
            <Modal width={900} footer={null} open={props.isModalOpen} onCancel={props.handleToggleModal} title={
                <Row align="middle" justify="space-between">
                    <Col>
                        <Flex vertical justify='center' gap="10px">
                            <Title level={4}>{data?.name}</Title>
                            <Text type="secondary">Trong danh sách {data?.column_name}</Text>
                            <Flex>
                                {
                                    data?.userjoin?.map((item: any) => (
                                        <>
                                            <Avatar src={item?.avatar.replace("D:\\DA4\\frontend\\", "")} title={item.name}></Avatar>
                                        </>
                                    ))
                                }
                            </Flex>
                        </Flex>
                    </Col>
                </Row>
            }>
                <Row gutter={[16, 16]}>
                    {/* Phần bên trái */}
                    <Col span={16}>
                        {/* Mô tả */}
                        <div>
                            <Title level={5}>Mô tả</Title>
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Thêm mô tả chi tiết hơn..."
                            />
                            <Button style={{ marginTop: "10px" }} onClick={handleUpdateInformationCard}>Lưu</Button>
                        </div>
                        {/* File */}
                        {
                            data?.file?.length > 0 && (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data?.file}
                                    renderItem={(i: any) => (
                                        <List.Item className={cx('listwork')}>
                                            <Upload
                                                defaultFileList={[
                                                    {
                                                        uid: i.file_id,
                                                        name: i.path.replace("D:\\DA4\\frontend\\src\\assets\\uploads\\", ""),
                                                        status: 'done',
                                                        url: i.path.replace("D:\\DA4\\frontend\\", ""),
                                                    }
                                                ]}
                                                showUploadList={{
                                                    showPreviewIcon: false,
                                                    showRemoveIcon: false,
                                                }}
                                                onPreview={(file) => {
                                                    window.open(file.url, '_blank');
                                                }}
                                            />
                                            <Button type='text' shape='circle' onClick={() => handleDeleteFile(i.file_id)}><DeleteOutlined /></Button>
                                        </List.Item>
                                    )}
                                />

                            )

                        }

                        {
                            data.checklistname?.length > 0 && (
                                <>
                                    {
                                        data.checklistname?.map((item: any) => (
                                            <>
                                                <Divider />
                                                <div key={item.checklistname_id} className={cx("new-section")}>

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                                                        <Title level={5} style={{ margin: '0' }}>{item.name}</Title>
                                                        <Button onClick={() => handleDeleteCheckListName(item.checklistname_id)}>Xóa</Button>
                                                    </div>
                                                    {
                                                        item.checklist?.length > 0 && (
                                                            <List
                                                                itemLayout="horizontal"
                                                                dataSource={item.checklist}
                                                                renderItem={(i: any) => (
                                                                    <List.Item className={cx('listwork')}>
                                                                        <div>
                                                                            <Checkbox checked={JSON.parse(i.status)} onClick={() => handleUpdateCheckList(i.checklist_id, i.user_id, i.name, i.timer, i.status === "true" ? "false" : "true")} />
                                                                            <span style={{ marginLeft: '10px' }}>{i.name}</span>
                                                                        </div>


                                                                        {
                                                                            props?.board?.guest?.find((guest: any) => guest.user_id === i.user_id) ? (
                                                                                <div className={cx('listwork-button-show')}>
                                                                                    <Button icon={<ClockCircleOutlined />} onClick={handleOpenModal}></Button>

                                                                                    <CustomPop title={
                                                                                        <>
                                                                                            <Flex justify='center'>
                                                                                                Thành viên
                                                                                            </Flex>
                                                                                        </>
                                                                                    } content={
                                                                                        <>
                                                                                            <Flex vertical gap="10px">
                                                                                                <Input style={{ width: "100%" }} placeholder='Tìm kiếm thành viên trong nhóm' />
                                                                                                <Menu
                                                                                                    style={{ width: 256 }}
                                                                                                    defaultSelectedKeys={['1']}
                                                                                                    defaultOpenKeys={['sub1']}
                                                                                                    mode="inline"
                                                                                                    items={[
                                                                                                        {
                                                                                                            key: 'grp',
                                                                                                            label: <Text strong>Thành viên trong thẻ</Text>,
                                                                                                            type: 'group',
                                                                                                            children: data?.userjoin?.map((item: any, index: any) => ({
                                                                                                                key: `userjoin-${index}`,
                                                                                                                label: <>
                                                                                                                    <Flex gap={8} style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                                                                                        <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                                                                                                                        <Text>{item.name}</Text>
                                                                                                                        <Button type='text' shape='circle' onClick={() => handleUpdateCheckList(i.checklist_id, item.user_id, i.name, i.timer, i.status)}><UserAddOutlined /></Button>
                                                                                                                    </Flex>
                                                                                                                </>

                                                                                                            })),
                                                                                                        },
                                                                                                        {
                                                                                                            key: 'grp',
                                                                                                            label: <Text strong>Thành viên trong bảng</Text>,
                                                                                                            type: 'group',
                                                                                                            children: filteredGuests?.map((item: any, index: any) => ({
                                                                                                                key: `guestjoin-${index}`,
                                                                                                                label: <>
                                                                                                                    <Flex gap={8} style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                                                                                        <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                                                                                                                        <Text>{item.name}</Text>
                                                                                                                        <Button type='text' shape='circle' onClick={() => handleUpdateCheckList(i.checklist_id, item.user_id, i.name, i.timer, i.status)}><UserAddOutlined /></Button>
                                                                                                                    </Flex>
                                                                                                                </>
                                                                                                            }))
                                                                                                        },
                                                                                                        {
                                                                                                            key: 'grp',
                                                                                                            label:
                                                                                                                <Flex justify='center' align='center'>
                                                                                                                    <Text onClick={() => handleUpdateCheckList(i.checklist_id, item.user_id, i.name, i.timer, i.status)}>Loại bỏ thành viên</Text>
                                                                                                                </Flex>
                                                                                                        },
                                                                                                    ]}
                                                                                                />
                                                                                            </Flex>
                                                                                        </>
                                                                                    }>

                                                                                        <Avatar style={{ border: "1px #5ac8fa solid" }} src={props?.board?.guest?.find(
                                                                                            (guest: any) => guest.user_id === i.user_id
                                                                                        )?.avatar.replace("D:\\DA4\\frontend\\", "")}></Avatar>

                                                                                    </CustomPop>

                                                                                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCheckList(i.checklist_id, item.checklistname_id)}></Button>
                                                                                </div>
                                                                            ) : (
                                                                                <div className={cx('listwork-button-hidden')}>
                                                                                    <Button icon={<ClockCircleOutlined />} onClick={handleOpenModal}></Button>

                                                                                    <CustomPop title={
                                                                                        <>
                                                                                            <Flex justify='center'>
                                                                                                Thành viên
                                                                                            </Flex>
                                                                                        </>
                                                                                    } content={
                                                                                        <>
                                                                                            <Flex vertical gap="10px">
                                                                                                <Input style={{ width: "100%" }} placeholder='Tìm kiếm thành viên trong nhóm' />
                                                                                                <Menu
                                                                                                    style={{ width: 256 }}
                                                                                                    defaultSelectedKeys={['1']}
                                                                                                    defaultOpenKeys={['sub1']}
                                                                                                    mode="inline"
                                                                                                    items={[
                                                                                                        {
                                                                                                            key: 'grp',
                                                                                                            label: <Text strong>Thành viên trong thẻ</Text>,
                                                                                                            type: 'group',
                                                                                                            children: data?.userjoin?.map((item: any, index: any) => ({
                                                                                                                key: `userjoin-${index}`,
                                                                                                                label: <>
                                                                                                                    <Flex gap={8} style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                                                                                        <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                                                                                                                        <Text>{item.name}</Text>
                                                                                                                        <Button type='text' shape='circle' onClick={() => handleUpdateCheckList(i.checklist_id, item.user_id, i.name, i.timer, i.status)}><UserAddOutlined /></Button>
                                                                                                                    </Flex>
                                                                                                                </>

                                                                                                            })),
                                                                                                        },
                                                                                                        {
                                                                                                            key: 'grp',
                                                                                                            label: <Text strong>Thành viên trong bảng</Text>,
                                                                                                            type: 'group',
                                                                                                            children: filteredGuests?.map((item: any, index: any) => ({
                                                                                                                key: `guestjoin-${index}`,
                                                                                                                label: <>
                                                                                                                    <Flex gap={8} style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                                                                                        <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                                                                                                                        <Text>{item.name}</Text>
                                                                                                                        <Button type='text' shape='circle' onClick={() => handleUpdateCheckList(i.checklist_id, item.user_id, i.name, i.timer, i.status)}><UserAddOutlined /></Button>
                                                                                                                    </Flex>
                                                                                                                </>
                                                                                                            }))
                                                                                                        },
                                                                                                    ]}
                                                                                                />
                                                                                            </Flex>
                                                                                        </>
                                                                                    }>
                                                                                        <Button icon={<UserAddOutlined />}></Button>
                                                                                    </CustomPop>

                                                                                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCheckList(i.checklist_id, item.checklistname_id)}></Button>
                                                                                </div>)
                                                                        }
                                                                    </List.Item>
                                                                )}
                                                            />

                                                        )
                                                    }
                                                    <Flex vertical gap="10px" style={{ marginTop: "10px" }}>
                                                        <Input placeholder='Thêm một mục' value={checkList} onChange={(e) => setCheckList(e.target.value)} />
                                                        <Button style={{ width: "fit-content" }} type='primary' onClick={() => handleCreateCheckList(item?.checklistname_id)}>Thêm một mục</Button>
                                                    </Flex>
                                                </div>
                                                <Divider />
                                            </>
                                        ))
                                    }

                                </>
                            )
                        }

                        {/* Hoạt động */}
                        <div>
                            <Title level={5}>Hoạt động</Title>
                            <Input placeholder="Viết bình luận..." prefix={<Avatar src={userAvatar} />} />
                            {
                                data.comment?.length > 0 && (
                                    <>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={data.comment}
                                            renderItem={(item: any) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={userAvatar} />}
                                                        title={
                                                            <Text>
                                                                <strong>{userName}</strong>
                                                            </Text>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </>
                                )
                            }

                        </div>
                    </Col>

                    {/* Phần bên phải */}
                    <Col span={8}>
                        {
                            data.userjoin?.find((u: any) => u.user_id == userId) ? (
                                <Button block icon={<UserAddOutlined />} onClick={() => handleUseOutCard(userId)} className={cx("button")}>Rời đi</Button>
                            ) : (
                                <Button block icon={<UserAddOutlined />} onClick={() => handleUseJoinCard(userId)} className={cx("button")}>Tham gia</Button>
                            )
                        }

                        <CustomPop title={
                            <>
                                <Flex justify='center'>
                                    Thành viên
                                </Flex>
                            </>
                        } content={
                            <>
                                <Flex vertical gap="10px">
                                    <Input style={{ width: "100%" }} placeholder='Tìm kiếm thành viên trong nhóm' />
                                    <Menu
                                        style={{ width: 256 }}
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        mode="inline"
                                        items={[
                                            {
                                                key: 'grp',
                                                label: <Text strong>Thành viên trong thẻ</Text>,
                                                type: 'group',
                                                children: data?.userjoin?.map((item: any, index: any) => ({
                                                    key: `userjoin-${index}`,
                                                    label: <>
                                                        <Flex gap={8} style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                            <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                                                            <Text>{item.name}</Text>
                                                            <Button type='text' shape='circle' onClick={() => handleUseOutCard(item.user_id)}><UserDeleteOutlined /></Button>
                                                        </Flex>
                                                    </>

                                                })),
                                            },
                                            {
                                                key: 'grp',
                                                label: <Text strong>Thành viên trong bảng</Text>,
                                                type: 'group',
                                                children: filteredGuests?.map((item: any, index: any) => ({
                                                    key: `guestjoin-${index}`,
                                                    label: <>
                                                        <Flex gap={8} style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                            <Avatar src={item?.avatar?.replace("D:\\DA4\\frontend\\", "")} />
                                                            <Text>{item.name}</Text>
                                                            <Button type='text' shape='circle' onClick={() => handleUseJoinCard(item.user_id)}><UserAddOutlined /></Button>
                                                        </Flex>
                                                    </>
                                                }))
                                            },
                                        ]}
                                    />
                                </Flex>
                            </>
                        }>
                            <Button block icon={<UserOutlined />} className={cx("button")}>
                                Thành viên
                            </Button>
                        </CustomPop>

                        <CustomPop title={
                            <>
                                <Flex justify='center'>
                                    Việc cần làm
                                </Flex>
                            </>
                        } action={true} content={
                            <>
                                <Flex vertical gap="10px" style={{ marginTop: "10px" }}>
                                    <Text strong>Tiêu đề</Text>
                                    <Input style={{ width: "300px" }} value={checkListName} onChange={(e) => setCheckListName(e.target.value)} placeholder='Việc cần làm' />
                                </Flex>
                            </>
                        } handleFunction={handleCreateCheckListName}>
                            <Button block icon={<CheckSquareOutlined />} className={cx("button")}>
                                Việc cần làm
                            </Button>
                        </CustomPop>
                        <Button block icon={<ClockCircleOutlined />} className={cx("button")} onClick={handleOpenModal}>Ngày</Button>
                        <CustomPop title={
                            <>
                                <Flex justify='center'>
                                    Đính kèm
                                </Flex>
                            </>
                        } content={
                            <>
                                <Flex vertical gap="10px" style={{ marginTop: "10px" }}>
                                    <Text strong>Đính kèm từ máy tính của bạn</Text>
                                    <Upload
                                        // onChange={handleUploadChange}
                                        multiple
                                        beforeUpload={(file) => {
                                            handleUploadChange(file);
                                            return false;
                                        }}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Chọn tệp
                                        </Button>
                                    </Upload>
                                </Flex>
                            </>
                        } >
                            <Button block icon={<LinkOutlined />} className={cx("button")}>
                                Đính kèm
                            </Button>
                        </CustomPop>
                        <CustomPop action={true} handleFunction={handleDelete} title={"Xác nhận xóa thẻ"}>
                            <Button block icon={<BookOutlined />} className={cx("button")} >Xóa</Button>
                        </CustomPop>
                    </Col>
                </Row>
            </Modal>
            <DateModal isModalDate={true} isOpen={isModalOpen} onClose={handleCloseModal} start_date={data?.start_date} end_date={data?.end_date} timer={data?.timer} card_id={data?.card_id}/>
        </>
    );
};

export default CardDialog;