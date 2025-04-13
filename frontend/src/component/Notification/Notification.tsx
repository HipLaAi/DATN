import { useEffect, useState } from "react";
import { Badge, MenuProps, Spin } from "antd";
import CustomDropdow from "../DropDow/Dropdow";
import { notificationMenuItems as NotificationData } from "../Header/MenuItem/MenuItem";
import { FaRegBell  } from "react-icons/fa";
import { SocketService } from "../../services/Socket/Socket.service";

const Notification = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [notificationMenuItems, setNotificationMenuItems] = useState<MenuProps["items"]>([]);

    useEffect(() => {
        try {
            setLoading(true);
            const socket = SocketService.connect();
            socket.on('notification', (data) => {
                setNotificationMenuItems((prevData) => [...(prevData ?? []), data]);
            });

            return () => {
                socket.off("notification");
            };

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const menuItems = NotificationData(notificationMenuItems || []);
    return (
        <div>
            {loading ? (
                <Spin />
            ) : (
                <CustomDropdow
                    Icon={
                        <Badge count={notificationMenuItems?.length} overflowCount={99} offset={[10, 0]}>
                            <FaRegBell size={18} />
                        </Badge>}
                    items={menuItems}
                />
            )}
        </div>
    );
};

export default Notification;
