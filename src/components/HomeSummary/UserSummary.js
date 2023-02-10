import styled from "styled-components";
import WaterBox from "./WaterBox";

export default function UserSummary() {
    const userData = JSON.parse(localStorage.getItem("shf_lifestyle"));

    return (
        <>
        <Container>
            <h1>Bem vindo, {userData.name}</h1>
            <Content>
                <Main />
                <SideBar>
                    <WaterBox />
                </SideBar>
            </Content>
        </Container>
        </>
    )
};

const Container = styled.div`
    width: 100%;
    min-height: 600px;
    padding-left: 30px;
    padding-right: 20px;

    h1 {
        color: #dfcd81;
    }
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

const Main = styled.div`
    width:75%;
    min-height:600px;
    border-right: solid 1px white;
`

const SideBar = styled.div`
    width: 25%;
    min-height: 600px;
    display: flex;
    justify-content: center;
`