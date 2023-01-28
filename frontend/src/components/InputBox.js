import React from "react";
import TextField from "@mui/material/TextField";

const InputBox = ({ title, text, setText, placeholder, type, fullWidth }) => {
    const onCh = (e) => {
        setText(e.target.value);
    };
    return (
        <TextField
            fullWidth
            label={title}
            onChange={(e) => onCh(e)}
            value={text}
            placeholder={placeholder}
            type={type}
        />
    );
};

export default InputBox;
