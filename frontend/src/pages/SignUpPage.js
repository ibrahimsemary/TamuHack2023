import React, { useState } from "react";
import Header from "../components/Header";
import InputBox from "../components/InputBox";

const SignUpPage = ({ setPage }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
    const SignUp = () => {
        setError(true);
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
