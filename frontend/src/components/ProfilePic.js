import { Avatar } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfilePic = ({ name, id }) => {
    const [imgs, setImgs] = useState({});

    const getData = async () => {
        const res = await axios.get(
            `https://group-sync.onrender.com/get-user-from-groupid/${id}`
        );
        setImgs(res.data);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className='avatar'>
            <Avatar
                src={imgs[name]}
                alt='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
            />
            {name}
        </div>
    );
};

export default ProfilePic;
