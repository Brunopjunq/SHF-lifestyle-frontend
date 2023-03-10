import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ExerciseBox from "./ExerciseBox";
import Exit from "../../assets/images/Close.png";
import { deleteWorkout, postExercise } from "../../service/api";
import Swal from "sweetalert2";

export default function WorkoutIdPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const workoutData = JSON.parse(localStorage.getItem("workoutData"));
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [isPopUpTrashVisible, setIsPopUpTrashVisible] = useState("");
    const [form, setForm] = useState({
        name: "",
        series: null,
        reps: null,
        weight_current: null,
    });
    const WorkoutName = workoutData.map((el) => {
        if(el.id == id) {
            return el.name
        }
    });

    function loadExercises() {
        return (
            <>
            <Container>
                <h1>Acompanhe seus treinos</h1>
                <WorkoutBox>
                    <TitleBox>
                        <h1>{WorkoutName}</h1>
                        <TrashBox onClick={() => setIsPopUpTrashVisible(true)}>
                            Excluir Treino
                        </TrashBox>
                    </TitleBox>
                    <ExerciseBox />
                </WorkoutBox>
                <AddExercise onClick={() => setIsPopUpVisible(true)}>
                    Adicione um Exercício
                </AddExercise>
            </Container>
            </>
        )
    }

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function addNewExercise(e) {
        e.preventDefault();

        const body = {
            name: form.name,
            series: Number(form.series),
            reps: Number(form.reps),
            weight_current: Number(form.weight_current)
        };

        postExercise(body, id)
        .then((res) => {
            setIsPopUpVisible(false);
            window.location.reload();
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: `${error.response.status}`
            });
            setForm({
                name: "",
                series: null,
                reps: null,
                weight_current: null,
            });
            setIsPopUpVisible(false);
        })
    };

    function newExercise() {
        if(isPopUpVisible === true) {
            return (
                <PopUp>
                    <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
                    <PopUpBox onSubmit={addNewExercise}>
                    <input
                        required 
                        placeholder="Nome do exercício"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="N° de séries"
                        name="series"
                        type="number"
                        value={form.series}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="N° de repetições"
                        name="reps"
                        type="number"
                        value={form.reps}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="Carga(em Kg)"
                        name="weight_current"
                        type="number"
                        value={form.weight_current}
                        onChange={handleForm}
                        ></input>
                        <button>Adicionar Exercício</button>
                    </PopUpBox>               
                </PopUp>
            )
        } else {
            return (
                <></>
            )
        }
    };

    function deleteRequest() {
        deleteWorkout(id)
        .then((res) => {
            setIsPopUpTrashVisible(false);
            navigate("/home/workout");
        })
        .catch((error) => console.log(error))
    }

    function deleteUserWorkout() {
        if(isPopUpTrashVisible === true) {
            return (
                <PopUpTrash>
                <img src={Exit} onClick={() => setIsPopUpTrashVisible(false)}/>
                <PopUpTrashBox>
                    <p>Tem certeza que deseja excluir "{WorkoutName}"?</p>
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

    const PageInfo = loadExercises();
    const PopUpInfo = newExercise();
    const PopUpTrashInfo = deleteUserWorkout();

    return (
        <>
        {PageInfo}
        {PopUpInfo}
        {PopUpTrashInfo}
        </>
    )
};

const Container = styled.div`
    width: 100%;
    min-height: 600px;
    padding-left: 30px;
    padding-right: 20px;

    h1 {
        color: #dfcd81;
    }
`

const WorkoutBox = styled.div`
    width: 95%;
    min-height: 100%;
    background-color: #e6e6e6;
    border-radius: 20px;
    margin-bottom: 20px;
`

const TitleBox = styled.div`
    width:100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px black;
    position: relative;
    
    h1 {
        color: black;
    }
`

const TrashBox = styled.div`
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    width: 150px;
    height:30px;
    background-color: red;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

`

const AddExercise = styled.div`
    width: 95%;
    height: 53px;
    background-color: #00004d;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 20px;
    color: white;
    font-weight:700;
    cursor: pointer;

    :hover {
        color: #dfcd81;
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