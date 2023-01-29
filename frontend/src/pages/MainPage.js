import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import GroupCard from "../components/GroupCard";
import { useState } from "react";
import AddGroups from "../components/AddGroups";

const MainPage = ({ allUsers, curr_user, groups, setGroups }) => {
    const sidebarList = ["Groups", "Calendar", "Profile"];
    const [active, setActive] = useState(0);
    const [users, setUsers] = useState([]);

    const displaySubGroup = () => {
        if (active === 0) {
            const displayGroups = () => {
                console.log(groups);
                if (groups.length === 0) {
                    return <div className='ui loader'>Loading</div>;
                }
                return groups.map((group) => {
                    return (
                        <div className='card-on-main'>
                            <div className='to-center'>
                                <GroupCard
                                    id = {group.id}
                                    usernames={group.usernames}
                                    title={group.title}
                                    curr_user={curr_user}
                                    setGroups = {setGroups}
                                />
                            </div>
                        </div>
                    );
                });
            };
            return (
                <div className='main-card-container'>
                    {displayGroups()}
                    <div className='to-center'>
                        {" "}
                        <AddGroups
                            setGroups={setGroups}
                            curr_user={curr_user}
                            allUsers={allUsers}
                            setUsers={setUsers}
                            users={users}
                        />
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
                <Topbar title={`Welcome Back ${curr_user.toUpperCase()}.`} />
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
