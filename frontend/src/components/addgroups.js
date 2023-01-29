import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import InputBox from "./InputBox";
import Header from "./Header";
import SelectionDropdown from "./SelectionDropdown";
import axios from "axios";

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
const AddGroups = ({ users, setUsers, allUsers, curr_user, setGroups }) => {
    const [modal, setModal] = useState(false);
    const [groupName, setGroupName] = useState("");

    const createGroup = async () => {
        const res = await axios.post(
            "https://group-sync.onrender.com/add-group",
            {
                creator: curr_user,
                title: groupName,
                description: "",
                usernames: users,
            }
        );
        console.log(res);

        const res2 = await axios.get(
            `https://group-sync.onrender.com/get-groups/${curr_user}`
        );
        console.log(res2.data);
        setGroups(res2.data);
        setModal(false);
    };
    return (
        <div className='to-center'>
            <div className='button-stuff'>
                <button className='ui button'>
                    <div className='to-center'>
                        {" "}
                        <i
                            class='user plus huge icon'
                            onClick={() => setModal(true)}
                        ></i>
                    </div>
                </button>
            </div>

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
                        <Header title='Create Group:' />
                        <br />
                        <InputBox
                            placeholder={"eg. TAMU alumni network"}
                            title={"Group Name"}
                            text={groupName}
                            setText={setGroupName}
                        />
                        <br />
                        <br />
                        <SelectionDropdown
                            allUsers={allUsers}
                            users={users}
                            setUsers={setUsers}
                        />
                        <br />
                        <div className='to-center'>
                            <button
                                className='ui black submit button'
                                onClick={() => {
                                    createGroup();
                                }}
                            >
                                Create Group
                                {console.log("Printing only once")}
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddGroups;
