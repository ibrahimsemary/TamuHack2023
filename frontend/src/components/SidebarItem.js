import React from "react";
import Sidebar from "./Sidebar";

const SidebarItem = ({ text, active, setActive, index }) => {
    return (
        <div
            className='sidebar-item-container'
            onClick={() => {
                setActive(index);
            }}
        >
            <div
                className={
                    active === index
                        ? "sidebar-item-text-active"
                        : "sidebar-item-text"
                }
            >
                <h3>{text}</h3>
            </div>
        </div>
    );
};

export default SidebarItem;
