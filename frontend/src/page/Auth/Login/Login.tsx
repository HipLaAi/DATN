// import styles from './Login.module.scss';
// import classNames from 'classnames/bind';
// import { Form, Input, Typography, Button, FormProps } from "antd";
// import { FcGoogle } from "react-icons/fc";
// import { login } from '../../../services/User/user.service';
// import { useNavigate } from 'react-router-dom';
// import { URL } from './../../../utils/url';
// import { useAuthStore } from '../../../store/authStore';

// const cx = classNames.bind(styles);
// const { Title } = Typography;

// type FieldType = {
//   email?: string;
//   password?: string;
//   remember?: string;
// };

// const Login = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const setId = useAuthStore((state) => state.setId);

//   const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
//       const response = await login(values)
//       if(response){
//         localStorage.setItem("user_id",response.user_id)
//         localStorage.setItem("user_name",response.name)
//         localStorage.setItem("user_avatar",response.avatar.replace("D:\\DA4\\frontend\\", ""))
//         navigate(URL.HOME)
//       }
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
//           name="email"
//           rules={[{ required: true, message: 'Please input your email!' }]}
//         >
//           <Input placeholder='Tên Đăng Nhập' />
//         </Form.Item>

//         <Form.Item<FieldType>
//           name="password"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input.Password placeholder='Mật Khẩu' />
//         </Form.Item>
//         <Form.Item >
//           <Button type="primary" htmlType="submit" className={cx('btn')}>
//             Đăng nhập
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Login;

import { LoginForm } from "../../../components/login-form"

export default function Login() {
  return (
    <div className="flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
