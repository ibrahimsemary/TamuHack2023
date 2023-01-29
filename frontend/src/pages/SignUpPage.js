import React, { useState } from "react";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import axios from "axios"

const SignUpPage = ({ setPage }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("")

    const displayError = () => {
        if (error) {
            return (
                <div className='to-center'>
                    {" "}
                    <div className='error-message'>*Input All Fields</div>
                </div>
            );
        } else {
            return <br />;
        }
    };
    const SignUp = async () => {
        if (firstName && lastName && email&&username&&password) {
            await axios.post(
                "https://group-sync.onrender.com/create-user",
                {
                    username: username,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    email: email
                }
            ).then(()=>{
                console.log("This succeed")
                setPage("SignInPage")
            })
        } else {
            setError(true);
        }
    };
    return (
        <div className='to-center'>
            <div className='twenty-five'>
                <div>
                    <br />
                    <Header title='Sign Up:' />
                </div>
                <br />
                <div className='inputs'>
                    <div>
                        <InputBox
                            title={"First Name"}
                            placeholder={"Howard"}
                            text={firstName}
                            setText={setFirstName}
                        />
                    </div>
                    <br />
                    <div>
                        <InputBox
                            title={"Last Name"}
                            placeholder={"Morganthawler"}
                            text={lastName}
                            setText={setLastName}
                        />
                    </div>
                    <br />
                    <div>
                        <InputBox
                            title={"Email"}
                            placeholder={"abc@gmail.com"}
                            text={email}
                            setText={setEmail}
                        />
                    </div>
                    <br />
                    <div>
                        <InputBox
                            title={"Username"}
                            placeholder={"Mike Tyson"}
                            text={username}
                            setText={setUsername}
                        />
                    </div>
                    <br />
                    <div>
                        <InputBox
                            title={"Password"}
                            placeholder={"Mike Tyson"}
                            text={password}
                            setText={setPassword}
                        />
                    </div>
                    <br />
                    <div className='upload-photo'>
                        <div>Upload A Picture:</div>
                        <input type='file' />
                    </div>
                </div>
                <div className='flex'> {displayError()}</div>
                <div className='sign-in-sign-up-text'>
                    <p>Already have an account?</p>
                    <p
                        className='sign-in-sign-up'
                        onClick={() => setPage("SignInPage")}
                    >
                        {" "}
                        Login In
                    </p>
                </div>
                <div className='to-center'>
                    <div className='body-signin'>
                        <div className='sign-in-button'>
                            <button
                                className='ui black button my-button'
                                onClick={SignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
