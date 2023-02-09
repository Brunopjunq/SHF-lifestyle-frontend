import styled from "styled-components";
import AerobicsBox from "./AerobicsBox";

export default function Aerobics() {
    return (
        <>
        <Container>
            <h1>Acompanhe seus treinos Aeróbicos</h1>
            <DayBox>
                <a>Escolha outro dia</a>
                <h2>Hoje</h2>
                <a>Ver histório completo</a>
            </DayBox>
            <AerobicsBox />
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

const DayBox = styled.div`
    width: 100%;
    height:20px;
    margin-top: 35px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;

    h2 {
        font-size:20px;
        font-weight: bold;
        color: white;
    }

    a {
        color: white;
        border: solid 1px;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;

        :hover {
            background-color: #dfcd81;
        }
    }
`