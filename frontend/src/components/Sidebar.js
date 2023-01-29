import React, { useState } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ list, active, setActive }) => {
    const listItems = () => {
        return list.map((item, index) => {
            return (
                <SidebarItem
                    text={item}
                    index={index}
                    setActive={setActive}
                    active={active}
                />
            );
        });
    };
    return <div className='sidebar-container'>{listItems()}</div>;
};

export default Sidebar;
