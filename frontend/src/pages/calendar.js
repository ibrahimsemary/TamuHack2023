import React from "react";
import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Header from "../components/Header";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputBox from "../components/InputBox";
import axios from "axios";

const Calendar = ({ curr_user }) => {
    const [eventDate, setEventDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [modal, setModal] = useState(false);
    const [eventName, setEventName] = useState("");
    console.log(curr_user);
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
            console.log(x)
            const res = await axios.post(
                "https://group-sync.onrender.com/add-event",
                {
                    creator: curr_user,
                    start_time: startTime.format("HH:mm:ss"),
                    end_time: endTime.format("HH:mm:ss"),
                    description: "",
                    title: eventName,
                    date: eventDate.format("MM-DD-YYYY"),
                    usernames: null,
                }
            );
            console.log(res);
            setModal(false);
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

    return (
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
    );
};
export default Calendar;
