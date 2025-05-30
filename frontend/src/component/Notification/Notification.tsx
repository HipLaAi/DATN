import { useEffect, useState } from "react";
import { Badge, MenuProps, Spin } from "antd";
import CustomDropdow from "../DropDow/Dropdow";
import { notificationMenuItems as NotificationData } from "../Header/MenuItem/MenuItem";
import { FaRegBell } from "react-icons/fa";
import { SocketService } from "../../services/Socket/Socket.service";
import { getNotificationAPI, updateNotificationAPI } from "../../services/Notification/Notification.service";

const Notification = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [notificationMenuItems, setNotificationMenuItems] = useState<MenuProps["items"]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState<any>([]);

    useEffect(() => {
        fetchNotification();
        try {
            setLoading(true);
            const socket = SocketService.connect();
            socket.on('notification', (data) => {
                setNotificationMenuItems((prevData) => [...(prevData ?? []), data]);
                setUnreadNotifications((prevData: any) => [...(prevData ?? []), data]);
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

    const fetchNotification = async () => {
        setLoading(true);
        try {
            const response = await getNotificationAPI();
            setNotificationMenuItems(response);
            const unreadNotifications = response.filter((notification: any) => notification.is_read === 0);
            setUnreadNotifications(unreadNotifications);
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpdateNotification = async () => {
        try {
            await updateNotificationAPI();
            const response = await getNotificationAPI();
            setNotificationMenuItems(response);
            const unreadNotifications = response.filter((notification: any) => notification.is_read === 0);
            setUnreadNotifications(unreadNotifications);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const menuItems = NotificationData(notificationMenuItems || []);
    return (
        <div onClick={fetchUpdateNotification}>
            {loading ? (
                <Spin />
            ) : (
                <CustomDropdow
                    Icon={
                        <Badge count={unreadNotifications?.length} overflowCount={99} offset={[10, 0]}>
                            <FaRegBell size={18} />
                        </Badge>}
                    items={menuItems}
                />
            )}
        </div>
    );
};

export default Notification;
