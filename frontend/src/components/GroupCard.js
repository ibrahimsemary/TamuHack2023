import { Avatar } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const GroupCard = ({ usernames, title, curr_user }) => {
    const displayAvatars = () => {
        return usernames.map((name) => {
            if (name !== curr_user) {
                return (
                    <div className='avatar'>
                        <div>{name}</div>
                    </div>
                );
            }
        });
    };
    return (
        <div className='card-container'>
            <div className='delete-button'>
                <IconButton>
                    {" "}
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className='to-center'>
                <h3 className='card-title'>{title}</h3>
            </div>
            <div className='avatar-container'>{displayAvatars()}</div>
        </div>
    );
};
export default GroupCard;
