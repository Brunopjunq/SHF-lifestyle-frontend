import styled from "styled-components";

export default function UserSummary() {
    const userData = JSON.parse(localStorage.getItem("shf_lifestyle"));

    return (
        <>
        <Container>
            <h1>Bem vindo, {userData.name}</h1>
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