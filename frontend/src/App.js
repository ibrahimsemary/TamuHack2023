import React, { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./MainPage";

const App = () => {
    const [page, setPage] = useState("MainPage");

    if (page === "SignInPage") {
        return <SignInPage setPage={setPage} />;
    } else if (page === "SignUpPage") {
        return <SignUpPage setPage={setPage} />;
    } else if (page === "MainPage") {
        return <MainPage />;
    }
};

export default App;
