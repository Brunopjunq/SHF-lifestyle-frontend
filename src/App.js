import SignInPage from "./pages/SignInPage";
import GlobalStyle from "./styles/globalStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    {/* <Route path="/home" element={<Home />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
};