import { Button, Form, FormProps, Input, Modal, Select, Upload } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoardAPI } from "../../../../services/Board/board.sevice";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Board } from "../../../../model/BoardModel";
import { URL } from '../../../../utils/url';
import { useDispatch } from "react-redux";
import { boardReload } from "../../../../features/reloadSlice";
import { getSettingWorkspaceAPI } from "../../../../services/Setting/settingWorkspace.service";
import { getWorkSpacedByIdAPI } from "../../../../services/WorkSpace/workSapce.service";

const ModalCreateBoard = (props: any) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [setting, setSetting] = useState<any>();
  const [data, setData] = useState<any>()

  // Call API lấy setting workspace
  const getSettingWorkspace = async () => {
    if (props.idWorkspace) {
      const results = await getSettingWorkspaceAPI(props.idWorkspace);
      setSetting(results);
    }
  }

  // Gọi API lấy thông tin không gian làm việc
  const fetchWorkSpaceDetails = async () => {
    const reponse = await getWorkSpacedByIdAPI(props.idWorkspace)
    setData(reponse)
  }

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
          navigate(URL.BOARD.BUILDER.LIST(props.idWorkspace,reponse.board_id))
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
      // form.setFieldsValue({ status: 'workspace' });
      getSettingWorkspace();
      fetchWorkSpaceDetails();
    }
  }, [props.isOpenModal]);

  const actionButton = setting?.setting
    ?.filter((item: any) => item.action === "createboard")
    ?.flatMap((item: any) =>
      Object.entries(item.permission).map(([key, value]) => {
        if (key === "public") {
          if (value === "all member") {
            return { value: "public", label: "Công khai" };
          }
          if (value === "no one") {
            return null;
          }
          if (value === "just admin" && data?.role === "own") {
            return { value: "public", label: "Công khai" };
          }
        }
        if (key === "workspace") {
          if (value === "all member") {
            return { value: "workspace", label: "Không gian làm việc" };
          }
          if (value === "no one") {
            return null;
          }
          if (value === "just admin" && data?.role === "own") {
            return { value: "workspace", label: "Không gian làm việc" };
          }
        }
        if (key === "private") {
          if (value === "all member") {
            return { value: "private", label: "Riêng tư" };
          }
          if (value === "no one") {
            return null;
          }
          if (value === "just admin" && data?.role === "own") {
            return { value: "private", label: "Riêng tư" };
          }
        }
        return null;
      }).filter(Boolean)
    )?.length > 0 ? (
    <Button
      key="submit"
      type="primary"
      icon={loading ? <LoadingOutlined spin /> : <></>}
      onClick={handleSubmit}
      disabled={loading}
      style={{ float: "right" }}
    >
      Tạo
    </Button>
  ) : (
    <Button key="submit" type="primary" disabled style={{ float: "right" }}>
      Tạo
    </Button>
  );

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
          actionButton,
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

          {/* <Form.Item<Board>
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select
              placeholder="Chọn trạng thái"
              // defaultValue="workspace"
              options={setting?.setting
                ?.filter((item: any) => item.action === "createboard")
                ?.flatMap((item: any) =>
                  Object.entries(item.permission).map(([key, value]) => {
                    if (key === "public") {
                      if (value === "all member") {
                        return { value: "public", label: "Công khai" };
                      }
                      if (value === "no one") {
                        return null;
                      }
                      if (value === "just admin" && data?.role == "own") {
                        return { value: "public", label: "Công khai" };
                      }
                    }
                    if (key === "workspace") {
                      if (value === "all member") {
                        return { value: "workspace", label: "Không gian làm việc" };
                      }
                      if (value === "no one") {
                        return null;
                      }
                      if (value === "just admin" && data?.role == "own") {
                        return { value: "workspace", label: "Không gian làm việc" };
                      }
                    }
                    if (key === "private") {
                      if (value === "all member") {
                        return { value: "private", label: "Riêng tư" };
                      }
                      if (value === "no one") {
                        return null;
                      }
                      if (value === "just admin" && data?.role == "own") {
                        return { value: "private", label: "Riêng tư" };
                      }
                    }
                    return null;
                  }).filter(Boolean)
                )}
            />
          </Form.Item> */}
          <Form.Item<Board>
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            {setting?.setting
              ?.filter((item: any) => item.action === "createboard")
              ?.flatMap((item: any) =>
                Object.entries(item.permission).map(([key, value]) => {
                  if (key === "public") {
                    if (value === "all member") {
                      return { value: "public", label: "Công khai" };
                    }
                    if (value === "no one") {
                      return null;
                    }
                    if (value === "just admin" && data?.role === "own") {
                      return { value: "public", label: "Công khai" };
                    }
                  }
                  if (key === "workspace") {
                    if (value === "all member") {
                      return { value: "workspace", label: "Không gian làm việc" };
                    }
                    if (value === "no one") {
                      return null;
                    }
                    if (value === "just admin" && data?.role === "own") {
                      return { value: "workspace", label: "Không gian làm việc" };
                    }
                  }
                  if (key === "private") {
                    if (value === "all member") {
                      return { value: "private", label: "Riêng tư" };
                    }
                    if (value === "no one") {
                      return null;
                    }
                    if (value === "just admin" && data?.role === "own") {
                      return { value: "private", label: "Riêng tư" };
                    }
                  }
                  return null;
                }).filter(Boolean)
              ).length > 0 ? (
              <Select
                placeholder="Chọn trạng thái"
                options={setting?.setting
                  ?.filter((item: any) => item.action === "createboard")
                  ?.flatMap((item: any) =>
                    Object.entries(item.permission).map(([key, value]) => {
                      if (key === "public") {
                        if (value === "all member") {
                          return { value: "public", label: "Công khai" };
                        }
                        if (value === "no one") {
                          return null;
                        }
                        if (value === "just admin" && data?.role === "own") {
                          return { value: "public", label: "Công khai" };
                        }
                      }
                      if (key === "workspace") {
                        if (value === "all member") {
                          return { value: "workspace", label: "Không gian làm việc" };
                        }
                        if (value === "no one") {
                          return null;
                        }
                        if (value === "just admin" && data?.role === "own") {
                          return { value: "workspace", label: "Không gian làm việc" };
                        }
                      }
                      if (key === "private") {
                        if (value === "all member") {
                          return { value: "private", label: "Riêng tư" };
                        }
                        if (value === "no one") {
                          return null;
                        }
                        if (value === "just admin" && data?.role === "own") {
                          return { value: "private", label: "Riêng tư" };
                        }
                      }
                      return null;
                    }).filter(Boolean)
                  )}
              />
            ) : (
              <div style={{ color: "red", marginTop: "8px" }}>
                Bạn không có quyền tạo các bảng mới trong Không gian làm việc này. Liên hệ với quản trị viên của bạn để được giúp đỡ.
              </div>
            )}
          </Form.Item>



          <Form.Item<Board>
            name="background"
          >
            <Upload listType="picture-circle"
              maxCount={1}
              accept="image/*"
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
