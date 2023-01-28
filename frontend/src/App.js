import React, { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
    const [page, setPage] = useState("SignInPage");

    if (page === "SignInPage") {
        return <SignInPage setPage={setPage} />;
    } else if (page === "SignUpPage") {
        return <SignUpPage setPage={setPage} />;
    }
};

export default App;
