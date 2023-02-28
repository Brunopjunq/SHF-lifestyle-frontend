import { useState } from "react";
import styled from "styled-components";
import { updateUser } from "../../service/api";
import Swal from "sweetalert2";
import Exit from "../../assets/images/Close.png";

export default function UserProfile() {
    const userData = JSON.parse(localStorage.getItem("shf_lifestyle"));
    const [name,setName] = useState("");
    const [calories, setCalories] = useState("");
    const [weight, setWeight] = useState("");
    const [isPopUpVisible, setIsPopUpVisible] = useState("");


    function loadPage() {
        return (
            <>
            <Container>
                <h1>Bem vindo, {userData.name}</h1>
                <TextBox>
                    <p>Nome: {userData.name}</p>
                    <UpdateButton onClick={() => setIsPopUpVisible("name")}>Atualizar Nome</UpdateButton>
                </TextBox>
                <TextBox>
                    <p>Meta de calorias diárias: {userData.calories_goal} kcal</p>
                    <UpdateButton onClick={() => setIsPopUpVisible("calories")}>Atualizar Meta</UpdateButton>
                </TextBox>
                <TextBox>
                    <p>Meta de Peso: {userData.weight_goal} Kg</p>
                    <UpdateButton onClick={() => setIsPopUpVisible("weight")}>Atualizar Meta</UpdateButton>
                </TextBox>
            </Container>
            </>
        )
    }

    function updateName(e) {
        e.preventDefault();

        const body = {
            name: name
        }

        updateUser(body)
        .then((res) => {
            localStorage.setItem("shf_lifestyle", JSON.stringify({
                id: userData.id,
                name: name,
                token: userData.token,
                calories_goal: userData.calories_goal,
            }));
            setName("");
            setIsPopUpVisible("");
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response}`
            });
            setName("");
            setIsPopUpVisible("");
        })
    }

    function updateCaloriesGoal(e) {
        e.preventDefault();

        const body = {
            calories_goal: Number(calories)
        }

        updateUser(body)
        .then((res) => {
            localStorage.setItem("shf_lifestyle", JSON.stringify({
                id: userData.id,
                name: userData.name,
                token: userData.token,
                calories_goal: calories,
            }));
            setCalories("");
            setIsPopUpVisible("");
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response}`
            });
            setCalories("");
            setIsPopUpVisible("");
        })
    }

    function updateWeightGoal(e) {
        e.preventDefault();

        const body = {
            weight_goal: Number(weight)
        }

        updateUser(body)
        .then((res) => {
            localStorage.setItem("shf_lifestyle", JSON.stringify({
                id: userData.id,
                name: userData.name,
                token: userData.token,
                calories_goal: userData.calories_goal,
                weight_goal: weight
            }));
            setWeight("");
            setIsPopUpVisible("");
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response}`
            });
            setWeight("");
            setIsPopUpVisible("");
        })
    }

    function loadPopUp() {
        if(isPopUpVisible === "name") {
            return (
            <PopUp>
            <img src={Exit} onClick={() => setIsPopUpVisible("")}/>
            <PopUpBox onSubmit={updateName}>
                <input
                required 
                placeholder="Nome"
                name="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                ></input>
                <button>Atualizar Nome</button>
            </PopUpBox>               
        </PopUp>
        ) } else if(isPopUpVisible === "calories") {
            return (
            <PopUp>
                <img src={Exit} onClick={() => setIsPopUpVisible("")}/>
                <PopUpBox onSubmit={updateCaloriesGoal}>
                    <input
                    required 
                    placeholder="Meta de calorias"
                    name="calories_goal"
                    type="number"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    ></input>
                    <button>Atualizar meta de calorias</button>
                </PopUpBox>               
            </PopUp>
            )   
        } else if(isPopUpVisible === "weight") {
            return (
            <PopUp>
                <img src={Exit} onClick={() => setIsPopUpVisible("")}/>
                <PopUpBox onSubmit={updateWeightGoal}>
                    <input
                    required 
                    placeholder="Meta de peso"
                    name="weight_goal"
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    ></input>
                    <button>Atualizar meta de peso</button>
                </PopUpBox>               
            </PopUp>
            ) 
        } else {
            <></>
        }
    }


    const PageInfo = loadPage()
    const PopUpInfo = loadPopUp();

    return (
        <>
        {PageInfo}
        {PopUpInfo}
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

const TextBox = styled.div`
    width: 100%;
    font-size: 20px;
    margin-top: 35px;
    color: white;
    display: flex;
`

const UpdateButton = styled.div`
    background-color: gray;
    margin-left: 30px;
    cursor: pointer;
    border: 2px solid black;
    color: black;

    :hover {
        opacity: 0.7;
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