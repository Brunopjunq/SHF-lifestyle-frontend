import styled from "styled-components";
import MealsBox from "./MealsBox";

export default function FoodsResume() {
    return (
        <>
        <Container>
            <h1>Acompanhe sua Alimentação</h1>
            {/* <AddMeals>
                Adicionar refeições do dia
            </AddMeals> */}
            <MealsBox />
        </Container>
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