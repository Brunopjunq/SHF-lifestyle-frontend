import { DebounceInput } from "react-debounce-input"
import styled from "styled-components"
import { GiMeal } from "react-icons/gi";
import Add from "../../assets/images/AddGreen.png";
import { getFoods, postFood } from "../../service/api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Exit from "../../assets/images/Close.png";
import Swal from "sweetalert2";

export default function SearchFoods() {
    const [foods, setFoods] = useState([]);
    const { mealId } = useParams();
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [form, setForm] = useState({
        name: null,
        quantity: null,
        calories: null,
        protein: null,
        carbohydrate: null,
        lipid: null,
    });

    function search(value) {

        if(value.length === 0) {
            return;
        }

        getFoods(value)
        .then((res) => {
            setFoods(res.data);
            console.log(foods);
        })
        .catch((error) => console.log(error))
    }

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function addNewFood(e) {
        e.preventDefault();

        postFood(form)
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
                name: null,
                quantity: null,
                calories: null,
                protein: null,
                carbohydrate: null,
                lipid: null,
            });
            setIsPopUpVisible(false);
        })

    }

    function NewFood() {
        if(isPopUpVisible === true) {
            return (
                <PopUp>
                    <img src={Exit} onClick={() => setIsPopUpVisible(false)}/>
                    <PopUpBox onSubmit={addNewFood}>
                        <input
                        required 
                        placeholder="Nome do Alimento"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="Quantidade(em g)"
                        name="quantity"
                        type="number"
                        value={form.quantity}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="Calorias(em Kcal)"
                        name="calories"
                        type="number"
                        value={form.calories}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="Qtd. de proteínas(em g)"
                        name="protein"
                        type="number"
                        value={form.protein}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="Qtd. de carboidratos(em g)"
                        name="carbohydrate"
                        type="number"
                        value={form.carbohydrate}
                        onChange={handleForm}
                        ></input>
                        <input
                        required 
                        placeholder="Qtd. de gorduras(em g)"
                        name="lipid"
                        type="number"
                        value={form.lipid}
                        onChange={handleForm}
                        ></input>
                        <button>Adicionar Alimento</button>
                    </PopUpBox>               
                </PopUp>
            )     
        }
    }

    function loadPage() {
        return (
            <Container>
            <h1>Acompanha sua Alimentação</h1>
            <SearchContainer>
                <h2>Busque por um alimento</h2>
                <DebounceInput
                minLength={3}
                debounceTimeout={300}
                placeholder="Busque um alimento"
                onChange={(e) => search(e.target.value)}
                />
                {foods.map((el) => (
                            <FoodBox>
                                <FoodIcon>
                                    <GiMeal />
                                </FoodIcon>
                                <FoodText>
                                    <NameText>{el.name}</NameText>
                                    <InfoText>
                                        <a>Quantidade: {el.quantity} g</a>
                                        <a>Calorias: {el.calories} kcal</a>
                                    </InfoText>
                                    <NutriText>
                                        <a>Prot: {el.protein}g</a>
                                        <a>Carb: {el.carbohydrate}g</a>
                                        <a>Gord: {el.lipid}g</a>
                                    </NutriText>
                                </FoodText>
                                <EditIcon>
                                    <img src={Add} />
                                </EditIcon>
                            </FoodBox>
                ))}
            </SearchContainer>
            <AddFood onClick={() => setIsPopUpVisible(true)}>Não encontrou o alimento? Adicione um novo aqui!</AddFood>
        </Container>
        )
    }

    const PageInfo = loadPage();
    const PopUpInfo = NewFood();

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

const SearchContainer = styled.div`
    background-color: #8ad3e2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-sizing: border-box;
    padding-bottom: 20px;

    input {
        width: 400px;
        height: 30px;
        font-size: 20px;
        margin-bottom: 15px;
    }

    h2 {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
    }
`

const FoodBox = styled.div`
    background-color: white;
    width: 100%;
    height: 55px;
    border: solid 1px black;
    margin-bottom: 5px;
    display: flex;
`

const FoodIcon = styled.div`
    width: 5%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FoodText = styled.div`
    width: 90%;
    height: 55px;
    display: flex;
    align-items: center;
`

const NameText = styled.div`
    height: 55px;
    width: 60%;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-right: solid 1px black;
    border-left: solid 1px black;
`

const InfoText = styled.div`
    height: 55px;
    width:25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
`

const NutriText = styled.div`
    height: 55px;
    width:15%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
    font-size: 15px;
`

const EditIcon = styled.div`
    width: 5%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 30px;
        cursor: pointer;
        color: green;
    }
`

const AddFood = styled.div`
    width: 100%;
    height: 40px;
    background-color: #00004d;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 15px;
    font-size: 15px;
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
    width: 650px;
    height: 400px;
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