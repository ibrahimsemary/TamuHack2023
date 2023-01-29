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
import ProfilePic from "./ProfilePic"

const GroupCard = ({ id, usernames, title, curr_user, setGroups }) => {
    // const [imgs, setImgs] = useState({});

    // const getData = async () => {
    //     const res = await axios.get(
    //         `https://group-sync.onrender.com/get-user-from-groupid/${id}`
    //     );
    //     console.log(res);
    //     setImgs(res.data);
    // };
    // useEffect(() => {
    //     getData();
    // }, []);
    const [modal, setModal] = useState(false);
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

    const popUp = (e) => {
        return <div>pop up</div>;
    };

    const displayAvatars = () => {
        return usernames.map((name) => {
            if (name !== curr_user) {
                return (
                    // <div className='avatar'>
                    //     <Avatar
                    //         src={imgs[name]}
                    //         alt='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
                            
                    //     />
                    //     {name}
                    // </div>
                    ProfilePic(name, id)
                );
            }
        });
    };
    const deleteGroup = async () => {
        console.log(id);
        const res = await axios.post(
            "https://group-sync.onrender.com/remove-group",
            {
                groupsid: id,
            }
        );
        console.log(res);
        const res2 = await axios.get(
            `https://group-sync.onrender.com/get-groups/${curr_user}`
        );
        setGroups(res2.data);
        setModal(false);
    };
    return (
        <div className='card-container'>
            <div className='delete-button'>
                <IconButton onClick={() => setModal(true)}>
                    {" "}
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className='to-center'>
                <h3 className='card-title'>{title}</h3>
            </div>
            <div className='avatar-container'>{displayAvatars()}</div>
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
                        <Header title='Do you want to delete the Group?' />
                        <div className='to-center'>
                            <button
                                className='ui black submit button'
                                onClick={deleteGroup}
                            >
                                Yes
                            </button>
                            <button
                                className='ui black submit button'
                                onClick={() => {
                                    setModal(false);
                                }}
                            >
                                No
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default GroupCard;
