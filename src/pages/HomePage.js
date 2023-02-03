import styled from "styled-components"
import { IconContext } from "react-icons";
import Header from "../components/Header";
import DashBoard from "../components/DashBoard/DashBoard";

export default function HomePage() {
    return (
        <>
        <PageContainer>
        <IconContext.Provider value={{ size: 30, color: "#dfcd81", className:'react-icons' }}>
            <Header />
            <DashBoard />
        </IconContext.Provider>;
        </PageContainer>
        </>
    )
};

const PageContainer = styled.div`
    background-color: #00004d;
    min-height: 100vh;

    .react-icons {
        cursor: pointer;
    }
`