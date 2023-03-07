import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMealsByDay, postMeal } from "../../service/api";
import MealsBox from "./MealsBox";

export default function FoodsResume() {
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [meals, setMeals] = useState("");
    const [reload, setReload] = useState(0);

    useEffect(() => {
        getMealsByDay(today)
        .then((res) => {
            setMeals(res.data);
            localStorage.setItem("mealsData", JSON.stringify(res.data));
            setReload(0);
            console.log("Renderizou")
        })
        .catch((error) => console.log(error))
    },[reload]);

    function getTotalCaloriesByMeal(array) {
        let sum = 0;
        array.map((el) => {
            sum = sum + (el.foods.calories * (el.quantity/100))
        })
        return sum;
    }

    function getTotalCaloriesByDay() {
        if(meals.length < 2) {
            return 0;
        } else {
            return (getTotalCaloriesByMeal(meals[0].foods_meals)
            + getTotalCaloriesByMeal(meals[1].foods_meals)
            + getTotalCaloriesByMeal(meals[2].foods_meals)
            + getTotalCaloriesByMeal(meals[3].foods_meals))
        }
    }


    function createMeals() {
        const body1 = {
            name: 'Café da Manhã',
        };

        postMeal(body1,today)
        .then((res) => {
            setReload(reload + 1);
            setMeals(res.data);
        })
        .catch((error) => console.log(error))

    }
    
    function LoadMeals() {
        if(meals.length > 0) {
            return (
                <Container>
                    <Header>
                    <h1>Acompanhe sua Alimentação</h1>
                    <CaloriesBox>
                        <p>Calorias Consumidas: {getTotalCaloriesByDay()} kcal</p>
                        <p>Calorias Restantes: {2200 - getTotalCaloriesByDay()} kcal</p>
                    </CaloriesBox>
                    </Header>
                    <MealsBox />
                </Container>
            )
        } else {
            return (
                <Container>
                    <h1>Acompanhe sua Alimentação</h1>
                    <AddMeals onClick={() => {
                        createMeals();
                    }}>
                        Adicionar refeições do dia
                    </AddMeals>
                </Container>
            )
        }
    }

    const PageInfo = LoadMeals();

    return (
        <>
        {PageInfo}
        </>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 600px;
    padding-left: 30px;
    padding-right: 20px;

    h1 {
        color: #dfcd81;
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    margin-bottom: 35px;
    box-sizing: border-box;
    padding-right: 80px;
`

const CaloriesBox = styled.div`
    color: white;
`

const AddMeals = styled.div`
    width: 95%;
    height: 60px;
    background-color: #00004d;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 20px;
    color: white;
    font-weight:700;
    cursor: pointer;

    :hover {
        color: #dfcd81;
    }
`