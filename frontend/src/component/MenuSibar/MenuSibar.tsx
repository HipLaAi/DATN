import { Menu } from "antd";
import { MenuSideBarItem } from "./MenuItem/MenuSidebarItem";


const MenuSibar = (props:any) => {

  const items = MenuSideBarItem(props.menuData)
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        style={{ border: 'none' }}
      />
    </>
  );
};

export default MenuSibar;
