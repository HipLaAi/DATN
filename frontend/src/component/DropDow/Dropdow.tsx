import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Button, Typography } from 'antd';
import styles from './Dropdow.module.scss';
import { ReactNode, useState } from 'react';

type MenuHeaderProps = {
  title?: string;
  items?: MenuProps['items'];
  Icon?: ReactNode,
  isCarDetails?: boolean
};
const { Text } = Typography
const CustomDropdow = ({ title, items, Icon, isCarDetails = false }: MenuHeaderProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    // Kiểm soát trạng thái mở/đóng
    setOpen(isOpen);
  };
  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        overlayStyle={{ maxHeight: "350px" }}
        open={open}
        onOpenChange={handleOpenChange} 
      >
        {isCarDetails ?
          (
            <Text style={{ width: "100%" }} >
              {title}
            </Text>
          ) : (
            Icon ? (
              <Button type='text' shape='circle'>
                {Icon}
              </Button>
            ) : (
              <Button type="text" className={styles.btn}>
                {title}
                <DownOutlined />
              </Button>
            )
          )
        }
      </Dropdown>
    </>
  );
};

export default CustomDropdow;
