import styled from "styled-components";
import WorkoutBox from "./WorkoutBox";

export default function Workouts() {
    return (
        <>
        <Container>
            <h1>Acompanhe seus treinos</h1>
            <WorkoutBox />
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