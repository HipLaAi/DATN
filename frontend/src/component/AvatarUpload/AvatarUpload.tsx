import { useState, useEffect, useCallback } from 'react';
import { Avatar, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import classNames from 'classnames/bind';
import styles from './AvatarUpload.module.scss';

const cx = classNames.bind(styles);

interface AvatarUploadProps {
  initialImage?: string;
  onImageChange?: (file: File, previewUrl: string) => void;
  size?: number;
  shape?: 'circle' | 'square';
  disabled?: boolean;
  className?: string;
}

export const AvatarUpload = ({
  initialImage = '',
  onImageChange,
  size = 64,
  shape = 'square',
  disabled = false,
  className,
}: AvatarUploadProps) => {
  const [previewImage, setPreviewImage] = useState<string>(initialImage);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageValid, setIsImageValid] = useState(true);

  // Theo dõi thay đổi của initialImage
  useEffect(() => {
    if (initialImage) {
      // Reset trạng thái valid khi image thay đổi
      setIsImageValid(true);
      setPreviewImage(initialImage);
    }
  }, [initialImage]);

  const handleBeforeUpload: UploadProps['beforeUpload'] = useCallback(
    (file: any) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ có thể tải lên file ảnh!');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Ảnh phải nhỏ hơn 5MB!');
        return false;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setIsImageValid(true);
        if (onImageChange) {
          onImageChange(file, result);
        }
      };

      return false;
    },
    [onImageChange]
  );

  return (
    <div className={cx('avatar-upload-container', className, { disabled })}>
      <Upload
        listType="picture"
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        disabled={disabled}
        accept="image/*"
      >
        <div
          className={cx('avatar-upload-wrapper')}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isImageValid ? (
            <Avatar
              src={previewImage}
              alt="Avatar"
              shape={shape}
              size={size}
              className={cx('avatar-image')}
            />
          ) : (
            <Avatar
              shape={shape}
              size={size}
              className={cx('avatar-image', 'avatar-placeholder')}
            >
              {previewImage ? 'Invalid Image' : 'No Image'}
            </Avatar>
          )}
          
          {!disabled && (
            <div className={cx('avatar-overlay', { visible: isHovered })}>
              <PlusOutlined className={cx('upload-icon')} />
              <span className={cx('upload-text')}>Thay đổi ảnh</span>
            </div>
          )}
        </div>
      </Upload>
    </div>
  );
};