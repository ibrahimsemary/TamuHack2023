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
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputBox from "../components/InputBox";
import PersonalEvents from "../components/PersonalEvents";

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

    const [eventDate, setEventDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [modal, setModal] = useState(false);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);
    

    const createEvent = async () => {
        if (eventDate && startTime && endTime && eventName) {
            const x = {
                creator: curr_user,
                start_time: startTime.format("HH:mm:ss"),
                end_time: endTime.format("HH:mm:ss"),
                description: "",
                title: eventName,
                date: eventDate.format("YYYY-MM-DD"),
                usernames: [],
            };
            console.log(x);
            const res = await axios.post(
                "https://group-sync.onrender.com/add-event",
                {
                    creator: curr_user,
                    start_time: startTime.format("HH:mm:ss"),
                    end_time: endTime.format("HH:mm:ss"),
                    description: "",
                    title: eventName,
                    date: eventDate.format("YYYY-MM-DD"),
                    groupsid: groupId
                }
            );
            console.log(res);
            console.log("It works")
        }
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
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
                    <div>
            <Button onClick={() => setModal(true)} size='large'>
                Create New Event
            </Button>

            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={modal}
                onClose={() => setModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modal}>
                    <Box sx={style}>
                        <Header title='New Event: ' />
                        <br />
                        <div className='to-center'>
                            <InputBox
                                title='Event Name'
                                placeholder={"eg. Class Time"}
                                text={eventName}
                                setText={setEventName}
                                fullWidth={false}
                            />
                        </div>
                        <br />
                        <div className='to-center'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label='Event Date'
                                    value={eventDate}
                                    onChange={(newValue) => {
                                        setEventDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <br />
                        <div className='to-center'>
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label='Start Time'
                                    value={startTime}
                                    onChange={(newValue) => {
                                        setStartTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <br />
                        <div className='to-center'>
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label='End Time'
                                    value={endTime}
                                    onChange={(newValue) => {
                                        setEndTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <br />
                        <div className='to-center'>
                            {" "}
                            <button
                                className='ui black button'
                                onClick={createEvent}
                            >
                                Create Event
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
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
        <>
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
        </>
    );
};
export default GroupPage;
