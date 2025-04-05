import { Form, FormProps, Input, Modal, Select, Upload } from 'antd';
import { createWorkSpacedAPI } from '../../../services/WorkSpace/workSapce.service';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkSpace } from '../../../model/WorkSpaceModel';
import { URL } from '../../../utils/url';


const ModalHeader = (props: any) => {
  const [logo, setLogo] = useState<File | null>(null)
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const onFinish: FormProps<WorkSpace>['onFinish'] = async () => {
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
        const responese = await createWorkSpacedAPI(formData)
        console.log(responese)
        navigate(URL.WORKSPACE + responese.workspace_id)
      })
  }
  const handleSubmit = () => {
    form.submit();
  };
  return (
    <>
      <Modal
        title="Tạo không gian làm việc"
        open={props.isOpenModal}
        onOk={handleSubmit}
        onCancel={props.handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<WorkSpace>
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên không gian làm việc!' }]}
          >
            <Input placeholder='Tên không gian làm việc' />
          </Form.Item>
          <Form.Item<WorkSpace>
            name="description"
          // rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input placeholder='Mô tả' />
          </Form.Item>

          <Form.Item<WorkSpace>
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select
              placeholder="Chọn trạng thái"
              options={[
                { value: 'Riêng tư', label: 'Riêng tư' },
                { value: 'Không gian làm việc', label: 'Không gian làm việc' },
                { value: 'Công khai', label: 'Công khai' },
              ]}
            />
          </Form.Item>

          <Form.Item name="files">
            <Upload listType="picture-card"
              beforeUpload={(file) => {
                setLogo(file); // Set the image file to the state
                return false; // Prevent default upload behavior
              }}
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

export default ModalHeader;