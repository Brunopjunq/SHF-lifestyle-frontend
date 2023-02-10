import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteAerobic, getAerobicsbyDay, updateAerobic } from "../../../service/api";
import Trash from "../../../assets/images/redTrash.png";
import Edit from "../../../assets/images/Edit.png";
import Swal from "sweetalert2";
import Exit from "../../../assets/images/Close.png";
import { useParams } from "react-router-dom";

export default function AerobicsDateCard() {
    const [aerobics, setAerobics] = useState([]);
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [isPopUpTrashVisible, setIsPopUpTrashVisible] = useState(false);
    const [form, setForm] = useState({
        time: null,
        calories: null,
    });
    const [aerobicId, setAerobicId] = useState("");
    const [ deletedId, setDeletedId] = useState("");
    const [ deletedIdName, setDeletedIdName] = useState("");
    const { date } = useParams();

    useEffect(() => {
        getAerobicsbyDay(date)
        .then((res) => {
            setAerobics(res.data);
            localStorage.setItem("aerobicsData", JSON.stringify(res.data));
        })
        .catch((error) => console.log(error))
    }, [isPopUpVisible, isPopUpTrashVisible, date]);

    function LoadAerobics() {
        return (
            <>
            {aerobics.map((el) => (
                <Card>
                    <EditBox onClick={() => {
                        setAerobicId(el.id);
                        setIsPopUpVisible(true);
                    }}>
                    <img src={Edit} />
                    </EditBox>
                    <h2>{el.name}</h2>
                    <a>Tempo: {el.time} min</a>
                    <a>Calorias: {el.calories} kcal</a>
                    <TrashBox>
                        <img src={Trash} onClick={() => {
                            setDeletedId(el.id);
                            setDeletedIdName(el.name);
                            setIsPopUpTrashVisible(true);
                        }} />
                    </TrashBox>                  
                </Card>
            ))}
            </>
        )
    };

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function updateRequest(e) {
        e.preventDefault();

        const body = {
            time: Number(form.time),
            calories: Number(form.calories)
        };

        updateAerobic(body, date, aerobicId)
        .then((res) => {
            setIsPopUpVisible(false);
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response.status}`               
            });
            setForm({
                time: null,
                calories: null,               
            });
            setIsPopUpVisible(false);
        })
    };

    function updateUserAerobic() {
        if(isPopUpVisible === true) {
            return (
                <PopUp>
                    <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
                    <PopUpBox onSubmit={updateRequest}>
                        <input
                        required 
                        placeholder="Tempo de treino"
                        name="time"
                        type="number"
                        value={form.time}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="Calorias gastas"
                        name="calories"
                        type="number"
                        value={form.calories}
                        onChange={handleForm}
                        ></input>
                        <button>Atualizar Exercício</button>
                    </PopUpBox>               
                </PopUp>
            )
        } else {
            return (
                <></>
            )
        }
    }

    function deleteRequest() {
        deleteAerobic(deletedId)
        .then((res) => {
            setIsPopUpTrashVisible(false);
            setDeletedId("");
            setDeletedIdName("");
        })
        .catch((error) => console.log(error))
    };

    function deleteUserAerobic() {
        if(isPopUpTrashVisible === true) {
            return (
                <PopUpTrash>
                <img src={Exit} onClick={() => setIsPopUpTrashVisible(false)}/>
                <PopUpTrashBox>
                    <p>Tem certeza que deseja excluir "{deletedIdName}"?</p>
                    <div>
                        <button onClick={() => setIsPopUpTrashVisible(false)}>NÃO</button>
                        <button onClick={deleteRequest}>SIM</button>
                    </div>
                </PopUpTrashBox>
            </PopUpTrash>
            )
        } else {
            return (
                <></>
            )
        }       
    }

    const PageInfo = LoadAerobics();
    const PopUpInfo = updateUserAerobic();
    const PopUpTrashInfo = deleteUserAerobic();

    return (
        <>
        {PageInfo}
        {PopUpInfo}
        {PopUpTrashInfo}
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
    position: relative;

    h2 {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 30px;
        margin-top: 20px;
        text-align: center;
    }


`

const TrashBox = styled.div`
    position: absolute;
    top: 10px;
    right: 15px;

    img {
        cursor: pointer;
        height:20px;
    }
`

const EditBox = styled.div`
    position: absolute;
    top: 10px;
    left: 15px;

    img {
        cursor: pointer;
        height:20px;
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

const PopUpTrash = styled.div`
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
    /* visibility: ${props => props.isPopUpVisible}; */
    img {
        position: absolute;
        top: 25px;
        right: 30px;
        cursor: pointer;
    }
`

const PopUpTrashBox = styled.div`
    width: 348px;
    height: 210px;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 12px;
    p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
        margin: 33px 0 47px;
    }
    button {
        width: 95px;
        height: 52px;
        background: red;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #FFFFFF;
        border: none;
        cursor: pointer;
        &:last-child {
            background-color: #00004d;
        }
    }
    div {
        display: flex;
        gap: 14px;
    }
`