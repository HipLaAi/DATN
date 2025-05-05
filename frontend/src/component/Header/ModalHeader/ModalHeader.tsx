import { Button, Form, FormProps, Input, Modal, Select, Upload } from 'antd';
import { createWorkSpacedAPI } from '../../../services/WorkSpace/workSapce.service';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkSpace } from '../../../model/WorkSpaceModel';
import { URL } from '../../../utils/url';
import { useDispatch } from 'react-redux';
import { boardReload } from '../../../features/reloadSlice';


const ModalHeader = (props: any) => {
  const [logo, setLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<WorkSpace>['onFinish'] = async () => {
    form
      .validateFields()
      .then(async (values: any) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key] ?? "");
        });

        if (logo && typeof logo !== 'string') {
          formData.append('files', logo);
        }
        setLoading(true);
        try {
          const response = await createWorkSpacedAPI(formData);
          dispatch(boardReload());
          navigate(URL.WORKSPACE + response.workspace_id);
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
      form.setFieldsValue({ status: 'private' });
    }
  }, [props.isOpenModal]);

  return (
    <>
      <Modal
        title="Tạo không gian làm việc"
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
          <Form.Item<WorkSpace>
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên không gian làm việc!' }]}
          >
            <Input placeholder='Tên không gian làm việc' spellCheck={false} />
          </Form.Item>
          <Form.Item<WorkSpace>
            name="description"
          >
            <Input placeholder='Mô tả' spellCheck={false} />
          </Form.Item>
          <Form.Item<WorkSpace>
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select
              placeholder="Chọn trạng thái"
              defaultValue="private"
              options={[
                { value: 'private', label: 'Riêng tư' },
                { value: 'public', label: 'Công khai' },
              ]}
            />
          </Form.Item>
          <Form.Item name="files">
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
      </Modal >
    </>
  );
};

export default ModalHeader;