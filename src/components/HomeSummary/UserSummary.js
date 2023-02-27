import { useEffect } from "react";
import styled from "styled-components";
import { getMealsByDay } from "../../service/api";
import WaterBox from "./WaterBox";
import WeightBox from "./WeightBox";

export default function UserSummary() {
    const userData = JSON.parse(localStorage.getItem("shf_lifestyle"));
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');

    useEffect(() => {
        getMealsByDay(today)
        .then((res) => {
            localStorage.setItem("mealsData", JSON.stringify(res.data));
        })
        .catch((error) => console.log(error));
    }, [])

    return (
        <>
        <Container>
            <h1>Bem vindo, {userData.name}</h1>
            <Content>
                <Main>
                    Em Breve!
                </Main>
                <SideBar>
                    <WaterBox />
                    <WeightBox />
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
    color: white;
`

const SideBar = styled.div`
    width: 25%;
    min-height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
`