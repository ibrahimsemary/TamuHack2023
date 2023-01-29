import React, { useState, useEffect } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import axios from "axios";

const App = () => {
    const [page, setPage] = useState("SignInPage");
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    const callApi = async () => {
        const res = await axios.get("https://group-sync.onrender.com/getusers");
        const x = [];
        res.data.forEach((element) => {
            if (element !== user) {
                x.push({ key: element, text: element, value: element });
            }
        });
        setAllUsers(x);

        return res.data;
    };
    useEffect(() => {
        callApi();
    }, []);

    if (page === "SignInPage") {
        return (
            <SignInPage
                setPage={setPage}
                setUser={setUser}
                setGroups={setGroups}
            />
        );
    } else if (page === "SignUpPage") {
        return <SignUpPage setPage={setPage} />;
    } else if (page === "MainPage") {
        return (
            <MainPage
                allUsers={allUsers}
                curr_user={user}
                groups={groups}
                setGroups={setGroups}
            />
        );
    }
};

export default App;
