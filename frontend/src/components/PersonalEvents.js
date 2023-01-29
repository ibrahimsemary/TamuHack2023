import { useState, useEffect } from "react";
import "../css/calendar.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputBox from "./InputBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import axios from "axios";
import Event from "./Event";

const PersonalEvents = ({ curr_user, events, setEvents }) => {
    const getData = async () => {
        const curr_date = dayjs().format("YYYY-MM-DD");
        const res = await axios.get(
            `https://group-sync.onrender.com/get-schedule/${curr_user}/${curr_date}`
        );
        console.log(res)
        setEvents(res.data);
    };
    useEffect(() => {
        getData();
    }, []);

    const displayTimes = () => {
        return events.map((event) => {
            return (
                <Event
                    title={event[5]}
                    setEvents = {setEvents}
                    startTime={event[2].slice(0, 5)}
                    endTime={event[3].slice(0, 5)}
                    id={event[6]}
                    curr_user = {curr_user}
                />
            );
        });
    };

    return (
        <div>
            <div>{displayTimes()}</div>
        </div>
    );
};
export default PersonalEvents;
