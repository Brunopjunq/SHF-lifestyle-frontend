import styled from "styled-components";
import AerobicsCard from "./AerobicsCard";
import Add from "../../assets/images/Add.png"
import { useState } from "react";
import { postAerobic } from "../../service/api";
import Swal from "sweetalert2";
import Exit from "../../assets/images/Close.png";

export default function AerobicsBox() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [form, setForm] = useState({
        name: "",
        time: null,
        calories: null,
    });
    const newDate = new Date();
    const today = newDate.toLocaleString().slice(0,10).split('/').reverse().join('-');
    const [reload, setReload] = useState(0);


    function LoadPage() {
        return (
        <Container>
            <AddCard onClick={() => setIsPopUpVisible(true)}>
                <img src={Add} />
            </AddCard>
            <AerobicsCard 
            reload={reload}
            setReload={setReload}
            />
        </Container>
        )
    }

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function addAerobicRequest(e) {
        e.preventDefault();

        const body = {
            name: form.name,
            time: Number(form.time),
            calories: Number(form.calories)
        };

        postAerobic(body, today)
        .then((res) => {
            // window.location.reload();
            setIsPopUpVisible(false);
            setReload(reload + 1);
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response}`               
            });
            setForm({
                name: "",
                time: null,
                calories: null,
            });
            setIsPopUpVisible(false);
        })
    };

    function newAerobic() {
        if(isPopUpVisible === true) {
            return (
                <PopUp>
                    <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
                    <PopUpBox onSubmit={addAerobicRequest}>
                    <input
                        required 
                        placeholder="Nome do Exc. Aeróbico"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleForm}
                    ></input>
                    <input
                        required 
                        placeholder="Tempo do exercício"
                        name="time"
                        type="number"
                        value={form.time}
                        onChange={handleForm}
                    ></input>
                    <input
                        required 
                        placeholder="Qtd de calorias gastas"
                        name="calories"
                        type="number"
                        value={form.calories}
                        onChange={handleForm}
                    ></input>
                    <button>Adicionar Treino Aeróbico</button>
                    </PopUpBox>
                </PopUp> 
            )
        }
    }

    const PageInfo = LoadPage();
    const PopUpInfo = newAerobic();

    return (
        <>
        {PageInfo}
        {PopUpInfo}
        </>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 50px;
    display: flex;
    flex-wrap: wrap;
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