import { useEffect, useState } from "react";
import styled from "styled-components";
import WeightImage from "../../assets/images/weight.jpg";
import { getWeights } from "../../service/api";

export default function WeightBox() {
    const [weights, setWeights] = useState([]);
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [lastDate, setLastDate] = useState("");

    useEffect(() => {
        getWeights()
        .then((res) => {
            setWeights(res.data);
            const date = res.data[0].date;
            const StringDate = date.toLocaleString().slice(0,10).split('-').reverse().join('/');
            setLastDate(StringDate);
        })
        .catch((error) => console.log(error))
    }, [])

    function LoadPage() {
        if(weights.length > 0) {
            return (
                <Container>
                    <HistoricButton>
                        Ver histórico completo
                    </HistoricButton>
                    <WeightText>
                        <h2>{weights[0].weight}<span style={{fontSize: 15}}>Kg</span></h2>   
                    </WeightText>
                    <AddButton>
                        Adicione um novo peso
                    </AddButton>
                    <h3>Ultima atualização: {lastDate}</h3>
                </Container>
            )
        } else {
            return (
                <AddContainer>
                    Adicione e controle seu peso
                </AddContainer>
            )
        }
    }

    const PageInfo = LoadPage();

    return (
        <>
        {PageInfo}
        </>
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
    background:url(${WeightImage});
    background-size: cover;
    border-radius: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    color: white;
    padding-bottom: 20px;
    cursor: pointer;

    :hover {
        opacity: 0.5;
    }
`

