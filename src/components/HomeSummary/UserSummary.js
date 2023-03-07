import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAerobicsbyDay, getMealsByDay, getTotalCalories } from "../../service/api";
import WaterBox from "./WaterBox";
import WeightBox from "./WeightBox";
import FoodImage from "../../assets/images/foods.png";
import AerobicImage from "../../assets/images/aerobics.png";

export default function UserSummary() {
    const userData = JSON.parse(localStorage.getItem("shf_lifestyle"));
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [caloriesByDay, setCaloriesByDay] = useState('');
    const [aerobics, setAerobics] = useState('');

    useEffect(() => {
        getMealsByDay(today)
        .then((res) => {
            localStorage.setItem("mealsData", JSON.stringify(res.data));
        })
        .catch((error) => console.log(error));

        getTotalCalories(today)
        .then((res) => {
            setCaloriesByDay(res.data)
        })
        .catch((error) => console.log(error));

        getAerobicsbyDay(today)
        .then((res) => {
            localStorage.setItem("aerobicsData", JSON.stringify(res.data));
            setAerobics(res.data);
        })
        .catch((error) => console.log(error));
    }, [])

    function getDayCalories(day) {
        if(caloriesByDay.length === 0) {
            return 0;
        } else {
            const dayCal = caloriesByDay.filter((el) => el.date.includes(day))
            let sum = 0
            if(dayCal.length === 0) {
                return 0
            } else if(dayCal.length == 1) {
                return dayCal[0].Total
            } else {
                dayCal.map((x) =>
                sum = sum + x.Total)

                return sum
            };
        }
    }

    function getAerobicsCalories() {
        if(aerobics.length == 0) {
            return 0;
        } else {
            let sum = 0;
            aerobics.map((el) =>
            sum = sum + el.calories)

            return sum
        };
    };

    return (
        <>
        <Container>
            <h1>Bem vindo, {userData.name}</h1>
            <Content>
                <Main>
                    <CaloriesBox>
                        <a>Calorias consumidas hoje: <span>{getDayCalories(today)}</span> kcal | 
                        Meta diária: <span>{userData.calories_goal}</span> kcal </a>
                    </CaloriesBox>
                    <AerobicsBox>
                        <a>N° de exercícios hoje: <span>{aerobics.length}</span> | 
                        Calorias gastas: <span>{getAerobicsCalories()}</span> kcal </a>
                    </AerobicsBox>
                    <BottomBox>
                        <WaterCard>

                        </WaterCard>
                        <WaterCard>

                        </WaterCard>
                    </BottomBox>
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

const CaloriesBox = styled.div`
    width: 90%;
    height:100px;
    background-color: white;
    border-radius: 20px;
    background:url(${FoodImage});
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    a {
        font-weight: bold;
    }

    span {
        font-size: 40px;
    }
`

const AerobicsBox = styled.div`
    width: 90%;
    height:100px;
    background-color: white;
    border-radius: 20px;
    background:url(${AerobicImage});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    a {
        font-weight: bold;
    }

    span {
        font-size: 40px;
    }
`

const BottomBox = styled.div`
    width: 90%;
    height: 250px;
    display: flex;
    justify-content: space-between;
`

const WaterCard = styled.div`
    width: 48%;
    height: 250px;
    background-color: white;
    border-radius: 20px;
`