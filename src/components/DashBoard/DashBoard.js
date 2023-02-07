import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";

export default function DashBoard() {
    return (
        <DashContainer>
            <DashboardBox>
                <NavigationBar />
                <Outlet />
            </DashboardBox>
        </DashContainer>
    )
}

const DashContainer = styled.div`
    min-height: 800px;
    width: 100%;
    background-color: none;
    display: flex;
    justify-content: center;
`

const DashboardBox = styled.div`
    width: 1100px;
    min-height: 600px;
    background: linear-gradient(to left,#33406a,#303d68); 
    margin-top: 30px;
    border-radius: 50px;
    box-sizing: border-box;
    padding-bottom: 20px;
`