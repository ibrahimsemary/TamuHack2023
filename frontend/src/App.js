import React, { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";

const App = () => {
    const [page, setPage] = useState("SignInPage");
    const [user , setUser] = useState(null)

    if (page === "SignInPage") {
        return <SignInPage setPage={setPage} setUser = {setUser} />;
    } else if (page === "SignUpPage") {
        return <SignUpPage setPage={setPage} />;
    } else if (page === "MainPage") {
        return <MainPage />;
    }
};

export default App;
