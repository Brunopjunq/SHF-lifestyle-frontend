import styled from "styled-components";
import WorkoutBox from "./WorkoutBox";

export default function Workouts() {
    return (
        <>
        <Container>
            <h1>Acompanhe seus treinos</h1>
            <WorkoutBox />
            <AddWorkout>
                Adicione um novo Treino!
            </AddWorkout>
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

const AddWorkout = styled.div`
    width: 85%;
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