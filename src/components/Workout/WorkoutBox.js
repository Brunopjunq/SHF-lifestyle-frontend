import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWorkouts, postWorkout } from "../../service/api";
import { ThreeDots } from "react-loader-spinner";
import Exit from "../../assets/images/Close.png";
import Swal from "sweetalert2";

export default function WorkoutBox() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [form, setForm] = useState({
        name: "",
    });

    useEffect(() => {
        setLoading(false);
        getWorkouts()
            .then((res) => {
                setWorkouts(res.data);
                setLoading(true);
                localStorage.setItem("workoutData", JSON.stringify(res.data));
            })
            .catch((error) => console.log(error));
    }, [isPopUpVisible]);

    function getTotalSeries(array) {
        let sum = 0
        array.map((el) => {
            sum = sum + el.series
        });

        return sum;
    }

    function getTotalReps(array) {
        let sum = 0
        array.map((el) => {
            sum = sum + el.reps
        });

        return sum;
    }

    function LoadWorkouts() {
        if(workouts.length > 0) {
            return (
                <>
                {loading ? 
                <>
                {workouts.map((work) => (
                    <Link to={`/home/workout/${work.id}`} style={linkStyle}>
                        <Container>
                            <h2>Treino de {work.name}</h2>
                            <a>Número de Exercícios: {work.workoutExercises.length}</a>
                            <a>Carga de Treino: {getTotalSeries(work.workoutExercises)} series/ {getTotalReps(work.workoutExercises)} reps</a>
                        </Container>
                    </Link>
                ))}
                <AddWorkout onClick={() => setIsPopUpVisible(true)}>
                    Adicione um novo Treino
                </AddWorkout>
                </> : <><LoadingBox><ThreeDots color="#FFFFFF" /></LoadingBox>
                        <AddWorkout onClick={() => setIsPopUpVisible(true)}>
                            Adicione um novo Treino
                        </AddWorkout></>}
                </>
            )
        }
        else {
            return (
                <>
                    <LoadingBox>
                        <a>Você ainda não tem nenhum treino cadastrado!</a>
                    </LoadingBox>
                    <AddWorkout onClick={() => setIsPopUpVisible(true)}>
                        Adicione um novo Treino
                    </AddWorkout>
                </>
            )
        }
    }

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function addNewWorkout(e) {
        e.preventDefault();
        
        postWorkout(form)
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
                name: "",
            });
            setIsPopUpVisible(false);
        })
    }
    
    function newWorkout() {
        if(isPopUpVisible === true) {
            return (
                <PopUp>
                    <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
                    <PopUpBox onSubmit={addNewWorkout}>
                    <input
                        required 
                        placeholder="Nome do treino"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleForm}
                        ></input>
                        <button>Adicionar Treino</button>
                    </PopUpBox>
                </PopUp>
            )
        } else {
            return (
                <></>
            )
        }
    }


    const PageInfo = LoadWorkouts();
    const PopUpInfo = newWorkout();

    return (
        <>
        {PageInfo}
        {PopUpInfo}
        </>
    )
}

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'black'
  };

const Container = styled.div`
    width: 95%;
    height: 60px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 15px;
    text-decoration: none;
    cursor: pointer;

    :hover {
        background-color: #bfbfbf
    }
`

const LoadingBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        color: white;
        margin-bottom: 40px;
        margin-top: 30px;
    }
`

const AddWorkout = styled.div`
    width: 95%;
    height: 60px;
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