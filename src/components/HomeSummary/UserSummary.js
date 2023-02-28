import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMealsByDay, getTotalCalories } from "../../service/api";
import WaterBox from "./WaterBox";
import WeightBox from "./WeightBox";
import FoodImage from "../../assets/images/foods.png"

export default function UserSummary() {
    const userData = JSON.parse(localStorage.getItem("shf_lifestyle"));
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [caloriesByDay, setCaloriesByDay] = useState('');

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
    }, [])

    function getDayCalories(day) {
        if(caloriesByDay.length === 0) {
            return 5000
        } else {
            const dayCal = caloriesByDay.filter((el) => el.date.includes(day))
            console.log(dayCal);
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

    return (
        <>
        <Container>
            <h1>Bem vindo, {userData.name}</h1>
            <Content>
                <Main>
                    <CaloriesBox>
                        <a>Calorias: {getDayCalories(today)} kcal</a>
                    </CaloriesBox>
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

    a {
        font-weight: bold;
    }
`