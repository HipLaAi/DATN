// import styles from './Register.module.scss';
// import classNames from 'classnames/bind';
// import { Form, Input, Typography, Button, FormProps, Upload } from "antd";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from 'react-router-dom';
// import { register } from '../../../services/User/user.service';
// import { PlusOutlined } from '@ant-design/icons';
// import { useState } from 'react';

// const cx = classNames.bind(styles);
// const { Title } = Typography;

// type FieldType = {
//   name?: string;
//   email?: string;
//   password?: string;
//   remember?: string;
// };

// const Register = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [logo, setLogo] = useState<File | null>(null)

//   const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
//     const formData = new FormData();
//     Object.keys(values).forEach(key => {
//       formData.append(key, values[key]);
//     });

//     if (logo && typeof logo !== 'string') {
//       formData.append('files', logo);
//     }
//     const response = await register(formData)
//     if (response) {
//       navigate("/login")
//     }
//   };
//   return (
//     <div className={cx('login')}>
//       <Title level={2}>Welcom back!</Title>
//       <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         initialValues={{ remember: true }}
//         autoComplete="off"
//         onFinish={onFinish}
//         form={form}
//       >
//         <Form.Item>
//           <Button> <FcGoogle />Tiếp tục đăng nhập bằng Google</Button>
//         </Form.Item>
//         <Form.Item>
//           <hr />
//         </Form.Item>
//         <Form.Item<FieldType>
//           name="name"
//           rules={[{ required: true, message: 'Please input your name!' }]}
//         >
//           <Input placeholder='Tên đăng nhập' />
//         </Form.Item>
//         <Form.Item<FieldType>
//           name="email"
//           rules={[{ required: true, message: 'Please input your email!' }]}
//         >
//           <Input placeholder='Email' />
//         </Form.Item>

//         <Form.Item<FieldType>
//           name="password"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input.Password placeholder='Mật khẩu' />
//         </Form.Item>
//         <Form.Item label="" name="files">
//           <Upload listType="picture-card"
//             beforeUpload={(file) => {
//               setLogo(file); // Set the image file to the state
//               return false; // Prevent default upload behavior
//             }}
//           >
//             <button style={{ border: 0, background: 'none' }} type="button">
//               <PlusOutlined />
//               <div style={{ marginTop: 8 }}>Chọn ảnh</div>
//             </button>
//           </Upload>
//         </Form.Item>
//         <Form.Item >
//           <Button type="primary" htmlType="submit" className={cx('btn')}>
//             Đăng ký
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Register;

import { RegisterForm } from "../../../components/register-form"

export default function Register() {
  return (
    <div className="flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RegisterForm />
      </div>
    </div>
  )
}