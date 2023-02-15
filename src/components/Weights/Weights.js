import styled from "styled-components";

export default function WeightControl() {
    return (
        <>
        <Container>
            <h1>Acompanhe seu Peso</h1>
            <a>Em Breve!</a>
            {/* <WorkoutBox /> */}
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

    a {
        color: white;
    }
`