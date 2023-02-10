import { useEffect, useState } from "react";
import styled from "styled-components";
import Glass from "../../assets/images/Glass.png";
import Minus from "../../assets/images/Minus.png";
import Plus from "../../assets/images/Plus.png";
import { getWaterByDay, increaseWaterCount, postWaterCount } from "../../service/api";

export default function WaterBox() {
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [waterCount, setWaterCount] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getWaterByDay(today)
        .then((res) => {
            setWaterCount(res.data);
            setReload(false);
        })
        .catch((error) => console.log(error))
    },[today,reload])


    function createWaterCount() {
        const body = {
            quantity: 0,
        };
        
        postWaterCount(body, today)
        .then((res) => {
            setWaterCount(res.data);
            setReload(true);
        })
        .catch((error) => console.log(error));
    };

    function addWaterCount() {
        increaseWaterCount(today)
        .then((res) => {
            setWaterCount(res.data);
            setReload(true);
        })
        .catch((error) => console.log(error));
    };


    function LoadWaterInfo() {
        if(waterCount.length > 0) {
            return (
                <Container>
                    <img src={Glass} className="glass"/>
                    <img src={Minus} className="minus" />
                    <img src={Plus} className="plus" onClick={addWaterCount}/>
                    <div>{waterCount[0].quantity}</div>
                </Container>
            )
        } else {
            return (
                <AddContainer onClick={createWaterCount}>
                    <h2>Adicione o consumo de água do dia</h2>
                    <img src={Glass} className="glassNew"/>
                </AddContainer>                
            )
        }
    }

    const PageInfo = LoadWaterInfo();

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
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;

    .glass {
        height: 150px;
        position: absolute;
        top: 0px;
        left:30px;
    }

    .glassNew {
        height: 150px;
        position: absolute;
        top: 0px;
        left:30px;
        opacity: 0.5;
    }
    
    .minus {
        height: 50px;
        position: absolute;
        top: 50px;
        left: 10px;
        cursor: pointer;
    }

    .plus {
        height: 53px;
        position: absolute;
        top: 50px;
        right: 10px;
        cursor: pointer;
    }

    div {
        width: 40px;
        position: absolute;
        display: flex;
        justify-content: center;
        top: 60px;
        left:85px;
        font-size: 30px;
    }

    h2 {
        z-index: 1;
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
    cursor: pointer;;
    margin-bottom: 20px;

    :hover {
        background-color: #8eddec;
    }

    .glassNew {
        height: 150px;
        position: absolute;
        top: 0px;
        left:30px;
        opacity: 0.5;
    }

    h2 {
        z-index: 1;
    }
`