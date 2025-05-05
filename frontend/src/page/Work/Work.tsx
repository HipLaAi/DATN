import classNames from "classnames/bind";
import styles from "./Work.module.scss";
import { EditOutlined, LockOutlined, PlusOutlined, SaveOutlined, UnlockOutlined } from '@ant-design/icons';
import { IoPersonAddOutline } from "react-icons/io5";
import { Avatar, Typography, Button, Row, Col, Select, Flex, Input, Modal } from 'antd';
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { getWorkSpacedByIdAPI, updateLogoWorkspaceAPI, updateWorkSpacedAPI } from "../../services/WorkSpace/workSapce.service";
import { useEffect, useRef, useState } from "react";
import ModalCreateBoard from "./component/Modal/ModalCreateBoard";
import ModalCreateMember from "./component/Modal/ModalCreateMember";
import { Label } from "@radix-ui/react-label";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import { AvatarUpload } from "../../component/AvatarUpload/AvatarUpload";
import { useDispatch } from "react-redux";
import { boardReload } from "../../features/reloadSlice";
import { getSettingWorkspaceAPI } from "../../services/Setting/settingWorkspace.service";
import { Toaster } from "../../component/ui/toaster";

const { Title, Text } = Typography;
const cx = classNames.bind(styles);

const Work = () => {
  const { idWorkspace } = useParams()
  const [data, setData] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [setting, setSetting] = useState<any>();
  const [error, setError] = useState("");

  // Call API lấy setting workspace
  const getSettingWorkspace = async () => {
    if (idWorkspace) {
      const results = await getSettingWorkspaceAPI(idWorkspace);
      setSetting(results);
    }
  }

  // scroll
  const specificElementRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    specificElementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  // Hiện form sửa thông tin
  const toggleEditing = () => {
    setIsEditing((prev: any) => !prev)
  };

  const handleInputChange = (field: any, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleRadioChange = (action: any, key: any, value: any) => {
    setSetting((prevData: any) => ({
      ...prevData,
      setting: prevData.setting.map((item: any) =>
        item.action === action
          ? {
            ...item,
            permission: {
              ...item.permission,
              [key]: value,
            },
          }
          : item
      ),
    }));
  };

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Gọi API cập nhật thông tin không gian làm việc
  const updateInformationWorkspace = async (newData?: any) => {
    const dataToUpdate = newData || data;

    const filteredData = {
      name: dataToUpdate.name,
      description: dataToUpdate.description,
      status: dataToUpdate.status
    };
    await updateWorkSpacedAPI(idWorkspace, filteredData);
    dispatch(boardReload());
  }


  // Hàm để cập nhật thông tin không gian làm việc
  const handleSaveInformation = () => {
    if (!data?.name) {
      setError("Tên không gian làm việc không được để trống!");
      return;
    }
    else {
      setError("");
      updateInformationWorkspace();
      toggleEditing();
    }
  }

  // Gọi API lấy thông tin không gian làm việc
  const fetchWorkSpaceDetails = async () => {
    const reponse = await getWorkSpacedByIdAPI(idWorkspace)
    setData(reponse)
  }

  // Gọi API cập nhật LOGO
  const handleImageChange = async (file: File, previewUrl: string) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('files', file);

      await updateLogoWorkspaceAPI(idWorkspace, formData);
      dispatch(boardReload());

    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchWorkSpaceDetails();
    scrollToTop();
    getSettingWorkspace();
  }, [idWorkspace])

  return (
    <>
      <ModalCreateBoard isOpenModal={isModalOpen} handleCancel={handleCancel} idWorkspace={idWorkspace} />
      <ModalCreateMember toggleModal={toggleModal} handleToggleModal={handleToggleModal} idWorkspace={idWorkspace} />
      <div className={cx('work-page')}>
        <div ref={specificElementRef} />
        <Row justify='center'>
          <Col span={16}>
            <div className={cx('work-page-top')}>
              <div style={{ width: "450px" }}>
                <div className={cx("user")}>
                  {
                    isEditing ? <></> : (
                      <>
                        <AvatarUpload
                          initialImage={data?.logo}
                          onImageChange={handleImageChange}
                          disabled={isUploading}
                        />
                      </>
                    )
                  }
                  <div className={cx("user-profile")}>
                    {isEditing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: "100%" }}>
                        <Label>Tên không gian làm việc</Label>
                        <Input
                          required
                          value={data?.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          spellCheck={false}
                        />
                        {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}

                        <Label>Mô tả</Label>
                        <TextArea
                          value={data?.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          spellCheck={false}
                        />
                        <Flex gap={5}>
                          <Button type="primary" onClick={handleSaveInformation}>Lưu</Button>
                          <Button onClick={toggleEditing}>Hủy</Button>
                        </Flex>
                      </div>
                    ) : (
                      <>
                        <Title level={4}>{data?.name}</Title>
                        <Text strong>
                          {data?.status === "public" && (
                            <>
                              <UnlockOutlined style={{ color: "green" }} /> Công khai
                            </>
                          )}
                          {data?.status === "private" && (
                            <>
                              <LockOutlined style={{ color: "red" }} /> Riêng tư
                            </>
                          )}
                        </Text>
                      </>
                    )}
                  </div>
                  {((data?.role === "own") && (!isEditing)) ? <Button type="text" onClick={toggleEditing}><EditOutlined /></Button> : <></>}
                </div>
                {
                  !isEditing ?
                    <div style={{ padding: "5px 0" }}>
                      <span style={{ textAlign: "justify" }}>{data?.description ?? ""}</span>
                    </div> : <></>
                }

              </div>
              <Button type="primary" onClick={handleToggleModal}><IoPersonAddOutline />Mời các thành viên vào không gian làm việc</Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Outlet context={{
          data: data,
          showModal: showModal,
          scrollToTop: scrollToTop,
          idWorkspace: idWorkspace,
          setting: setting,
          updateInformationWorkspace: updateInformationWorkspace,
          handleInputChange: handleInputChange,
          handleRadioChange: handleRadioChange
        }}
        />
      </div>
      <Toaster />
    </>
  );
};

export default Work;
