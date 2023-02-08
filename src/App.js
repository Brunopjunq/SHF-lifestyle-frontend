import SignInPage from "./pages/SignInPage";
import GlobalStyle from "./styles/globalStyles";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import userContext from "./context/user-context";
import workoutsContext from "./context/workouts-context"
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Workouts from "./components/Workout/Workouts";
import Aerobics from "./components/Aerobics/Aerobics";
import WorkoutIdPage from "./components/Workout/WorkoutIdPage";
import useToken from "./hooks/useToken";

export default function App() {

    const [userInfos, setUserInfos] = useState("");
    const [workoutInfos, setWorkoutInfos] = useState("");

    return (
        <>
            <GlobalStyle />
            <userContext.Provider value={{userInfos, setUserInfos}}>
            <workoutsContext.Provider value={{workoutInfos, setWorkoutInfos}} >
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
                            <Route path="summary" element={<Aerobics />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </workoutsContext.Provider>
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