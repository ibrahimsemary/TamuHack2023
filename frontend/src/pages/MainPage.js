import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import GroupCard from "../components/GroupCard";
import { useState } from "react";

const MainPage = () => {
    const sidebarList = ["Groups", "Calendar", "Profile"];
    const [active, setActive] = useState(0);

    const displaySubGroup = () => {
        if (active === 0) {
            return (
                <div className='main-card-container'>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                    <div className='card-on-main'>
                        <div className='to-center'>
                            <GroupCard />
                        </div>
                    </div>
                </div>
            );
        } else if (active === 1) {
            return <div>my Calendar</div>;
        } else if (active === 2) {
            return <div>profile</div>;
        } else {
            return <div>something has gone terribly wrong</div>;
        }
    };

    return (
        <div className='main-page-container'>
            <div className='top-bar-container'>
                <Topbar title='Welcome Back Ibrahim.' />
            </div>
            <br />
            <div className='sidebar-card-container'>
                <div className='main-sidebar-container'>
                    <Sidebar
                        list={sidebarList}
                        active={active}
                        setActive={setActive}
                    />
                </div>
                {displaySubGroup()}
            </div>
        </div>
    );
};

export default MainPage;
