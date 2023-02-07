import { useParams } from "react-router-dom";
import styled from "styled-components";
import ExerciseBox from "./ExerciseBox";

export default function WorkoutIdPage() {
    const { id } = useParams();
    
    return (
        <>
        <Container>
            <h1>Acompanhe seus treinos</h1>
            <WorkoutBox>
                <TitleBox>
                    <h1>Treino de Perna</h1>
                </TitleBox>
                <ExerciseBox />
                <ExerciseBox />
                <ExerciseBox />
                <ExerciseBox />
                <ExerciseBox />
                <ExerciseBox />
                <ExerciseBox />
                <ExerciseBox />
                <ExerciseBox />
            </WorkoutBox>
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

const WorkoutBox = styled.div`
    width: 98%;
    min-height: 500px;
    background-color: #e6e6e6;
    border-radius: 20px;
`

const TitleBox = styled.div`
    width:100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px black;
    
    h1 {
        color: black;
    }
`