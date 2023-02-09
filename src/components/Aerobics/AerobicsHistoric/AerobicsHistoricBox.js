import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllAerobics } from "../../../service/api";

export default function AerobicsHistoricBox() {
    const [aerobics, setAerobics] = useState([]);

    useEffect(() => {
        getAllAerobics()
        .then((res) => {
            setAerobics(res.data);
        })
        .catch((error) => console.log(error))
    }, []);


    return (
        <Container>
            {aerobics.map((el) => (
                <Card>
                    <h2>{el.name}</h2>
                    <a>Data: {el.date.split('-').reverse().join('/')}</a>
                    <a>Tempo: {el.time} min</a>
                    <a>Calorias: {el.calories} kcal</a>                 
                </Card>
            ))}
        </Container>
    )


}

const Container = styled.div`
    width: 100%;
    min-height: 50px;
    display: flex;
    flex-wrap: wrap;
`

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
    position: relative;

    h2 {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 30px;
        margin-top: 20px;
        text-align: center;
    }

    a {
        padding-bottom: 6px;
    }

`