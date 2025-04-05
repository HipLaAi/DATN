import { useEffect, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { MenuProps, Spin } from "antd";
import { chatMenuItems as ChatData } from "../Header/MenuItem/MenuItem";
import CustomDropdow from "../DropDow/Dropdow";
import { converSationAPI } from "../../services/ConverSation/Conversation.sevice";
import { isArray } from "lodash";

const Conversation = (props:any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chatMenuItems, setChatMenuItems] = useState<MenuProps["items"]>([]);
  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const response = await converSationAPI();
      if(isArray(response)){
        setChatMenuItems(response);
      }     
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenuData();
  }, [props.resetConverSation]);
 
  const menuItems = ChatData(chatMenuItems||[], props.handleOPenChat);
  return (
    <div>
      {loading ? (
        <Spin/>
      ) : (
        <CustomDropdow
          Icon={<BiMessageRounded size={20} />}
          items={menuItems}
        />
      )}
    </div>
  );
};

export default Conversation;
