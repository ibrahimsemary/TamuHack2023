import { Avatar } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import InputBox from "./InputBox";
import Header from "./Header";
import SelectionDropdown from "./SelectionDropdown";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfilePic =(name, id)=>{
    const [imgs, setImgs] = useState({});

    const getData = async () => {
        const res = await axios.get(
            `https://group-sync.onrender.com/get-user-from-groupid/${id}`
        );
        console.log(res);
        setImgs(res.data);
    };
    useEffect(() => {
        getData();
    }, []);
    return(
        <div className='avatar'>
            <Avatar
                src={imgs[name]}
                alt='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
                
            />
            {name}
        </div>
    )
}

export default ProfilePic
