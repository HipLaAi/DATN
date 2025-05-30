import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Flex, Select, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import { AvatarUpload } from '../../../component/AvatarUpload/AvatarUpload';
import { useDispatch } from 'react-redux';
import { boardDetailReload, boardReload } from '../../../features/reloadSlice';
import { updateBackgroundBoardAPI, updateIBoardAPI } from '../../../services/Board/board.sevice';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../../../utils/url';
import { getWorkSpaceMemberByIdUserAPI } from '../../../services/WorkSpace/workSapce.service';

const { Title, Text } = Typography;
const { Option } = Select;

const BoardInfo = (props: any) => {
  const { id } = useParams()
  const { board, handleDataBoardChange } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(board?.description);
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [workSpaceMember, setWorkSpaceMember] = useState<any[]>([])

  // API Lấy các không gian làm việc theo id user
  const fetchWorkSapceMemberByUserID = async () => {
    try {
      const response = await getWorkSpaceMemberByIdUserAPI()
      if (!response.message) {
        setWorkSpaceMember(response)
      }
      else {
        setWorkSpaceMember([])
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleSave = async () => {
    try {
      await updateIBoardAPI(id, {
        name: board?.name,
        workspace_id: board?.workspace_id,
        status: board?.status,
        description: description
      });
      handleDataBoardChange('description', description);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setDescription(board?.description);
    setIsEditing(false);
  };

  // xử lý thay đổi background
  const handleImageChange = async (file: File, previewUrl: string) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('files', file);

      await updateBackgroundBoardAPI(id, formData);
      dispatch(boardDetailReload());
      dispatch(boardReload());

    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // xử lý thay đổi ID không gian làm việc
  const handleInputChange = async (value: any) => {
    try {
      await updateIBoardAPI(id, {
        name: board?.name,
        workspace_id: value,
        status: board?.status,
        description: board?.description
      });
      navigate(URL.BOARD.BUILDER.LIST(value, id))
      dispatch(boardReload());

    } catch (error) {
      console.error('Update failed:', error);
    }
  }

  useEffect(() => {
    fetchWorkSapceMemberByUserID()
  }, []);

  return (
    <div style={{ margin: 0, padding: 0, border: "none", backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity, 1))" }}>
      <Flex align="center" gap={8} style={{ display: 'flex', alignItems: 'center', margin: "20px 0" }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined />
        </div>
        <Title level={5} style={{ margin: 0 }}>
          Quản trị viên của bảng
        </Title>
      </Flex>
      {
        board?.guest.map((item: any, index: any) => (
          item?.role === "own" ? (
            <div style={{ margin: "10px 0" }}>
              <Flex gap={10} key={index}>
                <Avatar size={48} src={item?.avatar} />
                <div>
                  <Text strong>{item?.name}</Text>
                  <br />
                  <Text type="secondary">{item?.email}</Text>
                </div>
              </Flex>
            </div>
          ) : (
            <></>
          )
        ))
      }

      {
        (board?.role === "own" && workSpaceMember.some((workspace: any) => workspace.workspace_id === board?.workspace_id && workspace.role === "own")) ? (
          <div style={{ margin: "20px 0" }}>
            <Title level={5} style={{ margin: 0 }}>
              Không gian làm việc
            </Title>
            <Select
              defaultValue={board?.workspace_id}
              placeholder="Chọn không gian làm việc"
              style={{ width: '100%', margin: "5px 0" }}
              getPopupContainer={(trigger: any) => trigger.parentNode}
              onChange={(value) => handleInputChange(value)}
            >
              {workSpaceMember?.map((option: any) => (
                <Option key={option.workspace_id} value={option.workspace_id}>
                  {option.workspace_name}
                </Option>
              ))}
            </Select>
          </div>
        ) : (<></>)
      }

      <div style={{ margin: "20px 0" }}>
        <Title level={5}>Mô tả</Title>
        <div
          style={{
            borderRadius: isEditing ? '0' : '10',
            padding: isEditing ? '0' : '10px',
            backgroundColor: isEditing ? '#fff' : 'var(--ds-background-neutral, #091e420f)',
          }}
        >
          {isEditing ? (
            <>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Thêm mô tả chi tiết hơn ..."
              />
              <div style={{ marginTop: 8, textAlign: 'right' }}>
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                  Hủy
                </Button>
                <Button type="primary" onClick={handleSave}>
                  Lưu
                </Button>
              </div>
            </>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              style={{
                cursor: 'pointer',
                minHeight: 50,
                fontSize: "14px",
              }}
              dangerouslySetInnerHTML={{ __html: description === "" ? "Thêm mô tả chi tiết hơn ..." : description }}
            />
          )}
        </div>
      </div>

      <div style={{ margin: "20px 0" }}>
        <Title level={5}>Hình nền</Title>
        <AvatarUpload
          initialImage={board?.background}
          size={150}
          onImageChange={handleImageChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default BoardInfo;
