import styled from "styled-components";
import Add from "../../assets/images/Add.png"

export default function AerobicsCard({name}) {
    return (
        <>
            <AddCard>
                <img src={Add} />
            </AddCard>
            <Card>
                <h2>Bicicleta</h2>
                <a>Tempo: 30 min</a>
                <a>Calorias: 300 kcal</a>
            </Card>
            <Card />
        </>
    )
}

const Card = styled.div`
    width: 230px;
    height: 150px;
    background-color: white;
    border-radius: 40px;
    box-sizing: border-box;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-weight: bold;
        margin-bottom: 40px;
        margin-top: 10px;
    }
`

const AddCard = styled.div`
    width: 230px;
    height: 150px;
    background-color: white;
    border-radius: 40px;
    box-sizing: border-box;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        height: 100px;
    }

    :hover {
        background-color: gray;
    }
`