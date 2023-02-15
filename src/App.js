import SignInPage from "./pages/SignInPage";
import GlobalStyle from "./styles/globalStyles";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import userContext from "./context/user-context";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Workouts from "./components/Workout/Workouts";
import Aerobics from "./components/Aerobics/Aerobics";
import WorkoutIdPage from "./components/Workout/WorkoutIdPage";
import useToken from "./hooks/useToken";
import AerobicsHistoric from "./components/Aerobics/AerobicsHistoric/AerobicsHistoric";
import AerobicsDate from "./components/Aerobics/AerobicsDate/AerobicsDate";
import FoodsResume from "./components/foods/foodResume"
import UserSummary from "./components/HomeSummary/UserSummary";
import WeightControl from "./components/Weights/Weights";

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
                        <Route path="/home" element={
                        <ProtectedRouteGuard>
                            <HomePage />
                        </ProtectedRouteGuard>
                        }>
                            <Route path="workout" element={<Workouts />} />
                            <Route path="workout/:id" element={<WorkoutIdPage />} />
                            <Route path="aerobics" element={<Aerobics />} />
                            <Route path="aerobics/historic" element={<AerobicsHistoric />} />
                            <Route path="aerobics/:date" element={<AerobicsDate />} />
                            <Route path="foods" element={<FoodsResume />} />
                            <Route path="summary" element={<UserSummary />} />
                            <Route path="weight" element={<WeightControl />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </userContext.Provider>
        </>
    )
};

function ProtectedRouteGuard({children}) {
    const token = useToken();

    if(!token) {
        return <Navigate to="/" />;
    }

    return <>
        {children}
    </>
}