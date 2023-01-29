import React from "react";
import { useState, useEffect } from "react";
import TopBar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Calendar from "react-calendar";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import dayjs from "dayjs";
import Header from "../components/Header";
import GroupEvent from "../components/GroupEvent";
import axios from "axios";
import { Avatar } from "@mui/material";
import EventCard from "../components/EventCard";

const GroupPage = ({ groupId, curr_user, setPage }) => {
    const [times, setTimes] = useState([]);
    const [displayTimes, setDisplayTimes] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [groupEvents, setGroupEvents] = useState([]);
    const [groupName, setGroupName] = useState("");

    const getGroupName = async () => {
        const res = await axios.get(
            `https://group-sync.onrender.com/get-group/${groupId}`
        );
        setGroupName(res.data);
    };

    const callApi = async () => {
        const res = await axios.get(
            `https://group-sync.onrender.com/event/groupsid/${groupId}`
        );
        console.log(res.data);
    };

    const getImgs = async () => {
        const res = await axios.get(
            `https://group-sync.onrender.com/get-user-from-groupid/${groupId}`
        );
        console.log(res);
        setImgs(res.data);
    };

    const getTimes = async () => {
        const curr_date = dayjs().format("YYYY-MM-DD");
        const r = await axios.get(
            `https://group-sync.onrender.com/whos-busy/${groupId}/${curr_date}/1800`
        );
        setTimes(r.data);
        var start = "8:00";
        const n = [];
        var prev = [];
        var prev_key = "";
        Object.keys(r.data).forEach((key, index) => {
            if (index === 0) {
                prev = r.data[key];
                prev_key = key;
            } else {
                if (JSON.stringify(prev) !== JSON.stringify(r.data[key])) {
                    n.push({
                        start: start,
                        end: prev_key,
                        array: prev,
                    });
                    start = key;
                }
                prev = r.data[key];
                prev_key = key;
            }
        });
        setDisplayTimes(n);
        console.log(r.data);
        console.log(n);
    };

    useEffect(() => {
        getTimes();
        getImgs();
        getGroupName();
    }, []);

    const [active, setActive] = useState(0);
    const groupSidebarList = ["Calendar", "Events", "Back"];

    const displayIntervals = () => {
        if (displayTimes.length === 0) {
            return <div className='ui loading'>loading...</div>;
        } else {
            return displayTimes.map((time, index) => {
                if (time.array.length === 0) {
                    return (
                        <GroupEvent
                            onClick={() => setActiveIndex(index)}
                            startTime={time.start}
                            endTime={time.end}
                            style='light'
                        />
                    );
                } else {
                    var num = Object.keys(imgs).length / time.array.length;
                    var style;
                    if (num >= 4) {
                        style = "dark";
                    } else if (num >= 2) {
                        style = "darker";
                    } else {
                        style = "darkest";
                    }
                    return (
                        <GroupEvent
                            onClick={() => setActiveIndex(index)}
                            startTime={time.start}
                            endTime={time.end}
                            style={style}
                        />
                    );
                }
            });
        }
    };

    const displayUnavailable = () => {
        if (displayTimes.length === 0 || activeIndex === null) {
            return;
        }
        const i = displayTimes[activeIndex].array;
        if (i.length === 0) {
            return;
        } else {
            return i.map((e) => {
                return (
                    <div>
                        <div className='to-center'>
                            <div className='avatar'>
                                <Avatar
                                    src={imgs[e]}
                                    alt='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
                                />
                            </div>
                        </div>
                        <div className='to-center'> {e}</div>
                        <br />
                    </div>
                );
            });
        }
    };

    const displayAvailable = () => {
        if (activeIndex === null || displayTimes.length === 0) {
            return Object.keys(imgs).map((key) => {
                return (
                    <div>
                        <div className='to-center'>
                            <div className='avatar'>
                                <Avatar
                                    src={imgs[key]}
                                    alt='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
                                />
                            </div>
                        </div>
                        <div className='to-center'> {key}</div>
                        <br />
                    </div>
                );
            });
        } else {
            return Object.keys(imgs).map((key) => {
                if (!displayTimes[activeIndex].array.includes(key)) {
                    return (
                        <div>
                            <div className='to-center'>
                                <div className='avatar'>
                                    <Avatar
                                        src={imgs[key]}
                                        alt='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
                                    />
                                </div>
                            </div>
                            <div className='to-center'> {key}</div>
                            <br />
                        </div>
                    );
                }
            });
        }
    };

    const displaySubGroup = () => {
        if (active === 0) {
            return (
                <div>
                    <Header title={"Today:"} />
                    <div className='grid-calendar-availability'>
                        <div className='group-calendar'>
                            <br />
                            <br />
                            {displayIntervals()}
                        </div>
                        <div className='group-availability'>
                            <div className='available'>
                                <br />
                                <h3 className='header'>Available</h3>
                                <div>{displayAvailable()}</div>
                            </div>
                            <div className='unavailable'>
                                <br />
                                <h3 className='header'>Unavailable</h3>
                                <div>{displayUnavailable()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (active === 1) {
            callApi();
            return <div className='main-card-container'>{<EventCard />}</div>;
        } else if (active === 2) {
            setPage("MainPage");
        }
    };

    return (
        <div>
            <div className='group-topbar-container'>
                <TopBar title={groupName}/>
            </div>
            <br />
            <div className='sidebar-card-container'>
                <div className='main-sidebar-container'>
                    <Sidebar
                        list={groupSidebarList}
                        active={active}
                        setActive={setActive}
                    />
                </div>
                {displaySubGroup()}
            </div>
        </div>
    );
};
export default GroupPage;
