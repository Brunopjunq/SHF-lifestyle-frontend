import styled from "styled-components";
import Trash from "../../assets/images/redTrash.png";
import { GiMeal } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { deleteFoodByMeal } from "../../service/api";
import Exit from "../../assets/images/Close.png";

export default function FoodsBox(props, {reload, setReload}) {
    const [isPopUpTrashVisible, setIsPopUpTrashVisible] = useState(false);
    const [deletedFood, setDeletedFood] = useState("");
    const [deletedFoodId, setDeletedFoodId] = useState("");
    
    function LoadFoods() {
        return (
            <Container>
            <MealIcon>
                <GiMeal />
            </MealIcon>
            <FoodText>
                <NameText>{props.name}</NameText>
                <InfoText>
                    <a>Quantidade: {props.quantity} g</a>
                    <a>Calorias: {props.calories} kcal</a>
                </InfoText>
                <NutriText>
                    <a>Prot: {props.protein}g</a>
                    <a>Carb: {props.carbohydrate}g</a>
                    <a>Gord: {props.lipid}g</a>
                </NutriText>
            </FoodText>
            <EditIcon>
                <BiEdit />
                <img src={Trash} onClick={() => {
                    setDeletedFood(props.name)
                    setDeletedFoodId(props.id)
                    setIsPopUpTrashVisible(true);
                    console.log(deletedFoodId);
                    
                }} />
            </EditIcon>
        </Container>
        )
    }

    function deleteRequest() {

        
        deleteFoodByMeal(deletedFoodId)
        .then((res) => {
            setIsPopUpTrashVisible(false);
        })
        .catch((error) => console.log(error))
    }

    function deleteFood() {
        if(isPopUpTrashVisible === true) {
            return (
                <PopUpTrash>
                <img src={Exit} onClick={() => setIsPopUpTrashVisible(false)}/>
                <PopUpTrashBox>
                    <p>Tem certeza que deseja excluir o alimento "{deletedFood}"?</p>
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

    const PageInfo = LoadFoods();
    const PopUpTrashInfo = deleteFood();

    return (
        <>
        {PageInfo}
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

const MealIcon = styled.div`
    width: 5%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FoodText = styled.div`
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
`

const NameText = styled.div`
    height: 50px;
    width: 60%;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-right: solid 1px black;
    border-left: solid 1px black;
`

const InfoText = styled.div`
    height: 50px;
    width:25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
`

const NutriText = styled.div`
    height: 50px;
    width:12%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    border-right: solid 1px black;
    font-size: 15px;
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