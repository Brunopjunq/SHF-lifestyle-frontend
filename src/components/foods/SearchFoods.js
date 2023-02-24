import { DebounceInput } from "react-debounce-input"
import styled from "styled-components"
import { GiMeal } from "react-icons/gi";
import Add from "../../assets/images/AddGreen.png";
import { getFoods } from "../../service/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SearchFoods() {
    const [foods, setFoods] = useState([]);
    const { mealId } = useParams();

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
            <AddFood>Não encontrou o alimento? Adicione um novo aqui!</AddFood>
        </Container>
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