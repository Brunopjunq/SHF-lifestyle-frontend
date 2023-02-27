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
        })
        .catch((error) => console.log(error))
    },[reload]);

    function createMeals(name) {
        const body = {
            name: name,
        };

        postMeal(body,today)
        .then((res) => {
            setReload(reload + 1);
        })
        .catch((error) => console.log(error))
    }
    
    function LoadMeals() {
        if(meals.length > 0) {
            return (
                <Container>
                    <h1>Acompanhe sua Alimentação</h1>
                    <MealsBox reload={reload} setReload={setReload}/>
                </Container>
            )
        } else {
            return (
                <Container>
                    <h1>Acompanhe sua Alimentação</h1>
                    <AddMeals onClick={() => {
                        createMeals('Café da Manhã');
                        createMeals('Almoço');
                        createMeals('Jantar');
                        createMeals('Lanche');
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