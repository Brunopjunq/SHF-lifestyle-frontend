import styled from "styled-components";

export default function WeightBox() {
    return (
        // <AddContainer>
        //     Adicione e controle seu peso
        // </AddContainer>

        <Container>
            <HistoricButton>
                Ver histórico completo
            </HistoricButton>
            <WeightText>
                <h2>74,5<span style={{fontSize: 15}}>Kg</span></h2>   
            </WeightText>
            <AddButton>
                Adicione um novo peso
            </AddButton>
            <h3>Ultima atualização: 10/02/2023</h3>
        </Container>
    )
}

const Container = styled.div`
    width: 80%;
    height: 150px;
    background-color: white;
    border-radius: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-weight: bold;
    position: relative;

    h3 {
        font-size: 12px;
        margin-bottom: 3px;
    }
`

const WeightText = styled.div`
    height:100%;
    display: flex;
    flex-direction: row;
    text-align: bottom;
    margin-top: 45px;
    h2 {
        font-size: 50px;
    }

`
const HistoricButton = styled.div`
    position: absolute;
    top: 5px;
    left: 37px;
    font-size: 12px;
    border: solid 1px black;
    border-radius: 5px;

    :hover {
        cursor: pointer;
        background-color: lightgray;
    }
`

const AddButton = styled.div`
    position: absolute;
    bottom: 25px;
    left: 37px;
    font-size: 12px;
    border: solid 1px black;
    border-radius: 5px;

:hover {
    cursor: pointer;
    background-color: lightgray;
}
`


const AddContainer = styled.div`
    width: 80%;
    height: 150px;
    background-color: white;
    border-radius: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    :hover {
        background-color: gray;
    }
`

