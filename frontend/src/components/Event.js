import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import dayjs from "dayjs";

const Event = ({ title, startTime, endTime, id, curr_user, setEvents }) => {
    const deleteEvent = async () => {
        const x = await axios.post(
            "https://group-sync.onrender.com/remove-event",
            {
                eventid: id,
            }
        );
        console.log(x);
        const curr_date = dayjs().format("YYYY-MM-DD");
        const res1 = await axios.get(
            `https://group-sync.onrender.com/get-schedule/${curr_user}/${curr_date}`
        );
        console.log(res1.data);
        setEvents(res1.data);
    };
    return (
        <div className='to-center'>
            <div className='fifty'>
                <div className='event-container'>
                    <div className='delete-button'>
                        <IconButton onClick={deleteEvent}>
                            {" "}
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <div className='to-center'>
                        {" "}
                        <h4 className=''>{title}</h4>
                    </div>
                    <div className='to-center'>
                        {startTime} - {endTime}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
