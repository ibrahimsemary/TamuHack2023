import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import "../Overall.css";
import "./SignInPage.css";
import { TextField } from "@mui/material";
import axios from "axios";

const SignInPage = ({ setPage, setUser, setGroups }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);

    const displayError = () => {
        if (error) {
            return (
                <div className='to-center'>
                    {" "}
                    <div className='error-message'>
                        *Incorrect username or password
                    </div>
                </div>
            );
        } else {
            return <br />;
        }
    };

    const authenticate = async () => {
        const res = await axios.post(
            "https://group-sync.onrender.com/authenticate",
            { username: username, password: password }
        );
        console.log(res.data);
        if (res.data === "User cannot be found") {
            setError(true);
        } else if (res.data === "Cannot Authenticate") {
            setError(true);
        } else {
            const res2 = await axios.get(
                `https://group-sync.onrender.com/get-groups/${res.data}`
            );
            setGroups(res2.data);
            setUser(res.data);
            setPage("MainPage");
        }
    };

    return (
        <div>
            {" "}
            <br />
            <div className='to-center'>
                <div className='body-signin'>
                    <div className='header'>
                        <Header title='Sign In:' />
                    </div>
                    <br />
                    <div className='to-center'>
                        <div className='body-signin'>
                            <div className='to-center'>
                                <InputBox
                                    title={"Username"}
                                    placeholder={"eg. TheLegend27"}
                                    text={username}
                                    setText={setUsername}
                                />
                            </div>
                            <br />

                            <div className='to-center'>
                                <InputBox
                                    title={"Password"}
                                    placeholder={"eg. factFood96"}
                                    text={password}
                                    setText={setPassword}
                                    type='password'
                                />
                            </div>
                        </div>
                    </div>

                    {displayError()}

                    <div className='to-center'>
                        <div className='sign-in-sign-up-text'>
                            <p>Don't have an account?</p>
                            <p
                                className='sign-in-sign-up'
                                onClick={() => setPage("SignUpPage")}
                            >
                                {" "}
                                Sign Up
                            </p>
                        </div>
                    </div>
                    <div className='to-center'>
                        <div className='body-signin'>
                            <div className='sign-in-button'>
                                <button
                                    className='ui black button my-button'
                                    onClick={authenticate}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
