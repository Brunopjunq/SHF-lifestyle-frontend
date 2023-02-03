import styled from "styled-components";

export default function WorkoutBox() {
    return (
        <Container>
            <h2>Treino de Perna</h2>
            <a>Número de Exercícios: 8</a>
            <a>Carga de Treino: 24 series/240reps</a>
        </Container>
        
    )
}

const Container = styled.div`
    width: 85%;
    height: 60px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 15px;
`