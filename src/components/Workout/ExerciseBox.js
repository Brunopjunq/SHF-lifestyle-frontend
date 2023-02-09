import styled from "styled-components";
import { CgGym } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { deleteExercise, getExercises, updateExercise } from "../../service/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Exit from "../../assets/images/Close.png";
import Trash from "../../assets/images/redTrash.png";

export default function ExerciseBox() {
    const [exercises , setExercises] = useState([]);
    const { id } = useParams();
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [isPopUpTrashVisible, setIsPopUpTrashVisible] = useState(false);
    const [form, setForm] = useState({
        series: null,
        reps: null,
        weight_current: null,
    });
    const [exerciseId, setExerciseId ] = useState("");
    const [ deletedId, setDeletedId] = useState("");
    const [deletedIdName, setDeletedIdName] = useState("");
    
    useEffect(() => {
        getExercises(id)
        .then((res) => {
            setExercises(res.data);
            localStorage.setItem("exerciseData", JSON.stringify(res.data));
        })
        .catch((error) => console.log(error));
    }, [exerciseId, deletedId]);

    function loadExercises() {
        return (
            <>
            {exercises.map((exc) => (
                <Container>
                    <GymIcon>
                        <CgGym />
                    </GymIcon>
                    <ExerciseText>
                        <NameText>{exc.name}</NameText>
                        <InfoText>
                            <a>Séries: {exc.series}</a>
                            <a>Repetições: {exc.reps}</a>
                        </InfoText>
                        <WeightText>
                            <a>Peso Atual: {exc.weight_current} Kg</a>
                            <a>Peso antigo: {exc.weight_previous || 0} Kg</a>
                        </WeightText>
                    </ExerciseText>
                    <EditIcon>
                        <BiEdit onClick={() => {
                            setExerciseId(exc.id);
                            setIsPopUpVisible(true);
                        }} />
                        <img src={Trash} onClick={() => {
                            setDeletedId(exc.id);
                            setDeletedIdName(exc.name);
                            setIsPopUpTrashVisible(true);
                        }} />
                    </EditIcon>
                </Container>
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
            series: Number(form.series),
            reps: Number(form.reps),
            weight_current: Number(form.weight_current)
        };

        updateExercise(body, exerciseId)
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
                name: "",
                series: null,
                reps: null,
                weight_current: null,
            });
            setIsPopUpVisible(false);
        })
    };

    function updateUserExercise() {
        if(isPopUpVisible === true) {
            return (
                <PopUp>
                    <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
                    <PopUpBox onSubmit={updateRequest}>
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
        deleteExercise(deletedId)
        .then((res) => {
            setIsPopUpTrashVisible(false);
            setDeletedId("");
            setDeletedIdName("");
        })
        .catch((error) => console.log(error))
    };

    function deleteUserExercise() {
        if(isPopUpTrashVisible === true) {
            return (
                <PopUpTrash>
                <img src={Exit} onClick={() => setIsPopUpTrashVisible(false)}/>
                <PopUpTrashBox>
                    <p>Tem certeza que deseja excluir o exercício "{deletedIdName}"?</p>
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
    const PopUpInfo = updateUserExercise();
    const PopUpTrashInfo = deleteUserExercise();

    return (
        <>
        {PageInfo}
        {PopUpInfo}
        {PopUpTrashInfo}
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom: solid 1px black;
    margin-bottom: 5px;
`

const GymIcon = styled.div`
    width: 5%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ExerciseText = styled.div`
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
`

const NameText = styled.div`
    height: 50px;
    width: 55%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-right: solid 1px black;
    border-left: solid 1px black;
`

const InfoText = styled.div`
    height: 50px;
    width:20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
`

const WeightText = styled.div`
    height: 50px;
    width:22%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
`

const EditIcon = styled.div`
    width: 10%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
        height: 30px;
        cursor: pointer;
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