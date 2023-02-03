import SignInPage from "./pages/SignInPage";
import GlobalStyle from "./styles/globalStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import userContext from "./context/user-context";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Workouts from "./components/Workout/Workouts";

export default function App() {

    const [userInfos, setUserInfos] = useState("");

    return (
        <>
            <GlobalStyle />
            <userContext.Provider value={{userInfos, setUserInfos}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignInPage />} />
                        <Route path="/signUp" element={<SignUpPage />} />
                        <Route path="/home" element={<HomePage />}>
                            <Route path="workout" element={<Workouts />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </userContext.Provider>
        </>
    )
};