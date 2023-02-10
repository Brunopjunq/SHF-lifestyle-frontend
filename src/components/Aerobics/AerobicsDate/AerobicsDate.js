import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Aerobics from "../Aerobics";
import Exit from "../../../assets/images/Close.png"
import AerobicsDateBox from "./AerobicsDateBox";

export default function AerobicsDate() {
    const { date } = useParams();
    const dateBr = date.split('-').reverse().join('/');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const navigate = useNavigate();
    const DateNew = new Date();
    const today = DateNew.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [newDate, setNewDate] = useState("");

    function loadPage() {
        return (
            <Container>
                <h1>Acompanhe seus treinos Aeróbicos</h1>
                <DayBox>
                    <a onClick={() => setIsPopUpVisible(true)}>Escolha outro dia</a>
                    <h2>{dateBr}</h2>
                    <a onClick={() => navigate("/home/aerobics/historic")}>Ver histório completo</a>
                </DayBox>
                <AerobicsDateBox />
            </Container>          
        )
    };

    function changeDate(e) {
        e.preventDefault();

        navigate(`/home/aerobics/${newDate}`);
        setIsPopUpVisible(false);
    };

    function chooseDate() {
        if(isPopUpVisible === true) {
            return (
                <PopUp>
                    <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
                    <PopUpBox onSubmit={changeDate}>
                    <input
                        required 
                        name="newDate"
                        type="date"
                        value={date}
                        onChange={e => setNewDate(e.target.value)}
                        ></input>
                        <button>Escolha uma data</button>
                    </PopUpBox>
                </PopUp>               
            )
        } else {
            return (
                <></>
            )
        }
    }

    const PageInfo = loadPage();
    const PopUpInfo = chooseDate();

    if(date == today) {
        return <Aerobics />
    } else {
        return (
            <>
            {PageInfo}
            {PopUpInfo}
            </>
        )
    }

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

const DayBox = styled.div`
    width: 100%;
    height:20px;
    margin-top: 35px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;

    h2 {
        font-size:25px;
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

const PopUp = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: 0px;
    img {
        position: absolute;
        top: 25px;
        right: 30px;
        cursor: pointer;
    }
`

const PopUpBox = styled.form`
    width: 550px;
    height: 300px;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 12px;
  
    input {
        width: 70%;
        height: 45px;
        background: #ffffff;
        border-radius: 6px;
        margin-bottom: 5px;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 40px;
        color: #9f9f9f;
        padding-left: 10px;
    }

    button {
        width: 70%;
        height: 45px;
        background: #1877f2;
        border-radius: 6px;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 40px;
        color: #ffffff;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`