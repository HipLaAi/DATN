import { Button, Form, FormProps, Input, Modal, Select, Upload } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoardAPI } from "../../../../services/Board/board.sevice";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Board } from "../../../../model/BoardModel";
import { URL } from '../../../../utils/url';
import { useDispatch } from "react-redux";
import { boardReload } from "../../../../features/reloadSlice";

const ModalCreateBoard = (props: any) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish: FormProps<Board>['onFinish'] = async () => {
    form
      .validateFields()
      .then(async (values: any) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });

        if (logo && typeof logo !== 'string') {
          formData.append('files', logo);
        }
        if (props.idWorkspace) {
          formData.append("workspace_id", props.idWorkspace)
        }

        setLoading(true);
        try {
          const reponse = await createBoardAPI(formData)
          dispatch(boardReload());
          navigate("/workspace/" + props.idWorkspace + URL.BOARD + reponse.board_id)
        } catch (error) {
          console.error("Error creating workspace:", error);
        } finally {
          setLoading(false);
          props.handleCancel();
        }
      })
      .catch(error => {
        console.error("Validation failed:", error);
        setLoading(false);
      });
  }
  const handleSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    if (props.isOpenModal) {
      form.resetFields();
      setLogo(null);
      form.setFieldsValue({ status: 'workspace' });
    }
  }, [props.isOpenModal]);


  return (
    <>
      <Modal
        title="Tạo bảng"
        open={props.isOpenModal}
        onOk={handleSubmit}
        onCancel={props.handleCancel}
        okButtonProps={{
          icon: loading ? <LoadingOutlined spin /> : <></>,
          disabled: loading,
        }}
        footer={[
          <Button key="cancel" onClick={props.handleCancel}>Hủy</Button>,
          <Button
            key="submit"
            type="primary"
            icon={loading ? <LoadingOutlined spin /> : <></>}
            onClick={handleSubmit}
            disabled={loading}
            style={{ float: 'right' }}
          >
            Tạo
          </Button>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
          disabled={loading}
        >
          <Form.Item<Board>
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input placeholder='Tên bảng' />
          </Form.Item>
          <Form.Item<Board>
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select
              placeholder="Chọn trạng thái"
              defaultValue="workspace"
              options={[
                { value: 'private', label: 'Riêng tư' },
                { value: 'workspace', label: 'Không gian làm việc' },
                { value: 'public', label: 'Công khai' },
              ]}
            />
          </Form.Item>

          <Form.Item<Board>
            name="background"
          >
            <Upload listType="picture-circle"
              maxCount={1}
              beforeUpload={(file) => {
                setLogo(file);
                return false;
              }}
              onRemove={() => setLogo(null)}
            >
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Chọn ảnh</div>
              </button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


export default ModalCreateBoard
