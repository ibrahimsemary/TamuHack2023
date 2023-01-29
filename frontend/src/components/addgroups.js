import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import InputBox from "./InputBox";
import Header from "./Header";
import SelectionDropdown from "./SelectionDropdown";

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

const AddGroups = () => {
    const [modal, setModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    return (
        <div className='to-center' onClick={() => setModal(true)}>
            <button className='ui button'>
                <div className='to-center'>
                    {" "}
                    <i class='user plus huge icon'></i>
                </div>
            </button>
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
                        <SelectionDropdown />
                        <br />
                        <div className='to-center'>
                            <button className='ui black submit button'>
                                Create Group
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddGroups;
