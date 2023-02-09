import styled from "styled-components";

export default function FoodsResume() {
    return (
        <>
        <Container>
            <h1>Acompanhe sua Alimentação</h1>
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
`