import styled from "styled-components"
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function HomePage() {
    const navigate = useNavigate();
    
    return (
        <>
        <PageContainer>
        <IconContext.Provider value={{ size: 30, color: "#dfcd81", className:'react-icons' }}>
            <Header />
            <DashContainer>
                <Dashboard>
                
                </Dashboard>
            </DashContainer>
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

const DashContainer = styled.div`
    min-height: 800px;
    width: 100%;
    background-color: none;
    display: flex;
    justify-content: center;
`

const Dashboard = styled.div`
    width: 1100px;
    min-height: 600px;
    background: linear-gradient(to left,#33406a,#303d68); 
    margin-top: 30px;
    border-radius: 50px;
`