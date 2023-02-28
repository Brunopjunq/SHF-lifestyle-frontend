import { useEffect, useState } from "react";
import styled from "styled-components";
import WeightImage from "../../assets/images/weight.jpg";
import { getWeights, postWeight } from "../../service/api";
import Exit from "../../assets/images/Close.png";
import Swal from "sweetalert2";
import BackImage from "../../assets/images/weight.jpg";
import { useNavigate } from "react-router-dom";

export default function WeightBox() {
    const [weights, setWeights] = useState([]);
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [lastDate, setLastDate] = useState("");
    const [form, setForm] = useState({
        weight: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        getWeights()
        .then((res) => {
            setWeights(res.data);
            const date = res.data[0].date;
            const StringDate = date.toLocaleString().slice(0,10).split('-').reverse().join('/');
            setLastDate(StringDate);
        })
        .catch((error) => console.log(error))
    }, [isPopUpVisible])

    function LoadPage() {
        if(weights.length > 0) {
            return (
                <Container>
                    <HistoricButton onClick={() => navigate("/home/weight")}>
                        Ver histórico completo
                    </HistoricButton>
                    <WeightText>
                        <h2>{weights[0].weight}<span style={{fontSize: 15}}>Kg</span></h2>   
                    </WeightText>
                    <AddButton onClick={() => setIsPopUpVisible(true)}>
                        Adicione um novo peso
                    </AddButton>
                    <h3>Ultima atualização: {lastDate}</h3>
                </Container>
            )
        } else {
            return (
                <AddContainer onClick={() => setIsPopUpVisible(true)}>
                    Adicione e controle seu peso
                </AddContainer>
            )
        }
    }

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function addWeightRequest(e) {
        e.preventDefault();

        postWeight(form, today)
        .then((res) => {
            setIsPopUpVisible(false);
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response}`
            });
            setForm({
                weight: "",
            });
            setIsPopUpVisible(false);
        })
    }

    function addWeight() {
        if(isPopUpVisible === true) {
            return (<PopUp>
            <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
            <PopUpBox onSubmit={addWeightRequest}>
                <input
                required 
                placeholder="Novo peso"
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleForm}
                ></input>
                <button>Adicionar Peso</button>
            </PopUpBox>               
        </PopUp>
        ) }
    }

    const PageInfo = LoadPage();
    const PopUpInfo = addWeight();

    return (
        <>
        {PageInfo}
        {PopUpInfo}
        </>
    )
}

const Container = styled.div`
    width: 80%;
    height: 150px;
    background:url(${BackImage});
    background-size: cover;
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
