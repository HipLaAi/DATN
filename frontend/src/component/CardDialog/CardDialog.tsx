import { Button, Col, Modal, Row, Typography, Input, Divider, Avatar, List, Checkbox, Flex, Menu, Upload, Space, Progress, Radio, DatePicker, TimePicker } from 'antd';
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
    CloseOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
    FileExcelOutlined,
    FileImageOutlined,
    FileOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    LikeOutlined,
    LinkOutlined,
    MinusOutlined,
    SaveOutlined,
    SettingOutlined,
    TagsOutlined,
    UploadOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    UserOutlined
} from '@ant-design/icons';
import CustomPop from './../PopConfirm/PopConfirm';
import { createCheckListAPI, createCheckListNameAPI, deleteCheckListAPI, deleteCheckListNameAPI, updateCheckListAPI } from '../../services/CheckList/CheckList.service';
import { createFileAPI, deleteFileAPI } from '../../services/File/File.sevice';
import { deleteCardByIdAPI, updateInformationCard, updateStatusCardAPI, updateUserJoinCardAPI, updateUserOutCardAPI } from '../../services/Card/Card.service';
import { toast, ToastOptions } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { createLabelAPI, deleteLabelAPI, getLabelBoardAPI } from '../../services/Label/LabelBoard.service';
import { useDispatch, useSelector } from 'react-redux';
import decodeJWT from '../../services/Auth/auth.service ';
import { getSettingCardAPI, updateSettingCardAPI } from '../../services/Setting/settingCard.service';
import React from 'react';
import dayjs from "dayjs";
import { createActivityCardAPI, getActivityCardAPI } from '../../services/ActivityLog/ActivityLog.service';
import { createCommentAPI, deleteCommentAPI, updateCommentAPI } from '../../services/Comment/Comment.services';

const cx = classNames.bind(styles);

const { Title, Text } = Typography;

const CardDialog = (props: any) => {
    const { cardData } = props
    const { id } = useParams()
    const token = localStorage.getItem('accessToken') as string;
    const userInfo = decodeJWT(token);
    const userId = userInfo.user_id;
    const [data, setData] = useState<any>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkListName, setCheckListName] = useState<any>("")
    // const [checkList, setCheckList] = useState<any>("")
    const [checkList, setCheckList] = useState<any>({});

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [userAvatar, setUserAvatar] = useState<any>(null);
    const [userName, setUserName] = useState<any>(null);
    const [description, setDescription] = useState("");
    const [labelBoard, setLabelBoard] = useState<any>();
    const [setting, setSetting] = useState<any>();
    const [comment, setComment] = useState<any>();
    const [activitylog, setActivityLog] = useState<any>();
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editedComment, setEditedComment] = useState<string>("");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [loadingFileId, setLoadingFileId] = useState(null); // Theo dõi file đang xóa
    const { confirm } = Modal;
    const [status, setSatus] = useState<string>(cardData?.status);

    const filteredGuests = props?.board?.guest?.filter(
        (guest: any) => !data?.userjoin?.some((user: any) => user.user_id === guest.user_id)
    );

    const cardDetailReload = useSelector(
        (state: any) => state.reload.cardDetailReload
    );

    useEffect(() => {
        const avatar = localStorage.getItem("avatar");
        const name = localStorage.getItem("name");
        if (avatar && name) {
            setUserAvatar(avatar);
            setUserName(name);
        }
    }, []);

    const handleNotification = (message: string, status: "success" | "error") => {
        const toastOptions: ToastOptions = {
            toastId: message,
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        };

        const toastActions = {
            success: () => toast.success(message, toastOptions),
            error: () => toast.error(message, toastOptions),
        };

        toastActions[status]?.();
    };

    // Hàm xử lý upload file
    const handleUploadChange = async (info: any) => {
        const isLt = info.size / 1024 / 1024 < 10;
        if (!isLt) {
            handleNotification("File phải nhỏ hơn 10MB!", "error");
            return;
        }
        // Lấy danh sách file từ event
        const formData = new FormData()
        // const { fileList } = info;

        // Cập nhật state
        // setUploadedFiles(info);

        // Log danh sách file nếu cần
        if (info && typeof info != "string") {
            formData.append("files", info)
            formData.append("card_id", data.card_id)
        }
        setLoadingUpload(true)
        try {
            const responese = await createFileAPI(formData);
            const newData = { ...data };

            // Kiểm tra và khởi tạo `file` nếu chưa tồn tại hoặc không phải là mảng
            newData.file = Array.isArray(newData.file) ? newData.file : [];

            // Thêm file mới vào mảng
            newData.file.unshift(responese);

            // Cập nhật state và hiển thị thông báo
            setData(newData);
            handleNotification("Tải file thành công.", "success");
        } catch (error) {
            handleNotification("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
            console.log("Fail:", error)
        } finally {
            setLoadingUpload(false)
        }
    };

    // hàm cập nhật mô tả thẻ
    const handleDescriptionChange = (value: any) => {
        setDescription(value);
    };

    // Hàm tạo tên mục danh sách công việc
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
        handelCreateActivity("đã thêm danh sách công việc " + checkListName + " vào thẻ này")
        handleNotification("Tạo thành công.", "success");
    }

    //Hàm tạo danh sách công việc
    const handleCreateCheckList = async (idCheckListName: any) => {
        const checklistName = checkList[idCheckListName];

        if (!checklistName) return;
        const response = await createCheckListAPI({
            checklistname_id: idCheckListName,
            name: checklistName
        })
        const newData = { ...data }
        newData.checklistname.find((ckl: any) => ckl.checklistname_id == idCheckListName)?.checklist?.push(response)
        setCheckList("")
        setData(newData)
    }

    //Hàm xóa tên mục danh sách công việc
    const handleDeleteCheckListName = async (id: string) => {
        const newData = { ...data }
        const checklistToDelete = data.checklistname.find((item: any) => item.checklistname_id === id);
        handelCreateActivity(`đã xóa danh sách công việc "${checklistToDelete.name}" của thẻ này`);
        handleNotification("Xóa thành công.", "success");
        newData.checklistname = newData.checklistname.filter((c: any) => c.checklistname_id != id)
        setData(newData)
        await deleteCheckListNameAPI(id)
    }

    //Hàm xóa công việc trong danh sách công việc
    const handleDeleteCheckList = async (idCheckList: string, idCheckListName: string) => {
        const newData = { ...data }
        const checkListNameIndex = newData.checklistname.findIndex((c: any) => c.checklistname_id == idCheckListName)
        newData.checklistname[checkListNameIndex].checklist = newData.checklistname[checkListNameIndex].checklist.filter((i: any) => i.checklist_id != idCheckList)
        setData(newData)
        handleNotification("Xóa thành công.", "success");
        await deleteCheckListAPI(idCheckList)
    }

    //Hàm người dùng tham gia thẻ
    const handleUseJoinCard = async (user_id: any) => {
        handleToast("Thành công tham gia vào thẻ!", user_id)
        handelCreateActivity("đã tham gia thẻ này");
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

    //Hàm người dùng rời khỏi thẻ
    const handleUseOutCard = async (user_id: any) => {
        handleToast("Rời khỏi thẻ thành công!", user_id)
        handelCreateActivity("đã rời khỏi thẻ này");
        const respone = await updateUserOutCardAPI(data.card_id, {
            user_id: user_id,
        })
        const newData = { ...data }
        newData.userjoin = newData.userjoin.filter((user: any) => user.user_id != respone.user_id)
        setData(newData)
    }

    //Hàm cập nhật thông tin (mô tả) thẻ
    const handleUpdateInformationCard = async () => {
        await updateInformationCard(data.card_id, {
            name: data.name,
            description: description
        })
        handleToast("Cập nhật thông tin thành công", data.card_id)
    }

    //hàm thông báo modal
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

    //Hàm Xóa thẻ
    const handleDelete = async () => {
        await deleteCardByIdAPI(data.card_id);
        handleToast("Xóa thẻ thành công!", data.card_id)
        props.handleToggleModal();
    }

    //Hàm show xác nhận xóa
    const showDeleteConfirm = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa thẻ này?',
            icon: <ExclamationCircleFilled />,
            content: 'Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete();
            },
            onCancel() {
            },
        });
    }

    // Hàm cập nhật trạng thái công việc 
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
        handelCreateActivity(`đã cập nhật trạng thái công việc "${name}" của thẻ này`);
    }

    //Hàm xóa file
    const handleDeleteFile = async (id: any) => {
        setLoadingFileId(id);
        try {
            await deleteFileAPI(id);
            const newData = { ...data }
            newData.file = newData.file.filter((file: any) => file.file_id != id)
            setData(newData)
            handleNotification("Xóa File thành công!", "success");
        } catch (error) {
            handleNotification("Đã !", "error");
        } finally {
            setLoadingFileId(null)
        }

    }

    //Hàm comment
    const handleCreateComment = async () => {
        const response = await createCommentAPI({
            card_id: cardData?.card_id,
            user_id: userId,
            comment: comment
        });

        const newData = { ...data };

        if (!Array.isArray(newData.comment)) {
            newData.comment = [];
        }

        newData.comment.unshift(response[0]);

        setData(newData);
        setComment("");
    };

    //hàm xóa comment
    const handleDeleteComment = async (id: any) => {
        await deleteCommentAPI(id);
        const newData = { ...data }
        newData.comment = newData.comment.filter((comment: any) => comment.comment_id != id)
        setData(newData)
    }

    useEffect(() => {
        setDescription(props.cardData?.description);
    }, [props.cardData?.description])

    useEffect(() => {
        if (cardData) {
            setComment("");
            setData(cardData);
            setSatus(cardData?.status);
            fetchLabelBoard();
            fetchSettingCard(cardData?.card_id);
            fetchActivityLogCard(cardData?.card_id);
        }
    }, [cardData?.card_id, cardDetailReload])

    if (!cardData) {
        return
    }

    // Hàm gọi setting card
    const fetchSettingCard = async (cardID: any) => {
        try {
            const results = await getSettingCardAPI(cardID);
            setSetting(results);
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    // Hàm gọi danh sách các label có trong bảng
    const fetchLabelBoard = async () => {
        if (id) {
            const results = await getLabelBoardAPI(id)
            setLabelBoard(results);
        }
    }

    // Hàm gán nhãn
    const handelCreateLabel = async (lbID: any, cardID: any) => {
        try {
            const response = await createLabelAPI({
                labelboard_id: lbID,
                card_id: cardID
            })
            const newData = { ...data }
            if (!Array.isArray(newData.label)) {
                newData.label = [];
            }
            newData.label.push(response)
            setData(newData)
        } catch (error) {
            console.error('Create failed:', error);
        }
    }

    //Hàm gỡ nhãn
    const handelDeleteLabel = async (labelID: any) => {
        try {
            const newData = { ...data }
            newData.label = newData.label.filter((l: any) => l.label_id != labelID)
            setData(newData)
            await deleteLabelAPI(labelID)
        } catch (error) {
            console.error('Delete failed:', error);
        }
    }

    // Hàm cập nhật cài đặt thẻ trong dataset
    const handleSettingCardChange = (action: any, value: any) => {
        setSetting((prevData: any) =>
            prevData?.map((item: any) =>
                item.action === action
                    ? {
                        ...item,
                        permission: value,
                    }
                    : item
            ),
        );
    };

    // Hàm call API cập nhật cài đặt
    const updateSetting = async (key: string, value: string) => {
        if (cardData?.card_id) {
            const newData = {
                action: key,
                permission: value
            };
            handleSettingCardChange(key, value);
            await updateSettingCardAPI(cardData?.card_id, newData);
        }
    };

    // Hàm hiển thị chỉnh sửa comment
    const handleEdit = (id: string, content: string) => {
        setEditingCommentId(id);
        setEditedComment(content);
    };

    // hàm cập nhật comment
    const handleSave = async (id: string) => {
        await updateCommentAPI(id, {
            comment: editedComment
        })
        const newData = { ...data };

        newData.comment = newData.comment.map((item: any) => {
            if (item.comment_id === id) {
                return { ...item, comment: editedComment };
            }
            return item;
        });

        setData(newData);
        setEditingCommentId(null);
    };

    //hàm hủy cập nhật comment
    const handleCancel = () => {
        setEditingCommentId(null);
        setEditedComment("");
    };

    // Hàm gọi các hoạt động có trong thẻ
    const fetchActivityLogCard = async (cardID: any) => {
        try {
            const results = await getActivityCardAPI(cardID);
            setActivityLog(results);
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    // Hàm ghi hoạt động
    const handelCreateActivity = async (description: any) => {
        try {
            const response = await createActivityCardAPI({
                user_id: userId,
                card_id: cardData?.card_id,
                description: description
            })
            const newData = [response[0], ...activitylog];

            setActivityLog(newData)
        } catch (error) {
            console.error('Create failed:', error);
        }
    }


    // Hàm cập nhật trạng thái thẻ
    const handelStatusCard = async (newStatus: boolean) => {
        try {
            const statusStr = newStatus ? 'true' : 'false';
            await updateStatusCardAPI(cardData?.card_id, { status: statusStr });
            setSatus(statusStr);
            handleNotification("Cập nhật trạng thái thành công!", "success");
        } catch (error) {
            handleNotification("Đã xảy ra lỗi. Vui lòng thử lại!", "error");
        }
    };

    return (
        <>
            <Modal width={900} footer={null} open={props.isModalOpen} onCancel={props.handleToggleModal} title={
                <Row align="middle" justify="space-between">
                    <Col>
                        <Flex vertical justify='center' gap="10px">
                            <Flex justify="start" align="center" gap={10}>
                                <Checkbox
                                    checked={status === 'true'}
                                    onChange={(e) => handelStatusCard(e.target.checked)}
                                />
                                <Title level={4}>{data?.name}</Title>
                            </Flex>
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
                            <Flex
                                gap={10}
                                wrap="wrap"
                                style={{
                                    width: "100%",
                                    alignItems: "flex-start"
                                }}
                            >
                                {
                                    data?.label?.map((item: any) => (
                                        <Button
                                            key={item.id}
                                            type='text'
                                            style={{
                                                backgroundColor: item?.background,
                                                wordWrap: "break-word",
                                                fontWeight: "500",
                                                color: "#2a2a2a",
                                            }}
                                        >
                                            {item?.name}
                                        </Button>
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
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    pointerEvents: loadingFileId === i.file_id ? 'none' : 'auto', // Vô hiệu hóa khi đang xóa
                                                    opacity: loadingFileId === i.file_id ? 0.5 : 1, // Làm mờ khi đang xóa
                                                }}
                                            >
                                                {i.path && (
                                                    <Flex gap={10}>
                                                        {i.path.includes('.pdf') ? (
                                                            <>
                                                                <FilePdfOutlined style={{ fontSize: "18px", color: "red" }} />
                                                                <a
                                                                // href={i.path}
                                                                // download={i.path}
                                                                // target="_blank"
                                                                >
                                                                    {i?.path.split('/').pop()}
                                                                </a>
                                                            </>
                                                        ) : i.path.includes('.xlsx') || i.path.includes('.xls') ? (
                                                            <>
                                                                <FileExcelOutlined style={{ fontSize: "18px", color: "green" }} />
                                                                <a
                                                                    href={i.path}
                                                                    download={i.path}
                                                                // target="_blank"
                                                                >
                                                                    {i?.path.split('/').pop()}
                                                                </a>
                                                            </>
                                                        ) : i.path.includes('.docx') || i.path.includes('.doc') ? (
                                                            <>
                                                                <FileWordOutlined style={{ fontSize: "18px", color: "blue" }} />
                                                                <a
                                                                    href={i.path}
                                                                    download={i.path}
                                                                // target="_blank"
                                                                >
                                                                    {i?.path.split('/').pop()}
                                                                </a>
                                                            </>
                                                        ) : i.path.includes('.jpg') || i.path.includes('.jpeg') || i.path.includes('.png') ? (
                                                            <>
                                                                <FileImageOutlined style={{ fontSize: "18px", color: "orange" }} />
                                                                <a
                                                                    href={i.path}
                                                                    download={i.path}
                                                                    target="_blank"
                                                                >
                                                                    {i?.path.split('/').pop()}
                                                                </a>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FileOutlined style={{ fontSize: "18px", color: "gray" }} />
                                                                <a
                                                                    // href={i.path}
                                                                    download={i.path}
                                                                // target="_blank"
                                                                >
                                                                    {i?.path.split('/').pop()}
                                                                </a>
                                                            </>
                                                        )}
                                                    </Flex>
                                                )}
                                                <Button type='text' shape='circle' onClick={() => handleDeleteFile(i.file_id)}><DeleteOutlined /></Button>
                                            </div>
                                        </List.Item>
                                    )}
                                />

                            )

                        }
                        {
                            data.checklistname?.length > 0 && (
                                <>
                                    {
                                        data.checklistname?.map((item: any) => {

                                            const totalTasks = item.checklist?.length || 0;
                                            const completedTasks = item.checklist?.filter((i: any) => i.status === "true").length || 0;
                                            const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                                            return (
                                                <>
                                                    <Divider />
                                                    <div key={item.checklistname_id} className={cx("new-section")}>

                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                                                            <Title level={5} style={{ margin: '0' }}>{item.name}</Title>
                                                            <span>{`Hoàn thành: ${completionPercentage}%`}</span>
                                                            <Button onClick={() => handleDeleteCheckListName(item.checklistname_id)}>Xóa</Button>
                                                        </div>
                                                        <Progress percent={completionPercentage} status={completionPercentage === 100 ? "success" : "active"} />

                                                        {
                                                            item.checklist?.length > 0 && (
                                                                <List
                                                                    itemLayout="horizontal"
                                                                    dataSource={item.checklist}
                                                                    renderItem={(i: any) => (
                                                                        <List.Item className={cx('listwork')}>
                                                                            <div>
                                                                                {
                                                                                    (
                                                                                        setting?.map((item: any) => {
                                                                                            const isUserJoined = data.userjoin?.some((u: any) => u.user_id === userId);
                                                                                            const isUserCheck = (i.user_id === userId);
                                                                                            if (item?.action === "checklist") {
                                                                                                const hasPermission =
                                                                                                    item.permission === "all guest" ||
                                                                                                    (item.permission === "just admin" && (props?.board?.role === "own" || isUserCheck)) ||
                                                                                                    (item.permission === "card member" && (isUserJoined || props?.board?.role === "own"));

                                                                                                return hasPermission ? (
                                                                                                    <>
                                                                                                        <Checkbox checked={JSON.parse(i.status)} onClick={() => handleUpdateCheckList(i.checklist_id, i.user_id, i.name, i.timer, i.status === "true" ? "false" : "true")} />
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        <Checkbox disabled title="Quyền bị hạn chế" checked={JSON.parse(i.status)} />
                                                                                                    </>
                                                                                                );
                                                                                            }
                                                                                            return null;
                                                                                        })
                                                                                    )
                                                                                }
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
                                                                                        {/* Thời gian */}
                                                                                        {/* <CustomPop title={
                                                                                            <>
                                                                                                <Flex justify='center'>
                                                                                                    Thời gian
                                                                                                </Flex>
                                                                                            </>
                                                                                        } content={
                                                                                            <>

                                                                                                <Flex vertical gap={10}>
                                                                                                    <DatePicker
                                                                                                        // value={endDate ? dayjs(endDate) : null}
                                                                                                        // onChange={(date) => {
                                                                                                        //     if (date) {
                                                                                                        //         setEndDate((prev) => {
                                                                                                        //             const prevDayjs = prev ? dayjs(prev) : dayjs();
                                                                                                        //             return dayjs(date)
                                                                                                        //                 .set("hour", prevDayjs.hour())
                                                                                                        //                 .set("minute", prevDayjs.minute())
                                                                                                        //                 .set("second", 0);
                                                                                                        //         });
                                                                                                        //     } else {
                                                                                                        //         setEndDate(null);
                                                                                                        //     }
                                                                                                        // }}
                                                                                                        inputReadOnly={true}
                                                                                                    />
                                                                                                    <TimePicker
                                                                                                        // value={endDate ? dayjs(endDate) : null}
                                                                                                        // onChange={(time) => {
                                                                                                        //     if (time) {
                                                                                                        //         setEndDate((prev) => {
                                                                                                        //             const currentDate = prev ? dayjs(prev) : dayjs();
                                                                                                        //             return currentDate
                                                                                                        //                 .set("hour", time.hour())
                                                                                                        //                 .set("minute", time.minute())
                                                                                                        //                 .set("second", 0);
                                                                                                        //         });
                                                                                                        //     }
                                                                                                        // }}
                                                                                                        format="HH:mm"
                                                                                                        showNow={false}
                                                                                                        minuteStep={1}
                                                                                                        popupClassName="no-seconds-picker"
                                                                                                        inputReadOnly={true}
                                                                                                        hideDisabledOptions
                                                                                                    />


                                                                                                    <Button type="primary">
                                                                                                        Lưu
                                                                                                    </Button>
                                                                                                </Flex>
                                                                                            </>
                                                                                        }>
                                                                                            <Button icon={<ClockCircleOutlined />}></Button>
                                                                                        </CustomPop> */}

                                                                                        {/* Người tham gia */}
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

                                                                                        {/* Xóa */}
                                                                                        <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCheckList(i.checklist_id, item.checklistname_id)}></Button>
                                                                                    </div>)
                                                                            }
                                                                        </List.Item>
                                                                    )}
                                                                />

                                                            )
                                                        }
                                                        <Flex vertical gap="10px" style={{ marginTop: "10px" }}>
                                                            <Input
                                                                placeholder='Thêm một mục'
                                                                // value={checkList} 
                                                                // onChange={(e) => setCheckList(e.target.value)} 
                                                                value={checkList[item?.checklistname_id] || ""} // Lấy giá trị tương ứng từ state
                                                                onChange={(e) =>
                                                                    setCheckList({
                                                                        ...checkList,
                                                                        [item?.checklistname_id]: e.target.value, // Cập nhật giá trị riêng cho từng checklistname
                                                                    })
                                                                }
                                                            />
                                                            <Button style={{ width: "fit-content" }} type='primary' onClick={() => handleCreateCheckList(item?.checklistname_id)}>Thêm một mục</Button>
                                                        </Flex>
                                                    </div>
                                                    <Divider />
                                                </>
                                            )
                                        })
                                    }

                                </>
                            )
                        }

                        {/* Hoạt động */}
                        <div>
                            <Title level={5}>Hoạt động</Title>
                            {
                                (
                                    props?.setting?.map((item: any) => {
                                        if (item?.action === "comment") {
                                            const hasPermission =
                                                (item.permission === "all guest" && props?.board?.role != null) ||
                                                (item.permission === "just admin" && props?.board?.role === "own");

                                            return hasPermission ? (
                                                <>
                                                    <Input
                                                        spellCheck={false}
                                                        value={comment}
                                                        placeholder="Viết bình luận..."
                                                        prefix={<Avatar src={userAvatar} />}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        onPressEnter={handleCreateComment}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Input
                                                        title="Quyền bị hạn chế"
                                                        spellCheck={false}
                                                        disabled
                                                        placeholder="Viết bình luận..."
                                                        prefix={<Avatar src={userAvatar} />}
                                                    />
                                                </>
                                            );
                                        }
                                        return null;
                                    })
                                )
                            }

                            {
                                data.comment?.length > 0 && (
                                    <>
                                        <List
                                            dataSource={data.comment}
                                            renderItem={(item: any) => (
                                                <List.Item style={{ paddingLeft: "10px" }}>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item?.user_avatar} />}
                                                        title={
                                                            <div>
                                                                <Typography.Text strong>{item?.user_name}</Typography.Text>
                                                                <Typography.Text style={{ marginLeft: 8, fontSize: '12px', color: '#888' }}>
                                                                    {item?.timestamp ? dayjs(item.timestamp).format('DD/MM/YYYY HH:mm') : ''}
                                                                </Typography.Text>
                                                            </div>
                                                        }
                                                        description={
                                                            <div>
                                                                {editingCommentId === item.comment_id ? (
                                                                    <Space direction="vertical" style={{ width: "100%" }}>
                                                                        <Input
                                                                            spellCheck={false}
                                                                            value={editedComment}
                                                                            onChange={(e) => setEditedComment(e.target.value)}
                                                                            onPressEnter={() => handleSave(item.comment_id)}
                                                                        />
                                                                        <Flex gap={10}>
                                                                            <Button
                                                                                type="primary"
                                                                                icon={<SaveOutlined />}
                                                                                size="small"
                                                                                onClick={() => handleSave(item.comment_id)}
                                                                            >
                                                                                Lưu
                                                                            </Button>
                                                                            <Button
                                                                                type="default"
                                                                                icon={<CloseOutlined />}
                                                                                size="small"
                                                                                onClick={handleCancel}
                                                                            >
                                                                                Hủy
                                                                            </Button>
                                                                        </Flex>
                                                                    </Space>
                                                                ) : (
                                                                    <div>
                                                                        <Typography.Text>{item.comment}</Typography.Text>
                                                                        <Flex style={{ marginTop: 10 }} gap={10}>
                                                                            <Button
                                                                                type="text"
                                                                                icon={<EditOutlined />}
                                                                                size="small"
                                                                                onClick={() => handleEdit(item.comment_id, item.comment)}
                                                                            >
                                                                                Chỉnh sửa
                                                                            </Button>
                                                                            <Button
                                                                                type="text"
                                                                                icon={<DeleteOutlined />}
                                                                                size="small"
                                                                                onClick={() => handleDeleteComment(item.comment_id)}
                                                                            >
                                                                                Xóa
                                                                            </Button>
                                                                        </Flex>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </>
                                )
                            }

                            {
                                activitylog?.length > 0 && (
                                    <>
                                        <List
                                            dataSource={activitylog}
                                            renderItem={(item: any) => (
                                                <List.Item style={{ paddingLeft: "10px" }}>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item?.user_avatar} />}
                                                        title={
                                                            <div>
                                                                <Typography.Text strong>{item?.user_name}</Typography.Text>
                                                                <Typography.Text style={{ marginLeft: 8, fontSize: '12px', color: '#888' }}>
                                                                    {item?.created_at ? dayjs(item.created_at).format('DD/MM/YYYY HH:mm') : ''}
                                                                </Typography.Text>
                                                            </div>
                                                        }
                                                        description={
                                                            <div>
                                                                <Typography.Text>{item.description}</Typography.Text>
                                                            </div>
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

                        {/* Tham gia vào thẻ */}
                        {
                            setting?.map((item: any) => {
                                if (item?.action === "invite") {
                                    const isUserJoined = data.userjoin?.some((u: any) => u.user_id === userId);

                                    if (isUserJoined) {
                                        return (
                                            <Button
                                                block
                                                icon={<UserAddOutlined />}
                                                onClick={() => handleUseOutCard(userId)}
                                                className={cx("button")}
                                            >
                                                Rời đi
                                            </Button>
                                        );
                                    }

                                    const hasPermission =
                                        item.permission === "all guest" ||
                                        (item.permission === "just admin" && props?.board?.role === "own");

                                    if (hasPermission) {
                                        return (
                                            <Button
                                                block
                                                icon={<UserAddOutlined />}
                                                onClick={() => handleUseJoinCard(userId)}
                                                className={cx("button")}
                                            >
                                                Tham gia
                                            </Button>
                                        );
                                    }
                                }
                                return null;
                            })
                        }


                        {/* Thành viên */}
                        {
                            props?.board?.role === "own" ? (
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
                            ) : (
                                <></>
                            )
                        }


                        {/* Check list */}
                        {
                            (
                                setting?.map((item: any) => {
                                    const isUserJoined = data.userjoin?.some((u: any) => u.user_id === userId);
                                    if (item?.action === "handle") {
                                        const hasPermission =
                                            item.permission === "all guest" ||
                                            (item.permission === "just admin" && props?.board?.role === "own") ||
                                            (item.permission === "card member" && (isUserJoined || props?.board?.role === "own"));

                                        return hasPermission ? (
                                            <>
                                                <CustomPop title={
                                                    <>
                                                        <Flex justify='center'>
                                                            Việc cần làm
                                                        </Flex>
                                                    </>
                                                } content={
                                                    <>
                                                        <>
                                                            <Flex vertical gap="10px" style={{ marginTop: "10px" }}>
                                                                <Text strong>Tiêu đề</Text>
                                                                <Input required style={{ width: "300px" }} value={checkListName} onChange={(e) => setCheckListName(e.target.value)} placeholder='Việc cần làm' />
                                                                <Button type="primary" onClick={handleCreateCheckListName}>Tạo</Button>
                                                            </Flex>
                                                        </>
                                                    </>
                                                }>
                                                    <Button block icon={<CheckSquareOutlined />} className={cx("button")}>
                                                        Việc cần làm
                                                    </Button>
                                                </CustomPop>
                                            </>
                                        ) : (
                                            <>
                                                <Button block icon={<CheckSquareOutlined />} className={cx("button")} disabled title="Quyền bị hạn chế">
                                                    Việc cần làm
                                                </Button>
                                            </>
                                        );
                                    }
                                    return null;
                                })
                            )
                        }


                        {/* Ngày */}
                        {
                            (
                                setting?.map((item: any) => {
                                    const isUserJoined = data.userjoin?.some((u: any) => u.user_id === userId);
                                    if (item?.action === "handle") {
                                        const hasPermission =
                                            item.permission === "all guest" ||
                                            (item.permission === "just admin" && props?.board?.role === "own") ||
                                            (item.permission === "card member" && (isUserJoined || props?.board?.role === "own"));

                                        return hasPermission ? (
                                            <>
                                                <Button block icon={<ClockCircleOutlined />} className={cx("button")} onClick={handleOpenModal}>Ngày</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button block icon={<ClockCircleOutlined />} className={cx("button")} disabled title="Quyền bị hạn chế">Ngày</Button>
                                            </>
                                        );
                                    }
                                    return null;
                                })
                            )
                        }

                        {/* File */}
                        {
                            (
                                setting?.map((item: any) => {
                                    const isUserJoined = data.userjoin?.some((u: any) => u.user_id === userId);
                                    if (item?.action === "handle") {
                                        const hasPermission =
                                            item.permission === "all guest" ||
                                            (item.permission === "just admin" && props?.board?.role === "own") ||
                                            (item.permission === "card member" && (isUserJoined || props?.board?.role === "own"));

                                        return hasPermission ? (
                                            <>
                                                <CustomPop title={
                                                    <>
                                                        <Flex justify='center'>
                                                            Đính kèm
                                                        </Flex>
                                                    </>
                                                } content={
                                                    <>
                                                        <Flex vertical gap={10}>
                                                            <Text strong>Đính kèm từ máy tính của bạn</Text>
                                                            <Upload
                                                                // multiple
                                                                beforeUpload={(file) => {
                                                                    handleUploadChange(file);
                                                                    return false;
                                                                }}
                                                                showUploadList={false}
                                                            >
                                                                <Button icon={<CloudUploadOutlined />} style={{ width: "200px" }} loading={loadingUpload}>
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
                                            </>
                                        ) : (
                                            <>
                                                <Button block icon={<LinkOutlined />} className={cx("button")} disabled title="Quyền bị hạn chế">
                                                    Đính kèm
                                                </Button>
                                            </>
                                        );
                                    }
                                    return null;
                                })
                            )
                        }



                        {/* Nhãn */}
                        {
                            (
                                setting?.map((item: any) => {
                                    const isUserJoined = data.userjoin?.some((u: any) => u.user_id === userId);
                                    if (item?.action === "handle") {
                                        const hasPermission =
                                            item.permission === "all guest" ||
                                            (item.permission === "just admin" && props?.board?.role === "own") ||
                                            (item.permission === "card member" && (isUserJoined || props?.board?.role === "own"));

                                        return hasPermission ? (
                                            <>
                                                <CustomPop title={
                                                    <>
                                                        <Flex justify='center'>
                                                            Nhãn
                                                        </Flex>
                                                    </>
                                                } content={
                                                    <>
                                                        <Flex vertical gap={10}>
                                                            {labelBoard?.map((item: any) => {
                                                                const isChecked = data?.label?.some((lb: any) => lb.labelboard_id === item.labelboard_id);

                                                                const handleCheckboxChange = async () => {
                                                                    try {
                                                                        if (isChecked) {
                                                                            const label = data?.label?.find((lb: any) => lb.labelboard_id === item.labelboard_id);
                                                                            if (label?.label_id) {
                                                                                await handelDeleteLabel(label.label_id);
                                                                            }
                                                                        } else {
                                                                            await handelCreateLabel(item.labelboard_id, cardData?.card_id);
                                                                        }
                                                                    } catch (error) {
                                                                        console.error('Checkbox action failed:', error);
                                                                    }
                                                                };

                                                                return (
                                                                    <Flex gap={10} key={item?.labelboard_id}>
                                                                        <Checkbox
                                                                            value={item?.labelboard_id}
                                                                            checked={isChecked}
                                                                            onChange={handleCheckboxChange}
                                                                        ></Checkbox>
                                                                        <Button
                                                                            type="text"
                                                                            style={{
                                                                                backgroundColor: item?.background,
                                                                                width: "250px",
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    display: "inline-block",
                                                                                    maxWidth: "100%",
                                                                                    whiteSpace: "nowrap",
                                                                                    overflow: "hidden",
                                                                                    textOverflow: "ellipsis",
                                                                                    fontWeight: "500",
                                                                                    color: "#2a2a2a",
                                                                                }}
                                                                            >
                                                                                {item?.name}
                                                                            </span>
                                                                        </Button>
                                                                    </Flex>
                                                                );
                                                            })}
                                                        </Flex>
                                                    </>
                                                } >
                                                    <Button block icon={<TagsOutlined />} className={cx("button")}>
                                                        Nhãn
                                                    </Button>
                                                </CustomPop>
                                            </>
                                        ) : (
                                            <>
                                                <Button block icon={<TagsOutlined />} className={cx("button")} disabled title="Quyền bị hạn chế">
                                                    Nhãn
                                                </Button>
                                            </>
                                        );
                                    }
                                    return null;
                                })
                            )
                        }

                        {/* Xóa */}
                        {
                            (
                                props?.setting?.map((item: any) => {
                                    if (item?.action === "delete") {
                                        const hasPermission =
                                            (item.permission === "all guest" && props?.board?.role != null) ||
                                            (item.permission === "just admin" && props?.board?.role === "own");

                                        return hasPermission ? (
                                            <>
                                                <Flex style={{ width: "100%" }}>
                                                    <Button danger style={{ width: "100%" }} onClick={showDeleteConfirm} icon={<MinusOutlined />} className={cx("button")}>Xóa thẻ</Button>
                                                </Flex>
                                            </>
                                        ) : (
                                            <>
                                                <Flex style={{ width: "100%" }}>
                                                    <Button style={{ width: "100%" }} disabled title="Quyền bị hạn chế" icon={<MinusOutlined />} className={cx("button")}>Xóa thẻ</Button>
                                                </Flex>
                                            </>
                                        );
                                    }
                                    return null;
                                })
                            )
                        }

                        {/* Quy tắc */}
                        {
                            props?.board?.role === "own" ? (
                                <CustomPop
                                    title={
                                        <>
                                            <Flex justify='center'>
                                                Quy tắc
                                            </Flex>
                                        </>
                                    } content={
                                        <>
                                            <Flex vertical gap={10}>
                                                <div style={{ width: 320, padding: '8px 0' }}>
                                                    {
                                                        setting?.map((item: any, index: number) => (
                                                            <React.Fragment key={index}>
                                                                <Divider style={{ margin: '5px 0' }} />
                                                                <div style={{ padding: '8px 16px' }}>
                                                                    <Text strong style={{ display: 'block', marginBottom: 8 }}>
                                                                        Ai có thể
                                                                        {item?.action === "invite" && " tham gia vào thẻ"}
                                                                        {item?.action === "handle" && (
                                                                            <>
                                                                                &nbsp;thao tác với thẻ <br />
                                                                                (Việc cần làm, Đính kèm file, Ngày, Nhãn)
                                                                            </>
                                                                        )}
                                                                        {item?.action === "checklist" && " đánh dấu Việc cần làm"}?
                                                                    </Text>
                                                                    <Radio.Group
                                                                        value={item?.permission}
                                                                        onChange={(e) => updateSetting(item.action, e.target.value)}
                                                                        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                                                    >
                                                                        {item?.action === "invite" && (
                                                                            <>
                                                                                <Radio value="all guest">Tất cả thành viên trong bảng</Radio>
                                                                                <Radio value="just admin">Chỉ khi được các quản trị viên chỉ định</Radio>
                                                                            </>
                                                                        )}
                                                                        {item?.action === "handle" && (
                                                                            <>
                                                                                <Radio value="all guest">Tất cả thành viên trong bảng</Radio>
                                                                                <Radio value="card member">Chỉ các thành viên tham gia thẻ và các quản trị viên</Radio>
                                                                                <Radio value="just admin">Chỉ các quản trị viên</Radio>
                                                                            </>
                                                                        )}
                                                                        {item?.action === "checklist" && (
                                                                            <>
                                                                                <Radio value="all guest">Tất cả thành viên trong bảng</Radio>
                                                                                <Radio value="card member">Chỉ các thành viên tham gia thẻ và các quản trị viên</Radio>
                                                                                <Radio value="just admin">Chỉ các quản trị viên hoặc người được chỉ định</Radio>
                                                                            </>
                                                                        )}
                                                                    </Radio.Group>
                                                                </div>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </div>

                                            </Flex>
                                        </>
                                    } >
                                    <Button block icon={<SettingOutlined />} className={cx("button")}>
                                        Quy tắc
                                    </Button>
                                </CustomPop>
                            ) : (
                                <></>
                            )
                        }

                    </Col>
                </Row>
            </Modal >
            <DateModal handleNotification={handleNotification} isModalDate={true} isOpen={isModalOpen} onClose={handleCloseModal} start_date={data?.start_date} end_date={data?.end_date} timer={data?.timer} card_id={data?.card_id} />
        </>
    );
};

export default CardDialog;